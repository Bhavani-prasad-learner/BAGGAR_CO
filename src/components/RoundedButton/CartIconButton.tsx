// components/CartIconButton.tsx
import React from 'react';
import { useCart } from '../../context/CartContext';
import { TbShoppingCart } from "react-icons/tb";
import { motion } from 'framer-motion';

const CartIconButton = ({ onClick, className = '' }) => {
  const { getTotalItems } = useCart();
  const totalItems = getTotalItems();

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      // className={`w-30 h-30 relative p-3 rounded-full bg-black/10 backdrop-blur-sm text-white transition-colors ${className}`}
       className={`w-30 h-30 relative p-2 px-5 rounded-xl bg-black/70 text-white transition-colors ${className}`}
    >
      <TbShoppingCart className="text-2xl text-white-400 md:text-3xl" />
      {totalItems > 0 && (
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute -top-1 -right-1 bg-red-500 text-white text-xs md:text-2xl rounded-full w-5 h-5 md:w-8 md:h-8 flex items-center justify-center"
        >
          {totalItems}
        </motion.span>
      )}
    </motion.button>
  );
};

export default CartIconButton;
