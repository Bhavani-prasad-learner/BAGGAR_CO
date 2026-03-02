import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { LiaThumbsUpSolid } from "react-icons/lia";
import { LiaThumbsDownSolid } from "react-icons/lia";

const TopUserReviewComponent = ({ timestamp, username, reviewText, rating, viewMore }) => {
    const [thumbs,setThumbs]=useState(-1)
    return (
        <motion.div
            key="other-review"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            className="pt-4 pb-4 px-5 mb-6 border border-gray-700 rounded-2xl"
        >
            <div className='flex justify-between' >
                <div>
                    <div className="text-sm md:text-lg text-[rgb(255,89,0)] mb-1 md:mb-1">{username || 'Anonymous'}</div>
                    <div className="text-sm md:text-lg text-gray-500 mb-2 whitespace-pre-wrap">{reviewText}</div>

                    {rating !== undefined && (
                        <div className="text-xs md:text-sm text-gray-400">
                            Rated: {rating} star{rating > 1 ? 's' : ''}, {timestamp?timestamp:"just now"}.
                        </div>
                    )}
                </div>
                {/* <div className='h-100% w-100%'>
                    <div className='flex gap-2  items-center justify-center h-full'>
                        <LiaThumbsUpSolid className={`text-2xl scale-[0.95] opacity-80 ${thumbs===1?'text-green-500':null}`} onClick={()=>setThumbs(1)} />
                        <LiaThumbsDownSolid className={`text-2xl scale-[0.95] opacity-80 ${thumbs===0?'text-red-500':null}`} onClick={()=>setThumbs(0)}/>
                    </div>
                </div> */}

            </div>
            <div className='flex justify-center mt-4 md:mt-6 text-sm md:text-lg text-gray-400' onClick={()=>viewMore(true)}>
                view more
            </div>

        </motion.div>
    );
};

export default TopUserReviewComponent;
