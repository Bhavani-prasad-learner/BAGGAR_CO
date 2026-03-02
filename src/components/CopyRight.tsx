import React from "react";
import { InstagramLogo, WhatsappLogo, FacebookLogo } from "phosphor-react";
// import  XLogo  from '../x-logo.svg'
const CopyRight = () => {
  const year = new Date().getFullYear();

  return (
    <div style={{backgroundColor:'[#0C0B09]'}} className="bg-[#171717] h-100 gap-5 p-12 flex flex-col border-t-[0.1px] border-gray-500 rounded-[2rem] items-center justify-center text-center text-sm text-gray-400 w-full z-[20] -mt-10">
    <span className="text-white text-[1.4rem] md:text-[4rem] md:mt-10 fugazone-regular ml-10">
      {/* <span className="font-bold">THE EXOTIC SHAWARMA</span> */}
      <img src="./logo.png" alt="logo" className="h-full w-full"/>
      </span>
        <div className="flex flex-row gap-2 text-white">
            <FacebookLogo size={24} className="md:w-10 md:h-20" />
            <WhatsappLogo size={24}  className="md:w-10 md:h-20"/>
                 <InstagramLogo size={24} className="md:w-10 md:h-20"/>
        </div>
   
      <p className="md:text-xl text-white">&copy; {year} TheExoticShawarma. <br/><span className="underline md:text-xl">All rights reserved.</span></p> 
    </div>
  );
};

export default CopyRight;
