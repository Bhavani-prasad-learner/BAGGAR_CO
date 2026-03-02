import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { FaRegHeart } from "react-icons/fa6";
import { TbShoppingCart } from "react-icons/tb";
import { TbShoppingCartCheck } from "react-icons/tb";
import { FaRegCommentAlt } from "react-icons/fa";
import { IoInformationSharp } from "react-icons/io5";
import { MdOutlineReportProblem } from "react-icons/md";
import { GoStar } from "react-icons/go";
import { FaHeart } from "react-icons/fa";
// ADD this with other imports
import { useCart } from '../context/CartContext';
import { useNavigate, useLocation } from 'react-router-dom';

import FlavourProfileBars from './FlavourProfileBars';
import RatingComponent from './RatingComponent';
import UserReviewComponent from './UserReviewComponent';
import UserOrderInputComponent from './UserOrderInputComponent';
import TopUserReviewComponent from './TopUserReviewComponent';
import OtherUserReviewComponent from './OtherUserReviewComponent';
import { userInfo } from 'os';
import LQIPImage from './LQIPImage';
import submitReview from '../hooks/submitReview';
import getReview from '../hooks/getReview';
import getOtherReviews from '../hooks/getOtherReviews'
import { auth } from '@/firebase/firebaseConfig'
import { motion, AnimatePresence } from 'framer-motion';
import { Close } from '@radix-ui/react-toast';
import { useDominantFlavours } from "@/hooks/useDominantFlavours"


const MemeCard = ({ scrollContainerRef, itemName, lowpicPath, HighpicPath, price, itemRating, flavourProfile, chefInfo, calInfo, closeMenu }) => {
  const { addToCart } = useCart(); // Add this below useState hooks
  const navigate = useNavigate();
  const location = useLocation();
  const dominantFlavours = useDominantFlavours(flavourProfile, {
    minScore: 3 ,
    maxItems: 4,
  });
  const [Liked, setLiked] = useState(false)
  const [orderAdded, setorderAdded] = useState(false)
  const [rating, setRating] = useState(0)
  const [review, setReview] = useState('')
  const [reviewSubmit, setReviewSubmit] = useState(false)
  const [noOrders, setNoOrders] = useState(0)
  const [showAbout, setShowAbout] = useState(true);
  const [OpentopComment, setOpenTopComment] = useState(true)
  const [openLiked, setOpenLiked] = useState(false)
  const [openCartBlock, setOpenCartBlock] = useState(false)
  const [openReviews, setOpenReviews] = useState(false)
  const [openInfo, setOpenInfo] = useState(false)
  const [otherUserReviews, setOtherUserReviews] = useState([])
  const [IsUserLoggedIn, setIsUserLoggedIn] = useState(false)
  const [isImageClicked, setIsImageClicked] = useState(false);
  const isCartPage = location.pathname === '/cart';

  useEffect(() => {
    const userId = auth.currentUser?.uid
    if (userId) {
      setIsUserLoggedIn(true)
    }
    const foodItemId = itemName
    const fetchrating = async () => {
      const userrating = await getOtherReviews(foodItemId);
      if (userrating) {
        setOtherUserReviews(userrating)
        // console.log('fetched other user reviews sucessfully')
      }
    }
    fetchrating()
  }, [reviewSubmit])


  useEffect(() => {
    const userId = auth.currentUser?.uid
    const foodItemId = itemName
    const fetchrating = async () => {
      const userrating = await getReview({ foodItemId, userId });
      if (userrating) {
        setRating(userrating.rating);
        setReview(userrating.review);
        setLiked(true)
        // console.log('fetched user sucessfully', userrating.rating, userrating.review)
      }
    }
    if (userId) {
      fetchrating()
    }
  }, [reviewSubmit])

  useEffect(() => {
    // console.log('review processing:')
    const userId = auth.currentUser?.uid;
    const userName = auth.currentUser?.displayName
    const foodItemId = itemName;
    const reviewText = review;
    if (reviewSubmit && review.trim()) {
      submitReview({ foodItemId, userId, userName, reviewText, rating });
      // console.log('review submitted')

    }
  }, [reviewSubmit]);



  // useEffect(() => {
  //   if (rating != 0 && IsUserLoggedIn &&review==='') {
  //     setLiked(false)
  //     setRating(0)
  //   }
  // }, [rating])

  const handleOpenLike = () => {
    if (openCartBlock || openInfo || openReviews || OpentopComment) {
      setOpenTopComment(false);
      setOpenCartBlock(false);
      setOpenInfo(false);
      setOpenReviews(false);
      setTimeout(() => {
        setOpenLiked(true);
      }, 250)
    }
    else {
      setOpenLiked(true);
    }
  }
  const handleClosedLike = () => {
    setOpenTopComment(true);
    setOpenLiked(false);
  }
  const handleCloseCart = () => {
    setOpenTopComment(true);
    setOpenCartBlock(false);
  }
  const handleOpenCartBlock = () => {
    setOpenTopComment(false)
    setOpenLiked(false);
    setOpenCartBlock(true);
    setOpenInfo(false);
    setOpenReviews(false);
    // addToCart({
    //   id: itemName,
    //   name: itemName,
    //   price: price,
    //   quantity: noOrders,
    //   image: HighpicPath,
    //   rating: itemRating
    // });
  }

  const handleOpenInfo = () => {
    if (openCartBlock || openLiked || openReviews || OpentopComment) {
      setOpenTopComment(false);
      setOpenCartBlock(false);
      setOpenLiked(false);
      setOpenReviews(false);
      setTimeout(() => {
        setOpenInfo(true);
      }, 250)
    }
    else {
      setOpenInfo(true);
    }
  }

  const handleCloseInfo = () => {
    setOpenTopComment(true);
    setOpenInfo(false);
  }

  const handleOpenReviews = () => {
    if (openCartBlock || openInfo || openLiked || OpentopComment) {
      setOpenTopComment(false);
      setOpenCartBlock(false);
      setOpenLiked(false);
      setOpenInfo(false);
      setTimeout(() => {
        setOpenReviews(true);
      }, 250)
    }
    else {
      setOpenReviews(true);
    }
  }

  const handleCloseReviews = () => {
    setOpenTopComment(true);
    setOpenReviews(false);
  }

  const handleImageClick = () => {
    setIsImageClicked(true);
  }

  const handleCartClick = () => {
    if (closeMenu) closeMenu(); // Synchronously close overlay
    setTimeout(() => {
      // navigate('/cart');
    }, 300);
  }

  return (<div className='flex-column'>
    <div className="w-100vw justiify-center items-center mb-0 bg-[#171717] overflow-hidden rounded-[1.2rem] px-1 py-2 md:py-4">
      <div className='flex justify-between items-center block pb-2 gap-6'>
        <span className='pl-2 cormorant_garamond-regular text-white font-bold text-xl max-w-[95%] md:text-4xl md:pl-4' >{itemName}</span>
        <div className='flex flex-row justify-center items-center mr-2 md:mr-4 w-20 min-w-fit pl-2 pr-2 md:py-8 md:pl-4 md:pr-4 gap-1  h-10 rounded-xl'>
          <span className='text-xl scale-[0.85] text-white font-[400] md:text-4xl'>  RS {price}  </span>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} className='-ml-1 w-[425px] h-[450px] 
    md:w-[100%] md:h-[570px] flex justify-center items-center'>
        {/* <img src={picPath} alt="test" style={{ width: "100%", height: "100%" }} /> */}
        <div style={{ width: "100%", height: "100%" }} className='relative' 
        // onClick={() => handleImageClick()}
        >
          {isImageClicked && (<>
            <div className="absolute top-0 left-0 bg-black opacity-60 h-full w-full z-10" />
            <div className="absolute top-0  left-0 h-full w-full z-20 flex flex-col justify-center items-center gap-10 text-lg whitespace-nowrap text-white">
              <span className="quintessential-regular tracking-wider text-5xl">Add to cart?</span>
              <div className='flex flex-col gap-4 items-center'>
                <button onClick={(e) => {
                  e.stopPropagation();
                  handleOpenCartBlock();
                  setNoOrders(parseInt(noOrders.toString()) + 1);
                  addToCart({
                    id: itemName,
                    name: itemName,
                    price: price,
                    quantity: 1,
                    image: HighpicPath,
                    rating: itemRating
                  });
                  if (scrollContainerRef.current) {
                    scrollContainerRef.current.scrollBy({ top: 100, behavior: "smooth" });
                  }
                  setIsImageClicked(false);
                }
                } className="z-30 md:w-64 w-44 md:py-4 md:px-8 py-2 px-4 uppercase tracking-wide font-semibold border border-white text-white font-medium rounded-2xl text-center">Yes</button>
                <button onClick={(e) => {
                  e.stopPropagation();
                  setIsImageClicked(false)
                }
                } className="z-30 md:w-64 w-44 md:py-4 md:px-4 py-2 px-2 uppercase tracking-wide font-semibold border border-white text-white font-medium rounded-2xl text-center">No</button>
              </div>
            </div>
          </>)}
          <LQIPImage
            lowSrc={lowpicPath}
            highSrc={HighpicPath}
            alt="image failed to load, try again"

          />
          {showAbout && (
            <div className="absolute bottom-1 left-[1%] bg-[#2E2E2E]/80 h-36 px-4 py-2 w-[98vw] h-[fit-content] rounded-xl flex flex-col justify-between">
              <div className="flex flex-col gap-2">
                <div className='flex flex-row justify-between'>
                  <h3 className="text-sm text-white font-bold  truncate">
                    About {itemName}
                  </h3>
                  <span className="text-sm font-bold text-red-600 font-bold  truncate" onClick={() => setShowAbout(false)}>
                    close
                  </span>
                </div>

                <div className="text-xs text-gray-200 overflow-hidden">
                  {/* 4.5 <GoStar /> */}
                  {chefInfo}
                </div>

                {dominantFlavours.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-1">
                    {dominantFlavours.map(({ key, value, label }) => (
                      <span
                        key={key}
                        className="px-2 py-0.5 rounded-full font-bold text-xs bg-[#0C0B09]/40 text-white capitalize"
                      >
                        {label} ({value}/5)
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>

          )}

        </div>
      </div>
      <div className='flex justify-between'>
        <div className="px-4 py-3 text-sm text-white">
          <div className='flex flex-row gap-6 md:gap-8'>

            {!Liked ? (!openLiked ? <FaRegHeart className="scale-[0.95] opacity-80 text-2xl md:text-4xl text-white" onClick={() => handleOpenLike()} />
              : <FaRegHeart className="text-2xl md:text-4xl text-red-500 md:text-4xl" onClick={() => handleClosedLike()} />
            ) : (!openLiked ? <FaHeart className="scale-[0.95] opacity-80 text-2xl md:text-4xl text-red-500" onClick={() => handleOpenLike()} />
              : <FaHeart className="text-2xl text-red-500 md:text-4xl" onClick={() => handleClosedLike()} />)
            }



            {!openCartBlock ?
              <button onClick={() => {
                handleOpenCartBlock();
                // document.getElementById('cart-section')?.scrollIntoView({ behavior: 'smooth' });
              }} className="cursor-pointer hover:scale-110 transition-transform">
                <TbShoppingCart className="scale-[1.1] opacity-80 text-2xl md:text-4xl md:scale[1.2] md:mb-1 text-white" />
              </button>
              :
              <button
                onClick={handleCloseCart}
                className="cursor-pointer"
              >
                <TbShoppingCartCheck className="scale-[1.1] opacity-80 text-2xl md:text-4xl md:scale-[1.2] md:mb-1 text-green-500 " />
              </button>
            }

            {!openReviews ?
              <FaRegCommentAlt className="scale-[0.95] opacity-80  text-2xl md:text-4xl md:scale-[0.85] text-white md:mt-1" onClick={() => handleOpenReviews()} />

              :
              <FaRegCommentAlt className="scale-[0.95] opacity-80  text-2xl md:text-4xl md:scale-[0.85] text-blue-500 md:mt-1" onClick={() => handleCloseReviews()} />
            }

            {!openInfo ?
              <IoInformationSharp className="scale-[1.1] opacity-80  text-3xl md:text-5xl text-white -mt-1" onClick={() => handleOpenInfo()} />

              :
              <IoInformationSharp className="scale-[1.1] opacity-80  text-3xl  md:text-5xl text-[rgb(255,89,0)] -mt-1" onClick={() => handleCloseInfo()} />

            }

          </div>
        </div>
        <div className='flex gap-2 mt-2 mr-6'>
          {noOrders > 0 ? (<>
            <button
              onClick={handleCartClick}
              className="cursor-pointer hover:scale-110 transition-transform"
            >
              <TbShoppingCartCheck className="scale-[1.1] opacity-80 mb-2 text-2xl md:text-4xl md:scale-[1.2] md:mb-4 text-green-500" />
            </button>
            <span className='text-2xl md:text-4xl text-white scale-[0.95] mr-2 opacity-100 '>{noOrders}</span></>) : null}


          <GoStar className='text-2xl md:text-4xl text-yellow-500 mt-1' />
          <span className='text-2xl md:text-4xl text-white/80 scale-[0.95] opacity-100 '>{itemRating}</span>
        </div>
      </div>
      {OpentopComment && otherUserReviews?.length > 0 && (
        <AnimatePresence>
          {(
            <motion.div
              key="lol"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{
                duration: 0.4,
                ease: "easeInOut"
              }}


            >
              <TopUserReviewComponent timestamp={otherUserReviews[0].timestamp?.toDate().toLocaleDateString()} viewMore={handleOpenReviews} username={otherUserReviews[0].name} reviewText={otherUserReviews[0].review} rating={"5"} />
            </motion.div>
          )}
        </AnimatePresence>
      )}

      <AnimatePresence>
        {openCartBlock && (
          <motion.div
            key="lol"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{
              duration: 0.4,
              ease: "easeInOut"
            }}


          >
            <UserOrderInputComponent
              userOrders={noOrders}
              setter={setNoOrders}
              itemName={itemName}
              itemPrice={price}
              itemImage={HighpicPath}
              itemRating={itemRating} />
          </motion.div>
        )}
      </AnimatePresence>


      <AnimatePresence>
        {openLiked && (
          <motion.div
            key="lol"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{
              duration: 0.4,
              ease: "easeInOut"
            }}


          >
            <RatingComponent userLiked={setLiked} userRating={rating} setter={setRating} />
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {!reviewSubmit && openLiked && rating > 0 && (
          <motion.div
            key="lol"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{
              duration: 0.4,
              ease: "easeInOut"
            }}
          >
            <UserReviewComponent logFlag={IsUserLoggedIn} review={review} reviewSetter={setReview} submitSetter={setReviewSubmit} />

          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {openInfo && (
          <motion.div
            key="lol"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{
              duration: 0.4,
              ease: "easeInOut"
            }}
          >
            <FlavourProfileBars profile={flavourProfile} chefInfo={chefInfo} calInfo={calInfo} />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {openReviews && (
          <motion.div
            key="lol"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{
              duration: 0.4,
              ease: "easeInOut"
            }}
          >
            {/* <OtherUserReviewComponent userData={[{ userInfo: "Sreenesh", reviewText: "Excellent, tasty.", rating: 5 }, { userInfo: "Sreenesh", reviewText: "Excellent, tasty.", rating: 5 }, { userInfo: "Sreenesh", reviewText: "Excellent, tasty.", rating: 5 }, { userInfo: "Sreenesh", reviewText: "Excellent, tasty.", rating: 5 }, { userInfo: "Sreenesh", reviewText: "Excellent, tasty.", rating: 5 }]} /> */}
            <OtherUserReviewComponent userData={otherUserReviews} />

          </motion.div>
        )}
      </AnimatePresence>


    </div>
  </div>
  );
};

export default MemeCard;



// MemeCard.tsx BHAVANI ===================================================
// import React, { useEffect, useState } from 'react';
// import { TbShoppingCart, TbShoppingCartCheck } from "react-icons/tb";
// import { FaHeart, FaRegHeart, FaRegCommentAlt } from "react-icons/fa";
// import { IoInformationSharp } from "react-icons/io5";
// import { motion, AnimatePresence } from 'framer-motion';
// import { GoStar } from "react-icons/go";
// import { useCart } from '../context/CartContext';
// import FlavourProfileBars from './FlavourProfileBars';
// import RatingComponent from './RatingComponent';
// import UserReviewComponent from './UserReviewComponent';
// import UserOrderInputComponent from './UserOrderInputComponent';
// import TopUserReviewComponent from './TopUserReviewComponent';
// import OtherUserReviewComponent from './OtherUserReviewComponent';

// const MemeCard = ({ itemName, picPath, price, itemRating, flavourProfile, chefInfo, calInfo }) => {
//   const { addToCart } = useCart();
//   const [Liked, setLiked] = useState(false);
//   const [rating, setRating] = useState(0);
//   const [review, setReview] = useState('');
//   const [reviewSubmit, setReviewSubmit] = useState(false);
//   const [noOrders, setNoOrders] = useState('0');
//   const [OpentopComment, setOpenTopComment] = useState(true);
//   const [openLiked, setOpenLiked] = useState(false);
//   const [openCart, setOpenCart] = useState(false);
//   const [openReviews, setOpenReviews] = useState(false);
//   const [openInfo, setOpenInfo] = useState(false);

//   useEffect(() => {
//     if (rating !== 0) setLiked(true);
//   }, [rating]);

//   return (
//     <div className="flex-column">
//       <div className="max-w-md mx-auto mb-1 bg-[rgb(33, 33, 33)] overflow-hidden">
//         <div className="flex justify-between pb-2">
//           <span className="pl-2 warnes-regular text-3xl max-w-[75%]">{itemName}</span>
//           <div className="flex flex-row justify-center mr-2 w-20 pl-2 pr-2 gap-1 border border-gray-500 rounded-2xl h-10">
//             <span className="text-2xl mt-1 scale-[0.85] opacity-95">&#8377; {price}</span>
//           </div>
//         </div>

//         <div className="flex justify-center items-center w-[400px] h-[500px]">
//           <img src={picPath} alt={itemName} className="w-full h-full object-cover" />
//         </div>

//         <div className="flex justify-between">
//           <div className="px-4 py-3 text-sm text-white">
//             <div className="flex flex-row gap-6">
//               {Liked ? (
//                 <FaHeart className="text-2xl text-red-500" onClick={() => setLiked(false)} />
//               ) : (
//                 <FaRegHeart className="text-2xl text-white" onClick={() => setLiked(true)} />
//               )}

//               <TbShoppingCart
//                 onClick={() => {
//                   const quantity = parseInt(noOrders || '0', 10) || 1;
//                   setNoOrders(quantity.toString());
//                   setOpenTopComment(false);
//                   setOpenLiked(false);
//                   setOpenCart(true);
//                   setOpenInfo(false);
//                   setOpenReviews(false);
//                   addToCart({
//                     id: itemName,
//                     name: itemName,
//                     price: price,
//                     quantity: quantity,
//                     image: picPath,
//                     rating: itemRating
//                   });
//                 }}
//                 className={`scale-[0.95] opacity-80 text-2xl ${openCart ? 'text-green-500' : 'text-white'}`}
//               />

//               <FaRegCommentAlt className={`text-2xl ${openReviews ? "text-blue-500" : "text-white"}`} onClick={() => setOpenReviews(!openReviews)} />
//               <IoInformationSharp className={`text-3xl ${openInfo ? "text-orange-500" : "text-white"}`} onClick={() => setOpenInfo(!openInfo)} />
//             </div>
//           </div>
//           <div className="flex gap-2 mt-2 mr-6">
//             {parseInt(noOrders || '0', 10) > 0 && (
//               <>
//                 <TbShoppingCartCheck className="text-2xl text-green-500 mt-1" />
//                 <span className="text-2xl text-white scale-[0.95] mr-5">{noOrders}</span>
//               </>
//             )}
//             <GoStar className="text-2xl text-yellow-500 mt-1" />
//             <span className="text-2xl text-white scale-[0.95]">{itemRating}</span>
//           </div>
//         </div>

//         <AnimatePresence>
//           {openCart && (
//             <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.4 }}>
//               <UserOrderInputComponent
//                 userOrders={noOrders}
//                 setter={setNoOrders}
//                 itemName={itemName}
//                 itemPrice={price}
//                 itemImage={picPath}
//                 itemRating={itemRating}
//               />
//             </motion.div>
//           )}
//         </AnimatePresence>

//         {openInfo && <FlavourProfileBars profile={flavourProfile} chefInfo={chefInfo} calInfo={calInfo} />}
//         {openLiked && <RatingComponent userLiked={setLiked} userRating={rating} setter={setRating} />}
//         {openLiked && rating > 0 && !reviewSubmit && (
//           <UserReviewComponent reviewSetter={setReview} submitSetter={setReviewSubmit} />
//         )}
//         {openReviews && (
//           <OtherUserReviewComponent userData={[
//             { userInfo: "Sreenesh", reviewText: "Excellent, tasty.", rating: 5 },
//             { userInfo: "Sreenesh", reviewText: "Loved it.", rating: 4.5 }
//           ]} />
//         )}
//         {OpentopComment && <TopUserReviewComponent viewMore={() => setOpenReviews(true)} username="Sreenesh" reviewText="Excellent, perfectly cooked!" rating="5" />}
//       </div>
//     </div>
//   );
// };

// export default MemeCard;
