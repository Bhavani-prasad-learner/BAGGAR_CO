// components/CartItemCard.tsx
import React from 'react';
import { FaTrashCan } from "react-icons/fa6";

const CartItemCard = ({ name, image, price, quantity, rating, onIncrement, onDecrement, onRemove }) => {
  return (
    <div className='w-full h-full md:h-[130%] relative flex flex-row justify-between items-end px-2 py-2  gap-4 rounded-sm text-white  bg-cover bg-[center_40%] bg-contain bg-no-repeat' style={{ backgroundImage: `url(${image})` }}>
      {/* <img
        className="w-20 h-20 sm:w-16 sm:h-16 object-cover rounded-lg"
        src={image}
        alt={name}
      /> */}
          <button onClick={onRemove} className="absolute top-2 right-2 text-md text-white p-2 rounded-md" style={{ backgroundColor: "rgba(0,0,0,0.6)" }}><FaTrashCan /></button>

      <div className="flex flex-col gap-2">
        <h4 className="text-4xl send_flowers-regular"><span className='font-bold'>{name}</span></h4>
        <div className='flex flex-row gap-2 max-w-[fit-content] p-2 rounded-xl items-start justify-start' style={{ backgroundColor: "rgba(0,0,0,0.6)" }}>
          <div className="text-yellow-400 text-sm">★ {rating}</div>

          <div className="font-bold text-sm">₹ {quantity * price}</div>
        </div>

      </div>
        <div className="w-auto h-[fit-content] p-2 rounded-2xl sm:w-auto sm:mt-0" style={{ backgroundColor: "rgba(0,0,0,0.6)" }}>
          <div className="flex items-center gap-3">
            <button onClick={onDecrement} className="text-lg px-2 py-1 bg-[#404040] rounded">−</button>
            <span className='font-bold'>{quantity}</span>
            <button onClick={onIncrement} className="text-lg px-2 py-1 bg-[#404040] rounded">+</button>
          </div>
        </div>
    </div>
  );
};

export default CartItemCard;
