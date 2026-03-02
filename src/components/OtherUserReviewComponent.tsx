import React from 'react';
import { motion } from 'framer-motion';
import { LiaThumbsUpSolid } from "react-icons/lia";
import { LiaThumbsDownSolid } from "react-icons/lia";

const OtherUserReviewComponent = ({ userData }) => {
    return (
        <motion.div
            key="other-review"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            className="flex flex-col gap-5 h-54 pt-4 pb-4 px-5 mb-6 border border-gray-700 rounded-2xl overflow-auto"
        >

            {userData.length>0 ? userData.map((value,index)=>(
            <div className='flex justify-between' key={index} >
                <div>
                    <div className="text-sm md:text-lg text-[rgb(255,89,0)] mb-1">{value.name || 'Anonymous'}</div>
                    <div className="text-sm md:text-lg text-gray-500 mb-2 whitespace-pre-wrap">{value.review}</div>

                    {value.rating !== undefined && (
                        <div className="text-xs md:text-sm text-gray-400">
                            Rated: {value.rating} star{value.rating > 1 ? 's' : ''}, {value.timestamp!==null?value.timestamp.toDate().toLocaleDateString():"just now"}

                        </div>
                    )}
                </div>
                {/* <div className='h-100% w-100%'>
                    <div className='flex gap-2  items-center justify-center h-full'>
                        <LiaThumbsUpSolid className='text-2xl scale-[0.95] opacity-80 ' />
                        <LiaThumbsDownSolid className='text-2xl scale-[0.95] opacity-80 ' />
                    </div>
                </div> */}

            </div>
            )):
            (
                <div className='flex justfy-center items-center text-sm text-gray-500 '>
                    No reviews found.
                </div>
            )
            }
        </motion.div>
    );
};

export default OtherUserReviewComponent;
