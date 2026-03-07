import React from "react";
import { InstagramLogo, WhatsappLogo, FacebookLogo } from "phosphor-react";

const CopyRight = () => {
  const year = new Date().getFullYear();

  return (
    <div className="bg-brand-mesh-premium">
    <div  className="bg-brand-mesh-premium h-100 gap-5 p-12 flex flex-col vedic-border-y rounded-[2rem] items-center justify-center text-center text-sm text-gray-400 w-full z-[20] -mt-10">
      
    <span className="text-white text-[1.4rem] md:text-[4rem] md:mt-5 fugazone-regular ">
      
      <img src="./bg_logo.png" alt="logo" />
      </span>
        <div className="flex flex-row gap-2 text-[#DFBA6B]">
            <FacebookLogo size={24} className="md:w-10 md:h-20" />
            <WhatsappLogo size={24}  className="md:w-10 md:h-20"/>
                 <InstagramLogo size={24} className="md:w-10 md:h-20"/>
        </div>
   
      <p className="md:text-xl text-[#DFBA6B] font-cinzel">&copy; {year} BAGAARA & CO. <br/><span className="underline md:text-xl font-lora">All rights reserved.</span></p> 
    </div>
    </div>
  );
};

export default CopyRight;
