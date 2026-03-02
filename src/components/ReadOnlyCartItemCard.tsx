// components/ReadOnlyCartItemCard.tsx
import React from 'react';

const ReadOnlyCartItemCard = ({ name, image, price, quantity, rating }) => {
  return (
    <div className="flex flex-col sm:flex-row items-center gap-4 bg-[#202830] rounded-xl p-4 text-white shadow-md w-full">
      <img
        className="w-20 h-20 sm:w-16 sm:h-16 object-cover rounded-lg"
        src={image}
        alt={name}
      />
      <div className="flex-1 w-full">
        <h4 className="text-base sm:text-sm font-bold">{name}</h4>
        <div className="text-yellow-400 text-sm">★ {rating}</div>
        <div className="mt-2 text-sm">Quantity: <strong>{quantity}</strong></div>
      </div>
      <div className="text-right w-full sm:w-auto mt-4 sm:mt-0">
        <div className="text-orange-400 font-bold text-sm">₹ {price}</div>
      </div>
    </div>
  );
};

export default ReadOnlyCartItemCard;
