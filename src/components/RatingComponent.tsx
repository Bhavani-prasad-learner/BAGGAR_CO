import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { GoStar } from 'react-icons/go';

const RatingComponent = ({ setter, userRating, userLiked }) => {
  const [rating, setRating] = useState(userRating);       // Final selected rating
  const [hovered, setHovered] = useState(0);     // Currently hovered star

  useEffect(() => { setter(rating) }, [rating])
  const handleRemoveRating= ()=>{
    setRating(0)
    userLiked(false)
  }
  return (
    <motion.div
      key="lol"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{
        duration: 0.4,
        ease: "easeInOut"
      }}

      className='pt-2 pb-2 pl-5 pr-5 mb-2 border border-yellow-100 rounded-2xl'
    >
      <div className='flex justify-between'>
        <div>
          <div className='text-white text-sm md:text-xl'>Select your rating:</div>

          <div className='flex gap-3 mt-2'>
            {[1, 2, 3, 4, 5].map((star) => (
              <GoStar
                key={star}
                className={`text-2xl md:text-4xl cursor-pointer transition-all duration-200 ${(hovered || rating) >= star ? 'text-yellow-600' : 'text-yellow-50'
                  }`}
                onMouseEnter={() => setHovered(star)}
                onMouseLeave={() => setHovered(0)}
                onClick={() => setRating(star)}
              />
            ))}
          </div>

          {rating > 0 && (
            <div className="text-xs md:text-sm mt-2 md:mt-4 text-gray-200">You rated this {rating} star{rating > 1 ? 's' : ''}.</div>
          )}
        </div>
        {rating> 0&& (<div className='flex items-center'>
          <div className='pt-2 pb-2 pl-5 pr-5 mr-2 border border-gray-500 text-sm text-white rounded-2xl' onClick={()=>(handleRemoveRating())}>
        remove
      </div>
        </div>)}
       
      </div>
    </motion.div>
  );
};

export default RatingComponent;