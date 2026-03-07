

// import { Phone, ChatCenteredText, MapPin } from "phosphor-react";
// import React from "react";
// import { motion } from "framer-motion";

// const EndFooter: React.FC = () => {
//   return (<div
 
//     className="pb-20 relative overflow-hidden
//     bg-brand-mesh
//     "
    
//   >
//     <footer
//       id="contact"

//       className="relative w-[100vw] text-brand-mesh pt-16 pb-8 z-10 "

//     >
//       <div className="container  w-[100vw] absolute top-0">
//         <div className=" overflow-hidden relative">
         
//           <div style={{
//             position: "relative",          // relativ
//             transform: "translateY(-50%) rotate(-270deg) scale(1.2)",  // combined transforms
//             zIndex: 2,
//             borderRadius: "200%",
//             // z-2 (zIndex: 2)
//           }}
//             className="z-10"
//           >
//             <motion.img
//               src="./webp3/rotate_img.webp"
//               alt="test"
//               initial={{ rotate: 90 }}
//               transition={{ duration: 1.5 }}
//               whileInView={{ rotate: 0 }}
//               viewport={{ once: true, amount: 0.3 }}
//               style={{ borderRadius: "50%" }}
//             />
//           </div>
//         </div>
//       </div>
//     </footer>

//     <div className="">
//       {/* <div className="absolute opacity-30 -top-[45%] -left-[50%] scale-[0.5] h-[330vh] w-[200vw] bg-[url('/webp/bg-pattern-2.webp')] bg-repeat bg-auto bg-black z-2"></div> */}
//       <div className="absolute -top-[80%] -left-[50%] scale-[0.5] h-[350vh] w-[200vw] bg-brand-mesh z-1"></div>
//     </div>
//     <div className="w-full flex flex-col items-center justify-center gap-3 mt-52 mb-8">
//       <ChatCenteredText size={50} color="white" style={{ zIndex: "10" }} />
//       <span className="mt-2 warnes-regular text-white font-cinzel text-lg z-10">
//         about us
//       </span>
//       <span className="text-gray-400 font-lora text-sm z-10">
//         A royal feast in every grain.
//       </span>
      
//     </div>
//     <div className="w-full flex flex-col items-center justify-center gap-3 z-10 mb-8">
//       <Phone size={50} color="white" style={{ zIndex: "10" }} />
//       <span className="mt-2 warnes-regular text-white font-cinzel text-lg z-10">
//         let's talk
//       </span>
//       <span className="text-gray-400 text-sm z-10 font-lora">
//        bagaara&co@gmail.com
//       </span>
//       <span className="text-gray-400 text-sm z-10 font-lora">
//         000-000-000
//       </span>

//     </div>
//     <div className="w-full flex flex-col items-center justify-center gap-3 z-10">
//       <MapPin size={50} color="white" style={{ zIndex: "10" }} />
//       <span className="mt-2 warnes-regular text-white font-cinzel text-lg z-10">
//         contact us
//       </span>
//       <span className="text-gray-400 text-sm z-10 font-lora">
//         City : Hyderabad, India
//       </span>
//       <span className="text-gray-400 text-sm z-10 font-lora" >
//         Outlets: 8
//       </span>
//     </div>
//   </div >)

// }

// export default EndFooter;

import { Phone, ChatCenteredText, MapPin } from "phosphor-react";
import React, { useRef } from "react"; // ✅ CHANGED: added useRef
import { motion, useInView } from "framer-motion"; // ✅ CHANGED: added useInView

const EndFooter: React.FC = () => {

  const ref = useRef(null); // ✅ CHANGED: reference for viewport detection
  const isInView = useInView(ref, { margin: "-20%" }); // ✅ CHANGED: detects enter & leave

  return (
    <div
      className="pb-20 relative overflow-hidden  bg-brand-mesh"
    >

      <footer
        id="contact"
        className="relative w-[100vw] text-brand-mesh pt-16 pb-8 z-1"
      >

        <div className="container w-[100vw] absolute top-0">
          <div className="overflow-hidden relative">

            <div
              ref={ref} // ✅ CHANGED: attached ref here
              style={{
                position: "relative",
                transform: "translateY(-50%)  rotate(-270deg) scale(1.2)", // ✅ CHANGED: removed rotate from CSS (motion will control it)
                zIndex: 2,
                borderRadius: "100%",
              }}
              className="z-10"
            >

              <motion.img
                src="./webp3/rotate_img.webp"
                alt="test"

                style={{ borderRadius: "50%" }}

                animate={{
                  rotate: isInView ? 0 : 180 // ✅ CHANGED: rotate forward when visible, backward when leaving
                }}

                transition={{
                  duration: 1,
                  ease: "easeInOut"
                }}
              />

            </div>
          </div>
        </div>

      </footer>

      <div>
        {/* background layer */}
        <div className="absolute -top-[80%] -left-[50%] scale-[0.5] h-[350vh] w-[200vw] bg-brand-mesh z-1"></div>
      </div>

      <div className="w-full flex flex-col items-center justify-center gap-3 mt-40 mb-8">
        <ChatCenteredText size={50} color="white" style={{ zIndex: "10" }} />
        <span className="mt-2 warnes-regular text-white font-cinzel text-lg z-10">
          about us
        </span>
        <span className="text-gray-400 font-lora text-sm z-10">
          A royal feast in every grain.
        </span>
      </div>

      <div className="w-full flex flex-col items-center justify-center gap-3 z-10 mb-8">
        <Phone size={50} color="white" style={{ zIndex: "10" }} />
        <span className="mt-2 warnes-regular text-white font-cinzel text-lg z-10">
          let's talk
        </span>
        <span className="text-gray-400 text-sm z-10 font-lora">
          bagaara&co@gmail.com
        </span>
        <span className="text-gray-400 text-sm z-10 font-lora">
          000-000-000
        </span>
      </div>

      <div className="w-full flex flex-col items-center justify-center gap-3 z-10">
        <MapPin size={50} color="white" style={{ zIndex: "10" }} />
        <span className="mt-2 warnes-regular text-white font-cinzel text-lg z-10">
          contact us
        </span>
        <span className="text-gray-400 text-sm z-10 font-lora">
          City : Hyderabad, India
        </span>
        <span className="text-gray-400 text-sm z-10 font-lora">
          Outlets: 8
        </span>
      </div>

    </div>
  )
}

export default EndFooter;