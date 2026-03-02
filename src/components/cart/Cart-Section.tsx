import React, { useState, useEffect } from 'react';
import { useCart } from '../../context/CartContext';
import CartItemCard from '../CartItemCard';
import { useNavigate } from 'react-router-dom';
import { ChefHat, CheckCircle, Clock } from 'lucide-react';
import CartCheckoutButton from './CartCheckoutButton';
import PreviousOrders from "../PreviousOrders";
import { useAuth } from "@/context/AuthContext";
import { collection, query, where, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebase/firebaseConfig';
import Rounded from '../RoundedButton';
import styles from '../button_styles/style.module.scss';
import { motion, AnimatePresence } from "framer-motion";
import './Cart.css';
import { TbShoppingCart } from 'react-icons/tb';

// Create proper interfaces instead of using any[]
interface CartItem {
  id: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
  rating: number;
}



// TypeScript interface for active order structure
interface ActiveOrder {
  id: string;
  status: "pending" | "preparing" | "rejected" | "ready"; // Order status enum
  orderId?: string; // Optional order ID for tracking
  totalAmount: number;
  items: CartItem[]; // TODO: Create proper type for items instead of any[]
}

/**
 * Component to display real-time order status notifications
 * Shows different UI states based on order status (pending, preparing, ready)
 */
const ActiveOrderNotification = ({ order }: { order: ActiveOrder }) => {
  // Returns appropriate icon, text, and styling based on order status
  const getStatusDisplay = () => {
    switch (order.status) {
      case "pending":
        return {
          icon: <Clock className="w-4 h-4 text-yellow-500" />,
          text: "Waiting for confirmation...",
          color: "text-yellow-500",
          bgColor: "bg-yellow-500/10",
          borderColor: "border-yellow-500/20"
        };
      case "preparing":
        return {
          icon: <ChefHat className="w-4 h-4 text-blue-500" />,
          text: `Your order is being prepared${order.orderId ? ` (Order #${order.orderId})` : ''}`,
          color: "text-blue-500",
          bgColor: "bg-blue-500/10",
          borderColor: "border-blue-500/20"
        };
      case "ready":
        return {
          icon: <CheckCircle className="w-4 h-4 text-green-500" />,
          text: "✅ Your order is ready for pickup!",
          color: "text-green-500",
          bgColor: "bg-green-500/10",
          borderColor: "border-green-500/20"
        };
      default:
        return null; // Handle rejected or unknown statuses
    }
  };

  const statusDisplay = getStatusDisplay();
  if (!statusDisplay) return null;

  return (
    <div className={`mx-4 mb-4 p-3 rounded-lg border ${statusDisplay.bgColor} ${statusDisplay.borderColor}`}>
      <div className="flex items-center gap-2">
        {statusDisplay.icon}
        <span className={`text-sm font-medium ${statusDisplay.color}`}>
          {statusDisplay.text}
        </span>
      </div>
      {/* Display order details if available */}
      {order.orderId && (
        <p className="text-xs text-gray-400 mt-1">
          Order ID: #{order.orderId} • Total: ₹{order.totalAmount.toFixed(2)}
        </p>
      )}
    </div>
  );
};

/**
 * Main Cart Component - Handles shopping cart display and management
 * Features:
 * - Cart item management (add/remove/update quantities)
 * - Real-time active order tracking via Firebase
 * - Special instructions for orders
 * - Order summary with pricing calculations
 * - Toggle between current cart and previous orders
 */
const CartSection = () => {
  // Cart context provides cart state and operations
  const {
    cartItems,
    addToCart,
    removeFromCart,
    clearCart,
    getTotalPrice,
    decrement,
    specialInstructions,
    setSpecialInstructions
  } = useCart();
  
  const navigate = useNavigate(); // React Router navigation
  const [showPreviousOrders, setShowPreviousOrders] = useState(false); // Toggle state for previous orders view
  const [activeOrders, setActiveOrders] = useState<ActiveOrder[]>([]); // Real-time active orders from Firebase
  const { user } = useAuth(); // Current authenticated user

  const maxInstructionsLength = 200; // Character limit for special instructions

  // Navigation handler to close cart and return to main page
  const handleCloseButton = () => {
    navigate('/');
  }

  /**
   * Firebase listener for real-time active order updates
   * Listens for orders with status: pending, preparing, or ready
   */
  useEffect(() => {
    if (!user) {
      setActiveOrders([]);
      return;
    }

    // Firestore query for active orders belonging to current user
    const q = query(
      collection(db, "orders"),
      where("userId", "==", user.uid),
      where("status", "in", ["pending", "preparing", "ready"]),
      orderBy("createdAt", "desc") // Most recent orders first
    );

    // Real-time listener - updates component when order status changes
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const orders = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as ActiveOrder[];

      setActiveOrders(orders);
    });

    // Cleanup function to prevent memory leaks
    return () => unsubscribe();
  }, [user]);

  return (
    <div id='cart-section' className="cart-section cart-fullscreen">
      {/* Header with cart icon and close button */}
      <div className="flex absolute right-0">
        <AnimatePresence>
          <motion.div
            key="button"
            className={styles.headerButtonContainer}
            style={{ overflow: "hidden" }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 0.8 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ duration: 0.3, delay: 0.5 }}
          >
            {/* Cart header with icon and title */}
            <div className="flex w-full items-center text-black justify-center gap-3 p-2">
              <div className="send_flowers-regular text-center flex flex-row gap-2">
                <h2 className="text-[2rem] font-bold tracking-wide mb-4 mt-[0.5rem] whitespace-nowrap">
                  <TbShoppingCart className='text-black' />
                </h2>
                <span className="text-[2rem] font-bold">Cart</span>
              </div>
              {/* Close button with burger icon animation */}
              <div className='flex items-center'>
                <Rounded onClick={handleCloseButton} className={`${styles.button}`}>
                  <div className={`${styles.burger} ${styles.burgerActive}`}></div>
                </Rounded>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
      
      {/* Main content area */}
      <div className='mt-16'>
        {showPreviousOrders ? (
          // Previous orders component
          <PreviousOrders onHide={() => setShowPreviousOrders(false)} />
        ) : (
          <>
            {/* Active order notifications section */}
            {activeOrders.length > 0 && (
              <div className="mt-4">
                {activeOrders.map((order) => (
                  <ActiveOrderNotification key={order.id} order={order} />
                ))}
              </div>
            )}

            {/* Empty cart state */}
            {cartItems.length === 0 ? (
              <div className="text-gray-400 text-center py-8">
                {activeOrders.length > 0 ? (
                  <div>
                    <p>Your cart is empty.</p>
                    <p className="text-sm mt-2">You have active orders above.</p>
                  </div>
                ) : (
                  <p>Your cart is empty.</p>
                )}
              </div>
            ) : (
              <>
                {/* Cart items display */}
                <div className='flex flex-col gap-2 md:gap-16'>
                  {cartItems.map((item) => (
                    <div className="h-[200px]" key={item.id}>
                      <CartItemCard
                        name={item.name}
                        image={item.image}
                        price={item.price}
                        quantity={item.quantity}
                        rating={item.rating}
                        onIncrement={() => addToCart({ ...item, quantity: 1 })}
                        onDecrement={() => decrement(item.id)}
                        onRemove={() => removeFromCart(item.id)}
                      />
                    </div>
                  ))}
                </div>

                {/* Special instructions textarea */}
                <div className="cart-special-instructions md:mt-20 w-[95%]">
                  <div className="cart-special-title md:text-2xl md:mb-5">Special Instructions</div>
                  <textarea
                    className="cart-special-textarea"
                    maxLength={maxInstructionsLength}
                    value={specialInstructions}
                    onChange={(e) => setSpecialInstructions(e.target.value)}
                    placeholder="Add special instructions for your order..."
                  />
                  <div className="cart-special-count">
                    {specialInstructions.length}/{maxInstructionsLength}
                  </div>
                </div>

                {/* Order pricing summary */}
                <div className="cart-summary">
                  <div className="cart-summary-row md:text-2xl">
                    <span>Subtotal</span>
                    <span>₹{getTotalPrice().toFixed(2)}</span>
                  </div>
                  <div className="cart-summary-row md:text-2xl">
                    <span>Delivery Fee</span>
                    <span>₹2.99</span>
                  </div>
                  <div className="cart-summary-row md:text-2xl">
                    <span>Tax</span>
                    <span>₹0.80</span>
                  </div>
                  <div className="cart-summary-row total">
                    <span className='md:text-3xl'>Total</span>
                    <span className='md:text-3xl'>
                      ₹{(getTotalPrice() + 2.99 + 0.80).toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Checkout button */}
                <div className="cart-bottom-bar md:scale-x-[180%] md:scale-y-[150%]">
                  <CartCheckoutButton />
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default CartSection;
