import { useLocation } from "react-router-dom";

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Index from "./pages/Index";
import EmailLogin from "./pages/auth/EmailLogin";
import Auth from "./pages/auth/Auth";
import PhoneLogin from "./pages/auth/PhoneLogin";
import OtpVerification from "./pages/auth/OtpVerification";
import SocialLogin from "./pages/auth/SocialLogin";
import FirebaseTestPage from "./pages/FirebaseTestPage";
import NotFound from "./pages/NotFound";
import { CartProvider } from "./context/CartContext";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import Nav from './components/nav/Nav';
import Rounded from './components/RoundedButton';

import { useState, useRef, useEffect } from "react";
import styles from './components/button_styles/style.module.scss';

import CartSection from './components/cart/Cart-Section';
import CartIconButton from './components/RoundedButton/CartIconButton';
import AuthModal from './components/auth/AuthModal';
import { User as UserIcon, LogOut, Pencil } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger, DropdownMenuItem } from "./components/ui/dropdown-menu";

import { collection, query, where, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from './firebase/firebaseConfig';
import { toast } from "@/components/ui/sonner";
const queryClient = new QueryClient();
import RecommendationForm from "./pages/RecommendationForm";

import { FlavourProvider } from "./context/FlavourContext";
import { GoPencil } from "react-icons/go";
import { FaRegBell } from "react-icons/fa6";
import NotiModal from "./components/Notifications/NotiModal";

import markAsRead from './hooks/markAsRead'
import checkNotifications from './hooks/checkNotifications'
import { Console } from "console";
import { TbShoppingCart } from "react-icons/tb";
import HeaderNav from './components/HeaderNav'
import HeaderMenuNav from "./components/nav/HeaderMenuNav";
import SearchWindow from "./components/nav/SearchWindow";
import FiltersModal from "./components/FiltersModal";

// Define the order type
interface Order {
  id: string;
  status: "pending" | "preparing" | "ready" | "rejected";
  orderId?: string;
  userId: string;
  createdAt: any;
  [key: string]: any;
}

// Global order notification component
const GlobalOrderNotifications = () => {
  const { user } = useAuth();
  const previousOrdersRef = useRef<Order[]>([]);

  useEffect(() => {
    if (!user) {
      previousOrdersRef.current = [];
      return;
    }

    // Simplified query to avoid index requirements
    const q = query(
      collection(db, "orders"),
      where("userId", "==", user.uid)
      // Removed orderBy to avoid index requirement
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const orders = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Order[];

      // Sort orders by createdAt in memory instead of in query
      orders.sort((a, b) => {
        const aTime = a.createdAt?.seconds || 0;
        const bTime = b.createdAt?.seconds || 0;
        return bTime - aTime; // Descending order
      });

      // Check for status changes and show notifications
      if (orders.length > 0 && previousOrdersRef.current.length > 0) {
        const latestOrder = orders[0];
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
      previousOrdersRef.current = orders;
    }, (error) => {
      // Handle Firestore errors gracefully
      console.warn('Firestore query error:', error);
      // Don't throw error to prevent app crash
    });

    return () => unsubscribe();
  }, [user]);

  return null; // This component doesn't render anything visible
};

// Separate component for the app content to use hooks
const AppContent = () => {
  // useLocomotiveScroll();

  const [isActive, setIsActive] = useState(false);
  const [isHeaderActive, setIsHeaderActive] = useState(false);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [selectedItem, setSelecteditem] = useState();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isFiltersModalOpen, setIsFiltersModalOpen] = useState(false);
  const [isNotiModalOpen, setIsNotiModalOpen] = useState(false);
  const [isEditUsernameOpen, setIsEditUsernameOpen] = useState(false);
  const [newUsername, setNewUsername] = useState("");
  const [editUsernameError, setEditUsernameError] = useState("");

  const [userUsername, setUserUsername] = useState<string | null>(null);
  const button = useRef(null);
  const navigate = useNavigate();
  const { user, logout, getUserUsername, updateUsername } = useAuth();
  const [showBadge, setShowBadge] = useState(false);

  useEffect(() => {
    const check = async () => {
      if (user) {
        const isNew = await checkNotifications(user.uid); // <-- your function
        setShowBadge(isNew);
      }
    };

    check();
  }, [user]);


  const handleEditFlavourProfile = () => {
    navigate('/recommendation-form');
  }

  const handleEditUsername = () => {
    setIsEditUsernameOpen(true);
    setNewUsername(userUsername || "");
  };
  const handleSaveUsername = async () => {
    setEditUsernameError("");
    if (!newUsername || newUsername.length < 3 || !/^[a-zA-Z0-9_]+$/.test(newUsername)) {
      setEditUsernameError("Username must be at least 3 characters and contain only letters, numbers, and underscores.");
      return;
    }
    if (!user) return;
    try {
      await updateUsername(user.uid, newUsername);
      setUserUsername(newUsername);
      setIsEditUsernameOpen(false);
    } catch (err: any) {
      setEditUsernameError(err.message || "Failed to update username");
    }
  };

  // Fetch username when user changes
  useEffect(() => {
    const fetchUsername = async () => {
      if (user) {
        const username = await getUserUsername(user.uid);
        setUserUsername(username);
      } else {
        setUserUsername(null);
      }
    };

    fetchUsername();
  }, [user, getUserUsername]);


  useEffect(() => {
    const handlePop = () => {
      closeMenu(); // run your close function
    };

    window.addEventListener("popstate", handlePop);

    return () => {
      window.removeEventListener("popstate", handlePop);
    };
  }, []);


  const closeMenu = () => {
    setIsActive(false);
    if (window.history.state?.overlay) {
      window.history.back();
      console.log("going back");
    }
    // window.location.hash = "#menu";
  };

  const closeHeaderMenu = () => {
    setIsHeaderActive(false);
    if (window.history.state?.overlay) {
      window.history.back();
    }
  };

    const closeSearchWindow = () => {
    setIsSearchActive(false);
    if (window.history.state?.overlay) {
      window.history.back();
    }
  };

  const handleCartClick = () => {
    if (isActive)
      setIsActive(false);
    window.history.pushState({ overlay: true }, "");
    navigate('/cart');
  };

  const renderProfileButton = () => {
    if (user) {
      // User is logged in, show avatar with dropdown
      const initial = userUsername
        ? userUsername.charAt(0).toUpperCase()
        : (user.displayName ? user.displayName.charAt(0).toUpperCase() : (user.email ? user.email.charAt(0).toUpperCase() : 'U'));
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            {/* <button
              className="w-[48px] h-[48px] md:w-[3.5rem] md:h-[3.5rem] fixed top-4 right-5 md:right-11 z-40 flex items-center justify-center p-3 rounded-full bg-black/10 backdrop-blur-sm text-white transition-colors hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/30"
            // style={{ width: '48px', height: '48px' }}
              aria-label="Profile menu"
            >*/}

            <button

          className="w-8 h-8 md:right-12 z-40 flex items-center justify-center p-1 text-white border border-gray-200 rounded-full transition-colors hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/30"

              aria-label="Profile menu"
            >
              <span className="text-3xl md:text-3xl text-upper cormorant_garamond-regular">{initial}</span>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-20 mt-2 mr-2 bg-[#1A1A1A]/80 rounded-xl text-white">
            <DropdownMenuItem
              className="flex items-center gap-2 cursor-pointer"
              onClick={logout}
            >
              <LogOut className="h-4 w-4  md:w-8 md:h-8" />
              <span>Logout</span>
            </DropdownMenuItem>
          
          
          </DropdownMenuContent>
        </DropdownMenu>
      );
    } else {
      // User is not logged in, show generic icon and open modal on click
      return (
        // <button
        //   onClick={() => setIsAuthModalOpen(true)}
        //   className="w-30 h-30 fixed top-4 right-5 md:right-12 z-40 flex items-center justify-center p-3 rounded-full bg-black/10 backdrop-blur-sm text-white transition-colors hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/30"
        //   // style={{ width: '48px', height: '48px' }}
        //   aria-label="Login or Sign Up"
        // >

        //   <UserIcon className="w-6 h-6 md:w-8 md:h-8" />
        // </button>


        <button
          onClick={() => setIsAuthModalOpen(true)}
          className="w-8 h-8 md:right-12 z-40 flex items-center justify-center p-1 text-white border border-gray-200 rounded-full transition-colors hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/30"
          // style={{ width: '48px', height: '48px' }}
          aria-label="Login or Sign Up"
        >

          <UserIcon className="w-6 h-6 md:w-8 md:h-8" />
        </button>

      );
    }
  };



  const renderNotificationsButton = () => {

    if (user) {

      return (
        <button
          onClick={() => {
            setIsNotiModalOpen(true)
            markAsRead(user.uid)
            setShowBadge(false);

          }}

          className="w-30 h-30 fixed top-6 right-[9.2rem] md:right-44 z-40 flex items-center justify-center p-2 px-5 rounded-xl bg-black/70 text-white transition-colors hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/30"
          // style={{ width: '48px', height: '48px' }}
          aria-label="Login or Sign Up"
        >


          <FaRegBell size={24} className="md:w-7 md:h-7" />
          {showBadge && (
            <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full" />
          )}
        </button>

      );
    } else {
      return (
        <></>
      );
    }
  };

  // const isCartPage = location.pathname === '/cart';

  const location = useLocation();
  const isCartPage = location.pathname === "/cart";

  return (
    <>
      <Toaster />
      <Sonner />

      {/* Global Order Notifications */}
      <GlobalOrderNotifications />

      <div className="flex absolute right-0">
        <AnimatePresence>
          {isActive && (
            <motion.div
              key="button"
              ref={button}
              className={styles.headerButtonContainer}
              // style={{ overflow: "hidden" }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 0.8 }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{ duration: 0.3, delay: 0.5 }}
            >
              <div className="flex relative">
                <div className="cormorant_garamond-regular text-center">
                  <h2 className="text-[2rem] text-restaurant-primary md:text-[2.5rem] font-bold tracking-wide mb-4 mt-[0.8rem] whitespace-nowrap">
                    {selectedItem}
                  </h2>
                </div>

              </div>
              <Rounded onClick={closeMenu} className={`${styles.button}`}>
                <div className={`${styles.burger} ${isActive ? styles.burgerActive : ""}`}></div>
              </Rounded>

            </motion.div>
          )}

          {isActive && <Nav selectedItem={selectedItem} />}
        </AnimatePresence>
        {/* {isActive && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.3 }}
            className="fixed -bottom-1 -right-4 z-[2000] py-2 px-2 md:py-2 md:px-2 bg-[#3d251e] flex flex-row gap-2"
            onClick={() => handleCartClick()}
          >
            <div className="hidden md:block md:flex md:flex-row gap-2 w-[100vw] items-center justify-between">
              <div className="flex flex-row items-center gap-2">
                <TbShoppingCart className="scale-[1.1] opacity-80 text-2xl md:text-3xl md:scale[1.2] md:mb-1 text-white" />
                <h1 className="text-white text-2xl">open cart for payment</h1>
              </div>
              <span className="text-3xl md:text-5xl text-white transition-transform ease-in-out duration-300 mr-5">→</span>
            </div>
            <div className="block md:hidden flex flex-row gap-2 w-[100vw] items-center justify-between">
              <div className="flex flex-row items-center gap-2">
                <TbShoppingCart className="scale-[1.1] opacity-80 text-lg md:text-3xl md:scale[1.2] text-white" />
                <h1 className="text-white text-lg"> open cart for payment</h1>
              </div>
              <span className="text-3xl md:text-5xl text-white transition-transform ease-in-out duration-300 mr-5">→</span>
            </div>
          </motion.div>
        )} */}
      </div>


      <div className="flex absolute right-0 ">
        <AnimatePresence>
          {isHeaderActive && (
            <motion.div
              key="button"
              ref={button}
              className={styles.headerButtonContainer}
              // style={{ overflow: "hidden" }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 0.8 }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{ duration: 0.3, delay: 0.5 }}
            >
              <div className="flex relative" onClick={closeHeaderMenu}>
                <div className=" text-center  text-white">
                  <h2 className="text-[1.9rem] md:text-[2.5rem] font-cinzel tracking-wide mb-4 mt-[0.8rem] whitespace-nowrap">
                    bagaara & co.
                  </h2>
                </div>

              </div>
              <Rounded onClick={closeHeaderMenu} className={`${styles.button}`}>
                <div className={`${styles.burger} ${isHeaderActive ? styles.burgerActive : ""}`}></div>
              </Rounded>

            </motion.div>
          )}

          {isHeaderActive && <HeaderMenuNav  />}
        </AnimatePresence>
       
      </div>

       <div className="flex absolute right-0">
        <AnimatePresence>
          {isSearchActive && (
            <motion.div
              key="button"
              ref={button}
              className={styles.headerButtonContainer}
              // style={{ overflow: "hidden" }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 0.8 }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{ duration: 0.3, delay: 0.5 }}
            >
              <div className="flex relative">
                <div className="cormorant_garamond-regular text-center">
                  <h2 className="text-[2rem] text-white md:text-[2.5rem] font-bold tracking-wide mb-4 mt-[0.8rem] whitespace-nowrap">
                    Search
                  </h2>
                </div>

              </div>
              <Rounded onClick={closeSearchWindow} className={`${styles.button}`}>
                <div className={`${styles.burger} ${isSearchActive ? styles.burgerActive : ""}`}></div>
              </Rounded>

            </motion.div>
          )}

          {isSearchActive && <SearchWindow />}
        </AnimatePresence>
       
      </div>

      {/* notifications Icon Button */}
      {/* <div>
        <FaRegBell             className="fixed top-4 right-36 z-40 flex items-center justify-center p-3 rounded-full bg-white/10 backdrop-blur-sm text-white transition-colors hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/30"
              style={{ width: '48px', height: '48px' }}/>
      </div> */}


      {/* {!isCartPage && renderNotificationsButton()} */}


      {/* Cart Icon Button */}
      {/* {!isCartPage && (
        <div className="fixed top-6 right-20 md:right-28 z-50">

          <CartIconButton onClick={handleCartClick} />
        </div >
      )} */}


      {/* Profile/Login Button */}
      {/* {!isCartPage && renderProfileButton()} */}

      {!isCartPage && <HeaderNav setIsHeaderActive={setIsHeaderActive} renderProfileButton={renderProfileButton}/>}

      {/* Auth Modal */}
      {isAuthModalOpen && (
        <AuthModal
          isOpen={isAuthModalOpen}
          onClose={() => setIsAuthModalOpen(false)}
        />
      )}
{isFiltersModalOpen && (
  <FiltersModal
    onClose={() => setIsFiltersModalOpen(false)}
    onApply={() => {
      console.log("Filters applied");
      setIsFiltersModalOpen(false);
    }}
  />
)}
      {isNotiModalOpen && (
        <NotiModal
          isOpen={isNotiModalOpen}
          onClose={() => setIsNotiModalOpen(false)}
        />
      )}
      {isEditUsernameOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-[#222] p-6 rounded-lg shadow-lg w-80 flex flex-col gap-4">
            <h2 className="text-lg font-bold text-white">Edit Username</h2>
            <input
              type="text"
              className="p-2 rounded bg-[#333] text-white border border-gray-700"
              value={newUsername}
              onChange={e => setNewUsername(e.target.value)}
              minLength={3}
              pattern="[a-zA-Z0-9_]+"
              placeholder="Enter new username"
            />
            {editUsernameError && <div className="text-red-400 text-sm">{editUsernameError}</div>}
            <div className="flex gap-2 justify-end">
              <button
                className="px-4 py-2 rounded bg-gray-600 text-white hover:bg-gray-700"
                onClick={() => { setIsEditUsernameOpen(false); setEditUsernameError(""); }}
              >Cancel</button>
              <button
                className="px-4 py-2 rounded bg-restaurant-primary text-white hover:bg-orange-700"
                onClick={handleSaveUsername}
              >Save</button>
            </div>
          </div>
        </div>
      )}

      <div data-scroll-container>
        <Routes>
          <Route path="/" element={<Index setIsNavOpen={setIsActive} setItem={setSelecteditem} setIsSearchActive={setIsSearchActive}  isFiltersModalOpen={isFiltersModalOpen} setIsFiltersModalOpen={setIsFiltersModalOpen} />} />
          <Route path="/firebase" element={<FirebaseTestPage />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/cart" element={<CartSection />} />
          <Route path="/auth/email" element={<EmailLogin />} />
          <Route path="/auth/phone" element={<PhoneLogin />} />
          <Route path="/auth/otp" element={<OtpVerification />} />
          <Route path="/auth/social" element={<SocialLogin />} />
          <Route path="*" element={<NotFound />} />

          <Route path='/recommendation-form' element={<RecommendationForm />} />
        </Routes>
      </div>
    </>
  );
};

// Main App component
const App = () => {
  return (

    <QueryClientProvider client={queryClient}>

      <TooltipProvider>
        <AuthProvider>
          <CartProvider>
            <BrowserRouter>
              <FlavourProvider>
                <AppContent />
              </FlavourProvider>
            </BrowserRouter>
          </CartProvider>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>

  );
};

export default App;
