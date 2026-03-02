import { motion } from "framer-motion";

const overlayVariants = {
  hidden: { x: "100%" },
  visible: { x: 0 },
  exit: { x: "100%" },
};

export default function Navbar({ onClose }) {
  return (
    <motion.div
      className="fixed left-0 w-screen h-screen bg-white z-50 shadow-lg overflow-hidden"
      variants={overlayVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      transition={{ type: "tween", duration: 0.5 }}
    >
      <div className="p-6">
        <h2 className="text-2xl font-semibold">Overlay Component</h2>
        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 bg-red-600 text-white"
        >
          Close
        </button>
      </div>
    </motion.div>
  );
}
