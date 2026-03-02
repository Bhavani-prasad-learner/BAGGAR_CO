import { db } from "../firebase/firebaseConfig";
import { collection, query, where, orderBy, getDocs } from "firebase/firestore";
import { toast } from "@/components/ui/sonner";

import React, { createContext, useContext, useReducer, useState } from 'react';

const CartContext = createContext(null);

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD':
      const existing = state.find(item => item.id === action.item.id);
      if (existing) {
        return state.map(item =>
          item.id === action.item.id
            ? { ...item, quantity: item.quantity + action.item.quantity }
            : item
        );
      }
      return [...state, { ...action.item, quantity: action.item.quantity || 1 }];

    case 'REMOVE':
      return state.filter(item => item.id !== action.id);

    case 'INCREMENT':
      return state.map(item =>
        item.id === action.id ? { ...item, quantity: item.quantity + 1 } : item
      );

    case 'DECREMENT':
      return state.map(item =>
        item.id === action.id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      );

    case 'CLEAR':
      return [];

    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [previousOrders, setPreviousOrders] = useState([]);
  const [cartItems, dispatch] = useReducer(cartReducer, []);
  const [specialInstructions, setSpecialInstructions] = useState('');

  const fetchPreviousOrders = async (userId) => {
    try {
      const q = query(
        collection(db, "orders"),
        where("userId", "==", userId),
        orderBy("createdAt", "desc")
      );
      const querySnapshot = await getDocs(q);
      const orders = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setPreviousOrders(orders);
    } catch (error) {
      toast.error("Failed to fetch orders.");
      console.error(error);
    }
  };

  const addToCart = (item) => dispatch({ type: 'ADD', item });
  const removeFromCart = (id) => dispatch({ type: 'REMOVE', id });
  const increment = (id) => dispatch({ type: 'INCREMENT', id });
  const decrement = (id) => dispatch({ type: 'DECREMENT', id });
  const clearCart = () => dispatch({ type: 'CLEAR' });

  const getTotalItems = () => cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const getTotalPrice = () => cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        increment,
        decrement,
        clearCart,
        getTotalItems,
        getTotalPrice,
        fetchPreviousOrders,
        previousOrders,
        specialInstructions,
        setSpecialInstructions
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
