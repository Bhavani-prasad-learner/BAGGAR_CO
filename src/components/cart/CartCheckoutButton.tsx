import { useState } from 'react';
import { auth, db } from '../../firebase/firebaseConfig';
import { useAuthState } from 'react-firebase-hooks/auth';
import { collection, addDoc, serverTimestamp, doc, getDoc } from 'firebase/firestore';
import { useCart } from '../../context/CartContext';
import Modal from 'react-modal';
import { toast } from "@/components/ui/sonner";
import { CheckCircle2 } from 'lucide-react';
import { useAuth } from "@/context/AuthContext";

// Tailwind class configurations for consistency
const buttonStyles = {
  primary: "w-full bg-green-500 hover:bg-green-600 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200",
  confirm: "bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-medium py-2 px-4 rounded transition-colors duration-200"
};

const modalStyles = {
  overlay: "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50",
  content: "bg-white rounded-lg p-6 max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto"
};

Modal.setAppElement('#root');

const CartCheckoutButton = () => {
  const [user] = useAuthState(auth);
  const { cartItems, clearCart, specialInstructions } = useCart();
  
  const [loginPromptOpen, setLoginPromptOpen] = useState(false);
  const [confirmOrderOpen, setConfirmOrderOpen] = useState(false);
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [orderId, setOrderId] = useState('');

  const handleCheckout = () => {
    if (!user) {
      setLoginPromptOpen(true);
      return;
    }
    setConfirmOrderOpen(true);
  };

  const handleConfirmOrder = async () => {
    if (!user) {
      toast.error("Please log in to place an order");
      return;
    }

    if (cartItems.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    setLoading(true);

    try {
      const now = new Date();
      const date = now.toISOString().split('T')[0];
      const time = now.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      });
      const day = now.toLocaleDateString('en-US', { weekday: 'long' });

      const totalAmount = cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );

      // Fetch user data logic...
      let latestUsername = user.displayName || user.email || 'Anonymous';
      let latestPhone = '';
      let latestEmail = user.email || '';
      
      if (user?.uid) {
        try {
          const userDoc = await getDoc(doc(db, 'users', user.uid));
          if (userDoc.exists()) {
            const data = userDoc.data();
            if (data.username) latestUsername = data.username;
            if (data.phone) latestPhone = data.phone;
            if (data.email) latestEmail = data.email;
          }
        } catch (e) {
          // fallback to displayName/email
        }
      }

      const orderData = {
        userId: user.uid,
        username: latestUsername,
        displayName: user.displayName || '',
        email: latestEmail,
        phone: latestPhone,
        items: cartItems.map(item => ({
          name: item.name,
          quantity: item.quantity,
          price: item.price,
          image: item.image,
          rating: item.rating
        })),
        totalAmount: totalAmount,
        specialInstructions: specialInstructions || '',
        createdAt: serverTimestamp(),
        date: date,
        day: day,
        time: time,
        status: 'pending'
      };

      const docRef = await addDoc(collection(db, 'orders'), orderData);
      setOrderId(docRef.id);
      
      clearCart();
      setConfirmOrderOpen(false);
      setSuccessModalOpen(true);
      
      toast.success("Order placed successfully!", {
        description: "Waiting for confirmation...",
        duration: 5000,
      });

    } catch (error) {
      console.error('❌ Failed to place order:', error);
      toast.error("Failed to place order", {
        description: "Please try again or contact support if the issue persists.",
        duration: 5000,
      });
    } finally {
      setLoading(false);
    }
  };

  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <>
      {/* Main checkout button */}
      <button 
        className={buttonStyles.primary}
        onClick={handleCheckout}
      >
        CHECKOUT
      </button>

      {/* Login Prompt Modal */}
      <Modal
        isOpen={loginPromptOpen}
        onRequestClose={() => setLoginPromptOpen(false)}
        className={modalStyles.content}
        overlayClassName={modalStyles.overlay}
      >
        <div className="text-center">
          <h2 className="text-xl font-bold mb-4">⚠️ Please log in or sign up to place an order.</h2>
          <p className="text-gray-600 mb-4">👉 Click on the profile icon to continue.</p>
          <button
            onClick={() => setLoginPromptOpen(false)}
            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded transition-colors"
          >
            Close
          </button>
        </div>
      </Modal>

      {/* Order Review Modal */}
      <Modal
        isOpen={confirmOrderOpen}
        onRequestClose={() => setConfirmOrderOpen(false)}
        className={modalStyles.content}
        overlayClassName={modalStyles.overlay}
      >
        <div>
          <h2 className="text-xl font-bold mb-4">🧾 Confirm Your Order</h2>
          
          {/* Order items list */}
          <ul className="space-y-2 mb-4 max-h-40 overflow-y-auto">
            {cartItems.map((item, index) => (
              <li key={index} className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-sm">{item.name} × {item.quantity}</span>
                <span className="font-medium">₹{(item.price * item.quantity).toFixed(2)}</span>
              </li>
            ))}
          </ul>
          
          {/* Special instructions */}
          <div className="bg-gray-50 p-3 rounded mb-4">
            <p className="text-sm font-medium text-gray-700 mb-1">Special Instructions:</p>
            <p className="text-sm text-gray-600">{specialInstructions || 'None'}</p>
          </div>
          
          {/* Total */}
          <div className="flex justify-between items-center mb-6 p-3 bg-blue-50 rounded">
            <span className="font-bold text-lg">Total:</span>
            <span className="font-bold text-lg text-blue-600">₹{totalAmount.toFixed(2)}</span>
          </div>
          
          {/* Action buttons */}
          <div className="flex gap-3">
            <button
              onClick={() => setConfirmOrderOpen(false)}
              className="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirmOrder}
              className={`flex-1 ${buttonStyles.confirm} ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={loading}
            >
              {loading ? 'Placing Order...' : 'Confirm Order'}
            </button>
          </div>
        </div>
      </Modal>

      {/* Success Modal */}
      <Modal
        isOpen={successModalOpen}
        onRequestClose={() => setSuccessModalOpen(false)}
        className={modalStyles.content}
        overlayClassName={modalStyles.overlay}
      >
        <div className="text-center">
          <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Order Confirmed!</h2>
          <p className="text-gray-600 mb-4">Your order has been successfully placed.</p>
          
          {/* Order details card */}
          <div className="bg-gray-50 p-4 rounded-lg mb-6 text-left">
            <div className="space-y-2">
              <p className="text-sm text-gray-600">
                <span className="font-medium">Order ID:</span> {orderId}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-medium">Total Amount:</span> ₹{totalAmount.toFixed(2)}
              </p>
              <p className="text-sm">
                <span className="font-medium text-yellow-600">Status:</span> 
                <span className="text-yellow-600"> Waiting for confirmation...</span>
              </p>
            </div>
          </div>
          
          <button
            onClick={() => setSuccessModalOpen(false)}
            className="w-full bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg transition-colors"
          >
            Done
          </button>
        </div>
      </Modal>
    </>
  );
};

export default CartCheckoutButton;

