import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaMinus } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa6";
import { useCart } from '../context/CartContext';

const UserOrderInputComponent = ({ setter, userOrders, itemName, itemPrice, itemImage, itemRating }) => {
  const [orders, setOrders] = useState(userOrders);
  const { addToCart, decrement } = useCart();

  useEffect(() => {
    setter(orders);
  }, [orders]);

  const handleChange = (e) => {
    const value = e.target.value;
    // Allow only digits and optional empty string
    if (/^\d*$/.test(value)) {
      setOrders(value);
    }
  };
  const incrementOrders = () => {
    const current = parseInt(orders || '0',10);
   
    setOrders(current+1);
    addToCart({
      id: itemName,
      name: itemName,
      price: itemPrice,
      quantity: 1,
      image: itemImage,
      rating: itemRating
    });
  };

  const decrementOrders = () => {
    const current = parseInt(orders || '0', 10);
    if (current > 0) {
      setOrders((current - 1).toString());
        decrement(itemName);
    }
  };

  return (
    <motion.div
      key="order"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className="flex font-lora justify-between pt-4 pb-4 px-5 mb-10 border border-gray-200 rounded-2xl"
    >
      <div>
        <div className="text-sm md:text-xl text-stone-100 -mb-5">Enter number of orders:</div>

        <input
          type="text"
          inputMode="numeric"
          className="w-full p-2 rounded-md text-sm md:text-lg bg-transparent text-yellow-100 placeholder-gray-500 focus:outline-none"
          placeholder="e.g., 10"
          value={parseInt(orders?.toString() || "0")}
          onChange={handleChange}
        />
        <div className='flex justify-between'>
        
            <div className="text-xs md:text-sm mt-2 text-yellow-50">
              Added {orders} order{orders !=='1' ? 's' : ''} to the cart.
            </div>
       

        </div>
      </div>
      <div className='flex flex-col items-center gap-1 justify-center'>
         <div className='flex justify-center gap-2'>
           <div className='pt-2 pb-2 pl-2 pr-2 border border-gray-500 rounded-lg mr-2'  onClick={decrementOrders}>
          <FaMinus className='text-yellow-100 text-sm' />
          </div>
          <div className='pt-2 pb-2 pl-2 pr-2 border border-gray-500 rounded-lg' onClick={incrementOrders}>
          <FaPlus className='text-yellow-100 text-sm'  />
          </div>
         
        </div>
        {/* <div className='mt-3 pt-2 pb-2 pl-5 pr-5 mr-2 border border-gray-500 text-sm text-white rounded-lg' onClick={() => (submitSetter(true))}>
          ADD
        </div>  */}
      </div>
    </motion.div>
  );
};

export default UserOrderInputComponent;



//BHAVANI CODE==========================
// import { useState, useEffect } from 'react';
// import { motion } from 'framer-motion';
// import { FaMinus, FaPlus } from "react-icons/fa6";
// import { useCart } from '../context/CartContext';

// const UserOrderInputComponent = ({ setter, userOrders, itemName, itemPrice, itemImage, itemRating }) => {
//   const [orders, setOrders] = useState(userOrders);
//   const { addToCart, decrement } = useCart();

//   useEffect(() => {
//     setter(orders);
//   }, [orders]);

//   const handleChange = (e) => {
//     const value = e.target.value;
//     if (/^\d*$/.test(value)) {
//       setOrders(value);
//     }
//   };

//   const incrementOrders = () => {
//     const current = parseInt(orders || '0', 10);
//     const updated = current + 1;
//     setOrders(updated.toString());
//     addToCart({
//       id: itemName,
//       name: itemName,
//       price: itemPrice,
//       quantity: 1,
//       image: itemImage,
//       rating: itemRating
//     });
//   };

//   const decrementOrders = () => {
//     const current = parseInt(orders || '0', 10);
//     if (current > 0) {
//       const updated = current - 1;
//       setOrders(updated.toString());
//       decrement(itemName);
//     }
//   };

//   return (
//     <motion.div
//       key="order"
//       initial={{ opacity: 0, y: -10 }}
//       animate={{ opacity: 1, y: 0 }}
//       exit={{ opacity: 0, y: -10 }}
//       transition={{ duration: 0.4, ease: "easeInOut" }}
//       className="flex justify-between pt-4 pb-4 px-5 mb-10 border border-gray-600 rounded-2xl"
//     >
//       <div>
//         <div className="text-sm -mb-5">Enter number of orders:</div>
//         <input
//           type="text"
//           inputMode="numeric"
//           className="w-full p-2 rounded-md text-sm bg-transparent text-white placeholder-gray-500 focus:outline-none"
//           placeholder="e.g., 10"
//           value={orders}
//           onChange={handleChange}
//         />
//         <div className="text-xs mt-2 text-gray-400">
//           Added {orders} order{orders !== '1' ? 's' : ''} to the cart.
//         </div>
//       </div>
//       <div className='flex items-center gap-2 justify-center'>
//         <div className='pt-2 pb-2 pl-2 pr-2 border border-gray-500 rounded-lg' onClick={incrementOrders}>
//           <FaPlus className='text-white-400 text-sm' />
//         </div>
//         <div className='pt-2 pb-2 pl-2 pr-2 border border-gray-500 rounded-lg mr-2' onClick={decrementOrders}>
//           <FaMinus className='text-white-400 text-sm' />
//         </div>
//       </div>
//     </motion.div>
//   );
// };

// export default UserOrderInputComponent;
