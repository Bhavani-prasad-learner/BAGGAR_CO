import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
// import { RecaptchaVerifier, GoogleAuthProvider } from 'firebase/auth';
import { GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../../firebase/firebaseConfig';
import "./AuthModal.css";
import { MdWidthFull } from 'react-icons/md';
import { CiLogin } from "react-icons/ci";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AuthModal = ({ isOpen, onClose }: AuthModalProps) => {
  const [activeTab, setActiveTab] = useState<'login' | 'signup'>('login');
  const [isLoading, setIsLoading] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
 
  const [formData, setFormData] = useState({
    phoneNumber: '',
    otp: '',
    email: '',
    password: '',
    fullName: '',
    username: ''
  });

  const { login, register, sendOTP, verifyOTP, signInWithGoogle } = useAuth();



  // Handle modal close
  const handleClose = useCallback(() => {

    // cleanupRecaptcha(); // Ensure cleanup on explicit close
    onClose();
  },
   [
    //cleanupRecaptcha,
     onClose]
  );




  useEffect(() => {
    if (isOpen && modalRef.current) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setTimeout(() => {
        modalRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'center'
        });
      }, 100);
    }
  }, [isOpen]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };


  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (activeTab === 'login') {
        await login(formData.email, formData.password);
      } else {
        await register(
          formData.email,
          formData.password,
          formData.fullName,
          formData.username
          // No phone for email signup
        );
      }
      onClose();
    } catch (error) {
      console.error('Auth error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      // Add custom parameters to improve sign-in experience
      provider.setCustomParameters({
        prompt: 'select_account',
        login_hint: formData.email || undefined
      });

      await signInWithGoogle();
      onClose();
    } catch (error: any) {
      // Only show error if it's not a user-cancelled popup
      if (error.code !== 'auth/popup-closed-by-user') {
        console.error('Google sign-in error:', error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.3 }
    }
  };

  const modalVariants = {
    hidden: {
      opacity: 0,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 250
      }
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      transition: { duration: 0.2 }
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="auth-modal-overlay"
        variants={backdropVariants}
        initial="hidden"
        animate="visible"
        exit="hidden"
        onClick={handleClose}
      >
        <motion.div
          ref={modalRef}
          className="auth-modal rounded-2xl relative"
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={e => e.stopPropagation()}
        >
          <button
            onClick={handleClose}
            className=" absolute top-[12px] right-[12px]
                      bg-black
                      border border-black/20
                      rounded-full
                      text-white
                      w-[2rem] h-[2rem]
                      flex items-center justify-center
                      cursor-pointer
                      transition-all duration-200 ease-in-out
                      z-[2]
                      p-0
                      shadow-none"
            disabled={isLoading}
            aria-label="Close modal"
          >
            <X size={18} />
          </button>

          <div className="auth-modal-content bg-[rgba(0,0,0,0.5)]" >
            <img src='./webp2/bg-loginImg.webp' alt="auth-bg" className='opacity-[1] overflow-hidden w-[30rem] h-[20rem] object-cover' />
          </div>

          <div className=' bg-black flex flex-col gap-3 py-10 border-t border-black/20'>
            <div className="mt-0 pt-0" />
            <span className='text-white text-center text-xl'>
              Sign in with Gmail
            </span>
            <span className='text-white/65 text-center text-sm'>
              Join us in seconds — no password needed.
            </span>
          </div>
          <span>
   
          </span>
     
          <div 
          onClick={handleGoogleSignIn}
          className='h-12 w-14 absolute top-[53%] right-[40%] z-[100] text-4xl text-white rounded-2xl border border-[rgba(50,50,50,1)] bg-[rgba(23,23,23,1)] flex items-center justify-center'>
            <CiLogin />

          </div>
    
          <div className="min-h-10 w-full bg-black flex items-center justify-center px-5 pt-2 pb-8 -mt-2">
            <button
              onClick={handleGoogleSignIn}
              disabled={isLoading}
              className="google-btn"
              type="button"
            >
  
              <span className="google-btn-text">sign in</span>
            </button>

          </div>

        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AuthModal;