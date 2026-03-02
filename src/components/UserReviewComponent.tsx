import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BiError } from "react-icons/bi";


const UserReviewComponent = ({ logFlag, review, reviewSetter, submitSetter }) => {

  const [tempreview, setReview] = useState(review);
  const [reviewEmptyFlag, setReviewEmptyFlag]=useState(false)
  useEffect(()=>{
  if(review===''){
    setReviewEmptyFlag(true)
  }
  else{
    setReviewEmptyFlag(false)
  }
  },[])

  useEffect(() => {
    reviewSetter(tempreview);
  }, [tempreview]);

  return (
    <motion.div
      key="review"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className="pt-4 pb-4 px-5 mb-10 border border-gray-700 rounded-2xl"
    >
      <div className="text-sm md:text-xl mb-2 text-white">Write your review:</div>

      <textarea
        className="w-full min-h-[80px] p-2 text-sm md:text-lg bg-transparent text-white placeholder-gray-500 focus:outline-none"
        placeholder="Type your thoughts here..."
        value={tempreview}
        onChange={(e) => setReview(e.target.value)}
      />

      <div className='flex justify-between'>
        {(
          <div className="text-xs md:text-lg mt-2 text-gray-500">
            {logFlag ?
              <span>          Your review matters to us a lot!
              </span>
              :
               <span className='flex flex-row gap-1 justify-center items-center md:text-xl text-red-500'>    <BiError className='text-red-500 text-lg md:text-2xl -mt-1' />   Please Login to add a review.
              </span>
              }
        </div>
        )}
        <div className={`pt-2 pb-2 pl-5 pr-5 mr-2 border ${logFlag?'border-gray-500':'border-gray-300'} text-sm md:text-lg text-white rounded-2xl `} onClick={() => (submitSetter(true))}>
          {reviewEmptyFlag ?

            <span className={`${logFlag?'':'opacity-50 pointer-events-none'}`}>add review</span>
            :
            <span>edit</span>
          }
        </div>
      </div>
    </motion.div>
  );
};

export default UserReviewComponent;
