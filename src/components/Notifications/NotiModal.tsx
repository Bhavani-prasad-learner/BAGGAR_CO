import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
// NOTE: RecaptchaVerifier and auth are imported but not used in this file.
// If you don't use them elsewhere in this file, remove these imports.
import { RecaptchaVerifier } from 'firebase/auth';
import { auth } from '../../firebase/firebaseConfig';

// If you plan to convert everything to Tailwind, you can remove this CSS import.
import "./NotiModal.css";

// Left intentionally: Rounded and styles import are for an optional button component.
// If you remove Rounded or button_styles usage, remove these imports too.
import Rounded from '../RoundedButton';
import styles from '../button_styles/style.module.scss';

// External helper that returns how many reviews user wrote (or similar)
import { isUserEligibleForDiscount } from './isUserEligibleForDiscount';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const NotiModal = ({ isOpen, onClose }: AuthModalProps) => {
  // Loading flag for any async actions (e.g., applying discount)
  const [isLoading, setIsLoading] = useState(false);

  // ref to modal container (useful for focus management or measuring)
  const modalRef = useRef<HTMLDivElement>(null);

  // progress is 0..100 used to render progress bar (you set it using reviews * 20)
  const [progress, setProgress] = useState(0);

  // On mount fetch the user's review count (or eligibility)
  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const reviewCount = await isUserEligibleForDiscount();
        // Expecting reviewCount an integer (0..5). Convert to percentage:
        setProgress(Math.min(5, reviewCount) * 20); // 5 reviews => 100%
      } catch (err) {
        // optionally handle errors (network, auth, etc.)
        console.error('Failed to fetch discount eligibility:', err);
      }
    };

    fetchProgress();
  }, []); // empty deps = run only on mount

  // Close handler — delegates to parent prop
  const handleClose = () => {
    if (isLoading) return; // prevent close during loading action if desired
    onClose();
  };

  // Backdrop animation states for AnimatePresence
  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } }
  };

  // Modal animation (scale + opacity) — spring gives a natural pop-in
  const modalVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { type: 'spring', damping: 20, stiffness: 250 }
    },
    exit: { opacity: 0, scale: 0.95, transition: { duration: 0.5 } }
  };

  // If modal not open, render nothing (you could also return AnimatePresence with exit animation)
  if (!isOpen) return null;

  // Small typed component for the static progress bar.
  // Receives progress (0..100) and renders an inner div with width set inline.
  interface StaticProgressBarProps {
    progress: number; // from 0 to 100
  }

  const StaticProgressBar: React.FC<StaticProgressBarProps> = ({ progress }) => {
    return (
      // Using Tailwind utility classes for layout and appearance.
      <div className="w-[90%] h-6 bg-gray-800 rounded-md overflow-hidden">
        {/* Inline style sets width based on progress (so we can animate it later). */}
        <div
          className="h-full bg-gradient-to-r from-yellow-500 to-orange-600"
          style={{ width: `${progress}%` }}
        />
      </div>
    );
  };

  return (
    // AnimatePresence ensures exit animations run when component unmounts
    <AnimatePresence>
      {/* Backdrop */}
      <motion.div
        className="auth-modal-overlay" // defined in NotiModal.css currently
        variants={backdropVariants}
        initial="hidden"
        animate="visible"
        exit="hidden"
        onClick={handleClose} // click on backdrop closes modal
      >
        {/* Modal container: stopPropagation so clicking inside doesn't close */}
        <motion.div
          ref={modalRef}
          className="auth-modal" // defined in NotiModal.css currently
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button — absolute positioned in top-right */}
          <button
            onClick={handleClose}
            className="absolute z-50 top-2 right-2 w-[fit-content] h-[fit-content] bg-black/70 rounded-full p-2"
            disabled={isLoading}
            aria-label="Close modal"
          >
            <span>
              <X className="text-white" size={38} />
            </span>
          </button>

          {/* CONTENT AREA */}
          <div className="auth-modal-content md:p-0">
            {/* First card block */}
            <div className="flex flex-col flex-grow">
              {/* Top image: covers half the modal height in your layout */}
              <div className="h-[45%] w-full">
                <img
                  src="/webp/bg-card-1.webp"
                  alt="card-image"
                  className="h-full w-full object-cover"
                />
              </div>

              {/* Text block under image */}
              <div className="h-[55%] w-full bg-[#0C0B09] -mt-[0.5%] md:mt-0 md:pb-4">
                <div className="flex flex-col ml-8 mt-8 gap-5">
                  <span className="text-sm text-red-600 uppercase font-bold tracking-wider">
                    get 60% off your next meal
                  </span>

                  <div className="flex flex-col">
                    <span className="bebas-regular text-4xl text-white uppercase">
                      WRITE 5 REVIEWS TO
                    </span>
                    <span className="bebas-regular text-4xl text-white uppercase">
                      GET YOUR OFFER!
                    </span>
                  </div>

                  <div className="flex flex-col gap-2">
                    {/* Show progress with the StaticProgressBar */}
                    <StaticProgressBar progress={progress} />
                    <span className="text-sm text-red-600 uppercase font-bold tracking-wider ml-2">
                      {/* Show N/5 but cap at 5/5 */}
                      {(progress / 20) <= 5 ? <span>{progress / 20}/5</span> : <span>5/5</span>}
                    </span>
                  </div>

                  {/* Conditional message when eligible vs not */}
                  { (progress / 20) >= 5 ? (
                    <span className="w-[95%] text-sm text-orange-500 font-bold tracking-wider">
                      you are eligible for the discount, apply in cart while checking out.
                    </span>
                  ) : (
                    <span className="w-[90%] text-sm text-gray-500 font-bold tracking-wider">
                      your feedback is our secret ingredient in making the dishes delicious.
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Second card block (very similar structure) */}
            <div className="flex flex-col flex-grow md:-mt-3">
              <div className="h-[55%] w-full">
                <img
                  src="/webp/bg-card-2.webp"
                  alt="card-image"
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="h-[55%] w-full bg-[#0C0B09] -mt-[0.5%] md:mt-0 md:pb-4">
                <div className="flex flex-col ml-8 mt-8 gap-5">
                  <span className="text-sm text-red-600 uppercase font-bold tracking-wider">
                    get 50% off on total amount
                  </span>

                  <div className="flex flex-col">
                    <span className="bebas-regular text-4xl text-white uppercase">
                      START THE NEW YEAR
                    </span>
                    <span className="bebas-regular text-4xl text-white uppercase">
                      WITH ARABIAN FEAST!
                    </span>
                  </div>

                  <span className="w-[90%] text-sm text-gray-500 font-bold tracking-wider">
                    We wish you a very happy new year, hope this year brings you lots of luck and prospours.
                  </span>
                </div>
              </div>
            </div>
            {/* End second card block */}
          </div>
          {/* End content area */}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default NotiModal;
