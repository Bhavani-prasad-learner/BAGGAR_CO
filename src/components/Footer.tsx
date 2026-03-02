import { motion, useScroll, useTransform } from "framer-motion";

import React from "react";
const Footer: React.FC = () => {

  return (
<footer
  id="contact"
  
  className="relative w-[100vw] text-white pt-16 pb-8 z-10 " 
  style={{  backgroundColor: "#0C0B09" 
}}
>
  <div className="container p-0 m-0 w-[100vw] absolute top-0" style={{   backgroundColor: "#0C0B09"                // z-2 (zIndex: 2)
}}>
    <div className="h-1/2 overflow-hidden relative" style={{ backgroundColor: "#0C0B09" }}>
      {/* Gradient overlay */}
<div className="absolute -top-12 left-0 w-full h-36 bg-gradient-to-t via-[#0C0B09] from-transparent to-[#0C0B09] opacity-100 z-20"></div>



         
<div className="absolute border-t-1 border-[#0C0B09] top-0 left-0 w-full h-5 bg-[#0C0B09] opacity-100 z-20 p-0 -mt-2  "></div>

      {/* Image */}
      <div style={{
  position: "relative",          // relativ
  transform: "translateY(-50%) rotate(-180deg) scale(1.2)",  // combined transforms
  zIndex: 2,
  borderRadius:"200%",
   backgroundColor: "#0C0B09"                // z-2 (zIndex: 2)
}}   
className="z-10"
>
      <motion.img
        src="./webp/new_top-view.webp"
        alt="test"
             initial={{ rotate:180 }}
        transition={{ duration: 1 }}
      whileInView={{ rotate: 0}}
       viewport={{ once: true, amount: 0.3 }}
       style={{ borderRadius: "50%" }}
      />
      </div>
    </div>
  </div>
</footer>

   

  );
};

export default Footer;
