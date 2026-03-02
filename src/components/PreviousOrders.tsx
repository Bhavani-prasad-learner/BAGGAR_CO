// components/PreviousOrders.tsx
import { useEffect, useState } from "react";
import { db } from "../firebase/firebaseConfig";
import { collection, query, where, getDocs, orderBy } from "firebase/firestore";
import { useAuth } from "@/context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import { format } from "date-fns";
import { X, AlertCircle, RefreshCw, Clock, ChefHat, CheckCircle, XCircle, Loader2 } from "lucide-react";
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

const PreviousOrders = ({ onHide }) => {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);

  const fetchOrders = async () => {
    if (!user?.uid) {
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const q = query(
        collection(db, "orders"), 
        where("userId", "==", user.uid),
        orderBy("createdAt", "desc")
      );
      const querySnapshot = await getDocs(q);
      const userOrders = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        // Ensure consistent data structure
        items: doc.data().items.map(item => ({
          name: item.name || 'Unknown Item',
          quantity: item.quantity || 0,
          price: item.price || 0,
          image: item.image || item.imageUrl || '/placeholder-food.png',
          rating: item.rating || 4.5
        })),
        totalAmount: doc.data().totalAmount || doc.data().items.reduce(
          (sum, item) => sum + ((item.price || 0) * (item.quantity || 0)), 
          0
        ),
        createdAt: doc.data().createdAt || { seconds: Date.now() / 1000 }
      })) as Order[];
      
      setOrders(userOrders);
      if (userOrders.length === 0) {
        toast.info("No previous orders found");
      }
    } catch (error) {
      console.error("❌ Firestore error:", error.message);
      setError(error.message);
      toast.error("Failed to load orders", {
        description: "Please try again or contact support if the issue persists"
      });
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [user, retryCount]);

  const handleRetry = () => {
    setRetryCount(prev => prev + 1);
  };

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
          <h2>Order History</h2>
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
          <h2>Order History</h2>
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

  if (error) {
    return (
      <div className="cart-section cart-fullscreen">
        <div className="cart-header">
          <h2>Order History</h2>
          <button 
            onClick={onHide} 
            className="absolute right-4 top-4 text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="flex flex-col items-center justify-center min-h-[200px] gap-4 p-4">
          <AlertCircle className="w-12 h-12 text-red-500" />
          <p className="text-gray-400 text-center">Failed to load orders</p>
          <button 
            onClick={handleRetry}
            className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-section cart-fullscreen">
      <div className="cart-header">
        <h2>Order History</h2>
        <button 
          onClick={onHide} 
          className="absolute right-4 top-4 text-gray-400 hover:text-white transition-colors"
          aria-label="Close order history"
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
            <p className="mb-2">You have no previous orders.</p>
            <p className="text-sm">Start ordering to see your history here!</p>
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

export default PreviousOrders;
