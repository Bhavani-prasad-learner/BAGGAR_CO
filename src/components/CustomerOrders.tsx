import React, { useEffect, useState, useRef } from "react";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import { collection, query, where, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig.js";
import { motion, AnimatePresence } from "framer-motion";
import { X, Clock, ChefHat, CheckCircle, XCircle, Loader2 } from "lucide-react";
import { toast } from "@/components/ui/sonner";

interface OrderItem {
  name: string;
  quantity: number;
  price: number;
  image?: string;
  rating?: number;
}

type Order = {
  id: string;
  createdAt: { seconds: number; nanoseconds: number };
  date: string;
  day: string;
  time: string;
  items: OrderItem[];
  specialInstructions?: string;
  status: "pending" | "preparing" | "rejected" | "ready";
  totalAmount: number;
  userId: string;
  username?: string;
  orderId?: string;
};

const CustomerOrders = ({ onHide }: { onHide: () => void }) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const previousOrdersRef = useRef<Order[]>([]);

  useEffect(() => {
    const auth = getAuth();
    const unsub = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
    });
    return () => unsub();
  }, []);

  useEffect(() => {
    if (!user) {
      setOrders([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    const q = query(
      collection(db, "orders"),
      where("userId", "==", user.uid),
      orderBy("createdAt", "desc")
    );
    const unsub = onSnapshot(q, (snapshot) => {
      const fetched: Order[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Order[];

      setOrders(fetched);
      setLoading(false);

      // Check for status changes and show notifications
      if (fetched.length > 0 && previousOrdersRef.current.length > 0) {
        const latestOrder = fetched[0];
        const previousLatestOrder = previousOrdersRef.current[0];
        
        // Only show notification if status changed for the same order
        if (latestOrder.id === previousLatestOrder.id && 
            latestOrder.status !== previousLatestOrder.status) {
          
          switch (latestOrder.status) {
            case "preparing":
              toast.success("👨‍🍳 Order Accepted!", {
                description: `Your order is now being prepared${latestOrder.orderId ? ` (Order #${latestOrder.orderId})` : ''}`,
                duration: 5000,
              });
              break;
            case "ready":
              toast.success("🎉 Your order is ready!", {
                description: latestOrder.orderId ? `Order #${latestOrder.orderId} is ready for pickup!` : "Your order is ready for pickup!",
                duration: 6000,
              });
              break;
            case "rejected":
              toast.error("❌ Order Rejected", {
                description: "Your order has been rejected. Please contact support for assistance.",
                duration: 8000,
              });
              break;
          }
        }
      }
      
      // Update previous orders reference
      previousOrdersRef.current = fetched;
    });
    return () => unsub();
  }, [user]);

  const getStatusDisplay = (order: Order) => {
    switch (order.status) {
      case "pending":
        return {
          icon: <Clock className="w-5 h-5 text-yellow-500" />,
          text: "Waiting for confirmation...",
          color: "text-yellow-500",
          bgColor: "bg-yellow-500/10",
          borderColor: "border-yellow-500/20"
        };
      case "preparing":
        return {
          icon: <ChefHat className="w-5 h-5 text-blue-500" />,
          text: `Your order is being prepared${order.orderId ? ` (Order #${order.orderId})` : ''}`,
          color: "text-blue-500",
          bgColor: "bg-blue-500/10",
          borderColor: "border-blue-500/20"
        };
      case "ready":
        return {
          icon: <CheckCircle className="w-5 h-5 text-green-500" />,
          text: "✅ Your order is ready!",
          color: "text-green-500",
          bgColor: "bg-green-500/10",
          borderColor: "border-green-500/20"
        };
      case "rejected":
        return {
          icon: <XCircle className="w-5 h-5 text-red-500" />,
          text: "❌ Your order was rejected",
          color: "text-red-500",
          bgColor: "bg-red-500/10",
          borderColor: "border-red-500/20"
        };
      default:
        return {
          icon: <Clock className="w-5 h-5 text-gray-500" />,
          text: "Unknown status",
          color: "text-gray-500",
          bgColor: "bg-gray-500/10",
          borderColor: "border-gray-500/20"
        };
    }
  };

  const formatOrderDate = (createdAt: any) => {
    if (!createdAt) return "N/A";
    
    try {
      const date = createdAt.seconds 
        ? new Date(createdAt.seconds * 1000)
        : new Date(createdAt);
      
      return date.toLocaleString();
    } catch (error) {
      console.error("Date formatting error:", error);
      return "N/A";
    }
  };

  if (!user) {
    return (
      <div className="cart-section cart-fullscreen">
        <div className="cart-header">
          <h2>My Orders</h2>
          <button 
            onClick={onHide} 
            className="absolute right-4 top-4 text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="text-center text-gray-400 py-8 px-4">
          <p>Please sign in to view your orders.</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="cart-section cart-fullscreen">
        <div className="cart-header">
          <h2>My Orders</h2>
          <button 
            onClick={onHide} 
            className="absolute right-4 top-4 text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="flex flex-col items-center justify-center min-h-[200px] gap-4">
          <Loader2 className="w-8 h-8 animate-spin text-orange-500" />
          <p className="text-gray-400 text-sm">Loading your orders...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-section cart-fullscreen">
      <div className="cart-header">
        <h2>My Orders</h2>
        <button 
          onClick={onHide} 
          className="absolute right-4 top-4 text-gray-400 hover:text-white transition-colors"
          aria-label="Close orders"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <AnimatePresence>
        {orders.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center text-gray-400 py-8 px-4"
          >
            <p className="mb-2">You have no orders yet.</p>
            <p className="text-sm">Start ordering to see your order status here!</p>
          </motion.div>
        ) : (
          <div className="space-y-4 px-4 pb-4">
            {orders.map((order, index) => {
              const statusDisplay = getStatusDisplay(order);
              
              return (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-[#1c2637] rounded-xl p-4 shadow-lg border border-gray-700"
                >
                  {/* Order Header */}
                  <div className="flex justify-between items-start mb-3 pb-3 border-b border-gray-700">
                    <div className="flex-1">
                      <div className="text-sm text-gray-300 mb-1">
                        {order.date} • {order.time} • {order.day}
                      </div>
                      <div className="flex items-center gap-2">
                        {statusDisplay.icon}
                        <span className={`text-sm font-medium ${statusDisplay.color}`}>
                          {statusDisplay.text}
                        </span>
                        {order.status === "pending" && (
                          <Loader2 className="w-4 h-4 animate-spin text-yellow-500" />
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-lg font-bold text-orange-400">
                        ₹{order.totalAmount.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  {/* Special Instructions */}
                  {order.specialInstructions && (
                    <div className="mb-3 p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                      <p className="text-sm text-blue-300">
                        <span className="font-medium">Special Instructions:</span> {order.specialInstructions}
                      </p>
                    </div>
                  )}

                  {/* Order Items */}
                  <div className="space-y-3">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between bg-[#202830] rounded-lg p-3">
                        <div className="flex items-center gap-3">
                          {item.image && (
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-12 h-12 rounded-lg object-cover"
                            />
                          )}
                          <div>
                            <p className="font-medium text-white">{item.name}</p>
                            <p className="text-sm text-gray-400">Qty: {item.quantity}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-orange-400">₹{item.price}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Order ID for preparing/ready orders */}
                  {order.orderId && (order.status === "preparing" || order.status === "ready") && (
                    <div className="mt-3 pt-3 border-t border-gray-700">
                      <p className="text-sm text-gray-400">
                        Order ID: <span className="font-mono text-orange-400">#{order.orderId}</span>
                      </p>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CustomerOrders;