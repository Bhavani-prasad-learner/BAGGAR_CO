import React, { useEffect, useState } from 'react';
import { db } from '../firebase/firebaseConfig';
import { collection, query, orderBy, onSnapshot, doc, updateDoc } from 'firebase/firestore';
import { toast } from "@/components/ui/sonner";
import { CheckCircle, XCircle, Package, Clock, AlertCircle } from 'lucide-react';

interface OrderItem {
  name: string;
  quantity: number;
  price: number;
  image?: string;
  rating?: number;
}

interface Order {
  id: string;
  userId: string;
  username: string;
  items: OrderItem[];
  totalAmount: number;
  specialInstructions?: string;
  createdAt: any;
  date: string;
  day: string;
  time: string;
  status: "pending" | "preparing" | "rejected" | "ready";
  orderId?: string;
}

const AdminOrders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Create query for all orders, ordered by createdAt descending
    const q = query(
      collection(db, "orders"),
      orderBy("createdAt", "desc")
    );

    // Set up real-time listener
    const unsubscribe = onSnapshot(
      q,
      (querySnapshot) => {
        try {
          const fetchedOrders: Order[] = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          })) as Order[];

          setOrders(fetchedOrders);
          setLoading(false);
        } catch (error: any) {
          console.error("❌ Error processing orders:", error);
          setError(error.message);
          setLoading(false);
        }
      },
      (error) => {
        console.error("❌ Firestore listener error:", error);
        setError(error.message);
        setLoading(false);
        toast.error("Failed to load orders", {
          description: "Please check your connection and try again"
        });
      }
    );

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  const generateOrderId = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const random = String(Math.floor(Math.random() * 999) + 1).padStart(3, '0');
    return `ORD-${year}-${month}-${day}-${random}`;
  };

  const handleAcceptOrder = async (orderId: string) => {
    try {
      const orderDocRef = doc(db, "orders", orderId);
      const newOrderId = generateOrderId();
      
      await updateDoc(orderDocRef, {
        status: "preparing",
        orderId: newOrderId
      });

      toast.success("Order accepted!", {
        description: `Order #${newOrderId} is now being prepared`
      });
    } catch (error) {
      console.error("❌ Failed to accept order:", error);
      toast.error("Failed to accept order", {
        description: "Please try again"
      });
    }
  };

  const handleRejectOrder = async (orderId: string) => {
    try {
      const orderDocRef = doc(db, "orders", orderId);
      
      await updateDoc(orderDocRef, {
        status: "rejected"
      });

      toast.success("Order rejected", {
        description: "The customer will be notified"
      });
    } catch (error) {
      console.error("❌ Failed to reject order:", error);
      toast.error("Failed to reject order", {
        description: "Please try again"
      });
    }
  };

  const handleMarkAsReady = async (orderId: string, currentOrderId?: string) => {
    try {
      const orderDocRef = doc(db, "orders", orderId);
      
      await updateDoc(orderDocRef, {
        status: "ready"
      });

      toast.success("Order marked as ready!", {
        description: currentOrderId ? `Order #${currentOrderId} is ready for pickup` : "Order is ready for pickup"
      });
    } catch (error) {
      console.error("❌ Failed to mark order as ready:", error);
      toast.error("Failed to mark order as ready", {
        description: "Please try again"
      });
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="w-5 h-5 text-yellow-500" />;
      case "preparing":
        return <Package className="w-5 h-5 text-blue-500" />;
      case "ready":
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case "rejected":
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return <AlertCircle className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "border-yellow-500 bg-yellow-50";
      case "preparing":
        return "border-blue-500 bg-blue-50";
      case "ready":
        return "border-green-500 bg-green-50";
      case "rejected":
        return "border-red-500 bg-red-50";
      default:
        return "border-gray-500 bg-gray-50";
    }
  };

  const formatDate = (createdAt: any) => {
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

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
        <AlertCircle className="w-12 h-12 text-red-500" />
        <p className="text-red-600">Failed to load orders: {error}</p>
        <button 
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Order Management</h1>
        <p className="text-gray-600">Manage customer orders in real-time</p>
      </div>

      {orders.length === 0 ? (
        <div className="text-center py-12">
          <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500 text-lg">No orders found</p>
        </div>
      ) : (
        <div className="grid gap-6">
          {orders.map((order) => (
            <div
              key={order.id}
              className={`border-2 rounded-lg p-6 ${getStatusColor(order.status)}`}
            >
              {/* Order Header */}
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  {getStatusIcon(order.status)}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      Order by {order.username}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {order.date} • {order.time} • {order.day}
                    </p>
                    <p className="text-sm text-gray-600">
                      Created: {formatDate(order.createdAt)}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-gray-900">
                    ₹{order.totalAmount.toFixed(2)}
                  </p>
                  <p className="text-sm text-gray-600 capitalize">
                    Status: {order.status}
                  </p>
                  {order.orderId && (
                    <p className="text-sm font-mono text-blue-600">
                      #{order.orderId}
                    </p>
                  )}
                </div>
              </div>

              {/* Order Items */}
              <div className="mb-4">
                <h4 className="font-semibold text-gray-900 mb-2">Items:</h4>
                <div className="grid gap-2">
                  {order.items.map((item, index) => (
                    <div key={index} className="flex justify-between items-center bg-white rounded p-3">
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                      </div>
                      <p className="font-semibold">₹{item.price}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Special Instructions */}
              {order.specialInstructions && (
                <div className="mb-4 p-3 bg-white rounded border">
                  <h4 className="font-semibold text-gray-900 mb-1">Special Instructions:</h4>
                  <p className="text-gray-700">{order.specialInstructions}</p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-3">
                {order.status === "pending" && (
                  <>
                    <button
                      onClick={() => handleAcceptOrder(order.id)}
                      className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                    >
                      <CheckCircle className="w-4 h-4" />
                      Accept
                    </button>
                    <button
                      onClick={() => handleRejectOrder(order.id)}
                      className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                    >
                      <XCircle className="w-4 h-4" />
                      Reject
                    </button>
                  </>
                )}

                {order.status === "preparing" && (
                  <button
                    onClick={() => handleMarkAsReady(order.id, order.orderId)}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    <Package className="w-4 h-4" />
                    Mark as Ready
                  </button>
                )}

                {(order.status === "ready" || order.status === "rejected") && (
                  <span className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg">
                    {order.status === "ready" ? "Order completed" : "Order rejected"}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminOrders; 