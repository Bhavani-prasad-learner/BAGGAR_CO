// import { Phone, ChatCenteredText, MapPin } from "phosphor-react";
// import React from "react";
// import { motion, AnimatePresence } from "framer-motion"

// const EndFooter: React.FC = () => {
//   return (<div
//     style={{ backgroundColor: "#0C0B09" }} 
//     // className=" relative z-30 gap-8 flex flex-col pb-20"
//     className="pb-20 relative overflow-hidden w-[100vw] h-[fit-content] flex justify-center items-center"
//   >

//     <style>
//     {`
//       @keyframes gradientAnimation {
//         0% { background-position: 0% center; }
//         100% { background-position: 200% center; }
//       }
//     `}
//   </style>

//     <footer
//       id="contact"

//       className="relative w-[100vw] text-white pt-16 pb-8 z-10 "

//     >
//       <div className="container p-0 m-0 w-[100vw] absolute top-0">
//         <div className="h-1/2 overflow-hidden relative">
//           <div className="absolute -top-12 left-0 w-full h-36 bg-gradient-to-t via-[#0C0B09] from-transparent to-[#0C0B09] opacity-100 z-20 overflow-hidden"></div>




//           <div className="absolute border-t-1 border-[#0C0B09] top-0 left-0 w-full h-5 bg-[#0C0B09] opacity-100 z-20 p-0 -mt-2 overflow-hidden"></div>

//           <div style={{
//             position: "relative",          // relativ
//             transform: "translateY(-50%) rotate(-180deg) scale(1.2)",  // combined transforms
//             zIndex: 2,
//             borderRadius: "200%",
//             // z-2 (zIndex: 2)
//           }}
//             className="z-10"
//           >
//             <motion.img
//               src="./webp/new_top-view.webp"
//               alt="test"
//               initial={{ rotate: 180 }}
//               transition={{ duration: 1 }}
//               whileInView={{ rotate: 0 }}
//               viewport={{ once: true, amount: 0.3 }}
//               style={{ borderRadius: "50%" }}
//             />
//           </div>
//         </div>
//       </div>
//     </footer>

//     <div className="">
//       <div className="absolute -top-[55%] -left-[50%] scale-[0.5] h-[300vh] w-[200vw] bg-[url('/webp/bg-pattern-2.webp')] bg-repeat bg-auto bg-black z-5"></div>
//       <div className="absolute -top-[55%] -left-[50%] scale-[0.5] h-[300vh] w-[200vw] bg-black opacity-50 z-1"></div>

//       {/* <div className="absolute -top-[45%] -left-[50%] scale-[0.5] h-[300vh] w-[200vw] bg-black opacity-30 z-1"></div> */}
//     </div>

// <div
//   className="mt-20 px-16 py-1 w-fit rounded-full relative"
//   style={{
//    backgroundImage:"linear-gradient(to right, #FC2E20, #FD7F20, #FDB750,#FD7F20, #FC2E20)",
//    backgroundSize: "200% auto",
//        backgroundPosition: "0% center",
//     animation: "gradientAnimation 4s linear infinite",        
//     padding: "3px", // border thickness
    
//   }}
// >
//     <div style={{backgroundColor:"#171717"}} 
    
//     className="overflow-hidden relative px-16 py-1 h-[fit-content] w-[fit-content] border-t rounded-full justify-center items-center z-5">

  
    
//     <div className="w-full flex flex-col items-center justify-center gap-3 mt-8 mb-8">
//       <ChatCenteredText size={50} color="white" style={{ zIndex: "10" }} className="md:w-20 md:h-20"/>
//       <span className="mt-2 lobster-regular text-white  z-10">
//         <span className="text-3xl md:text-5xl">about us</span>
        
//       </span>
//       <span className="text-gray-400 text-sm md:text-xl z-10">
//         Where sweet bakes meet 
//       </span>
//       <span className="text-gray-400 text-sm md:text-xl z-10">
//        mindful matcha.
//       </span>
//     </div>
//     <div className="w-full flex flex-col items-center justify-center gap-3 z-10 mb-8">
//       <Phone size={50} color="white" style={{ zIndex: "10" }} className="md:w-20 md:h-20" />
//       <span className="mt-2 lobster-regular text-white text-lg z-10">
//         <span className="text-3xl md:text-5xl">let's talk</span>
//       </span>
//       <span className="text-gray-400 text-sm md:text-xl z-10">
//         SugarAffair@gmail.com
//       </span>
//       <span className="text-gray-400 text-sm md:text-xl z-10">
//         000-000-000
//       </span>

//     </div>
//     <div className="w-full flex flex-col items-center justify-center gap-3 z-10 mb-10">
//       <MapPin size={50} color="white" style={{ zIndex: "10" }} className="md:w-20 md:h-20" />
//       <span className="mt-2 lobster-regular text-white text-lg z-10">
//              <span className="text-3xl md:text-5xl">contact us </span>

//       </span>
//       <span className="text-gray-400 text-sm md:text-xl z-10">
//           IconEbene, Rue de L'Institut
//       </span>
//       <span className="text-gray-400 text-sm md:text-xl z-10">
//         Branches: 1
//       </span>
//     </div>
//     </div>
//     </div>
//   </div >)

// }

// export default EndFooter;

import { Phone, ChatCenteredText, MapPin } from "phosphor-react";
import React from "react";
import { motion } from "framer-motion";

const EndFooter: React.FC = () => {
  return (<div
    // style={{ backgroundColor: "#0C0B09" }} 
    // className=" relative z-30 gap-8 flex flex-col mt-52 pb-20"
    className="pb-20 relative overflow-hidden
    bg-brand-mesh
    "
    
  >
    <footer
      id="contact"

      className="relative w-[100vw] text-brand-mesh pt-16 pb-8 z-10 "

    >
      <div className="container p-0 m-0 w-[100vw] absolute top-0">
        <div className="h-1/2 overflow-hidden relative">
          {/* Gradient overlay */}
          <div className="absolute -top-12 left-0 w-full h-36 bg-gradient-to-t via-[#0C0B09] from-transparent to-[#0C0B09] opacity-100 z-20 overflow-hidden"></div>




          <div className="absolute border-t-1 border-[#0C0B09] top-0 left-0 w-full h-5 bg-[#0C0B09] opacity-100 z-20 p-0 -mt-2 overflow-hidden"></div>

          {/* Image */}
          <div style={{
            position: "relative",          // relativ
            transform: "translateY(-50%) rotate(-180deg) scale(1.2)",  // combined transforms
            zIndex: 2,
            borderRadius: "200%",
            // z-2 (zIndex: 2)
          }}
            className="z-10"
          >
            <motion.img
              src="./webp2/rotate-platter.webp"
              alt="test"
              initial={{ rotate: 180 }}
              transition={{ duration: 1 }}
              whileInView={{ rotate: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              style={{ borderRadius: "50%" }}
            />
          </div>
        </div>
      </div>
    </footer>

    <div className="">
      {/* <div className="absolute opacity-30 -top-[45%] -left-[50%] scale-[0.5] h-[330vh] w-[200vw] bg-[url('/webp/bg-pattern-2.webp')] bg-repeat bg-auto bg-black z-2"></div> */}
      <div className="absolute -top-[80%] -left-[50%] scale-[0.5] h-[350vh] w-[200vw] bg-brand-mesh z-1"></div>
    </div>
    <div className="w-full flex flex-col items-center justify-center gap-3 mt-52 mb-8">
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
      <span className="text-gray-400 text-sm z-10 font-lora" >
        Outlets: 8
      </span>
    </div>
  </div >)

}

export default EndFooter;