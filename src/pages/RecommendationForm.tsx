import React from "react";

// import Hero from "../aboutComponents/Hero";
// import Second from "../aboutComponents/Second";
import Footer from "../components/Footer";
import EndFooter from '../components/EndFooter'
import CopyRight from "../components/CopyRight";

import { useState } from "react";

import loginIcon from "../components/photos/icon.png"; // adjust path if needed
import AuthModal from '../components/auth/AuthModal';
// import Third from "@/aboutComponents/Third";
// import Locations from "@/aboutComponents/Locatios";
// import Awards from "@/aboutComponents/Awards";
import FlavourForm from "@/recommednationComponents/FlavourForm";
import ProxyFlavourForm from "@/recommednationComponents/ProxyFlavourForm";


const RecommendationForm = ()=>{
 
    return( <div className="relative h-screen">





      <div className="max-h-[100vh] flex flex-col bg-[#0C0B09] text-white md:pb-0">
      {/* <FlavourForm/> */}
      <ProxyFlavourForm />
      </div>
    </div>)

}

export default RecommendationForm;