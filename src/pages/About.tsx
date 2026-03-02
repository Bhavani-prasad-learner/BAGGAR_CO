import React from "react";

import Hero from "../aboutComponents/Hero";
import Second from "../aboutComponents/Second";
import Footer from "../components/Footer";
import EndFooter from '../components/EndFooter'
import CopyRight from "../components/CopyRight";

import { useState } from "react";

import loginIcon from "../components/photos/icon.png"; // adjust path if needed
import AuthModal from '../components/auth/AuthModal';
import Third from "@/aboutComponents/Third";
import Locations from "@/aboutComponents/Locatios";
import Awards from "@/aboutComponents/Awards";
import { ArrowLeft } from "lucide-react";


const About = () => {

  return (<div className="relative min-h-screen">





    <div className="min-h-100svh max-h-[fit-content] flex flex-col bg-[#0C0B09] text-white md:pb-0">
      <main className="flex-grow">

        <Hero />
        <Second />
        <Third />
        <Awards />
        <Locations />
        <a href='/' className="flex justify-center">
          <div className="flex justify-center items-center gap-3  text-center border border-grey-500 rounded-2xl px-2 w-[fit-content]">
            <ArrowLeft className="text-blue-500"/>
            <div className="text-lg text-blue-500">  Go back to home</div>
          </div>
        </a>
      </main>


      <EndFooter />
      <CopyRight />
    </div>
  </div>)

}

export default About;