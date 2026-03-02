import React from "react";

import Hero from "../components/Hero";
import MenuSection from "../components/MenuSection";
import MenuNavigation from "../components/MenuNavigation";
import Footer from "../components/Footer";
import EndFooter from '../components/EndFooter'
import CopyRight from "../components/CopyRight";
import MobileNavigation from "../components/MobileNavigation";

import { useState, useEffect } from "react";
import Nav from '../components/nav/Nav'
import { useNavigate } from "react-router-dom";
import loginIcon from "../components/photos/icon.png"; // adjust path if needed
import AuthModal from '../components/auth/AuthModal';
import { getAuth } from "firebase/auth";
import { User as FirebaseUser } from "firebase/auth";
import { LogOut, User as UserIcon } from 'lucide-react'; // Importing Lucide icons
import Specials from "../components/Specials";
import Recommendations from "../components/Recommendations"
import { AnimatePresence } from "framer-motion";
import Preloader from '../components/Preloader/Preloader';
// import RecommendationNavigation from "@/recommednationComponents/RecommendationNavigation";
import ImageCarousel from "@/recommednationComponents/ImageCarousel";
import Popular from "@/components/Popular";
import Feedback from "@/components/Feedback";


const Index = ({ setIsNavOpen, setItem, setIsSearchActive,setIsFiltersModalOpen, isFiltersModalOpen }) => {
  const navigate = useNavigate();
  const categories = ["veg", "non-veg", "drinks"];
  const Rcategories = ["yours", "spicy", "sweet", "popular"];
  // Define Category type explicitly as string literal union

  const [selectedType, setSelectedType] = useState("veg");
  const [RselectedType, setRSelectedType] = useState("yours");
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    (
      async () => {
        setTimeout(() => {
          setIsLoading(false);
          // window.scrollTo(0,0);
        }, 2000)
      }
    )()
  }, [])
  // Define the renderProfileButton function
  const renderProfileButton = () => (
    <button
      className="absolute top-4 right-4 flex items-center gap-2 bg-gray-800 px-4 py-2 rounded shadow"
      onClick={() => setIsAuthModalOpen(true)}
    >
      <img src={loginIcon} alt="Login" className="w-6 h-6" />
      <span>Login</span>
    </button>
  );

  return (
    <div className="relative">

      {/* <AnimatePresence mode='wait'>
        {isLoading && <Preloader />}
      </AnimatePresence> */}

      {isAuthModalOpen && (<AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />)}


      <div className="flex flex-col bg-[#0C0B09] text-white overflow-hidden">
        <main className="flex-grow bg-[#0C0B09] data-scroll-container ">
          <Hero />


          {/* <MenuNavigation categories={categories} selected={selectedType} onSelect={setSelectedType}
          /> */}

          <MenuSection type={selectedType} onMenuClick={(open) => setIsNavOpen(open)} setIsSearchActive={setIsSearchActive} selectedItem={setItem} isFiltersModalOpen={isFiltersModalOpen} setIsFiltersModalOpen={setIsFiltersModalOpen} />

          {/* <MobileNavigation /> */}
          {/* <Specials /> */}
          {/* <RecommendationNavigation categories={Rcategories} selected={RselectedType} onSelect={setRSelectedType}/> */}
          <Popular type={RselectedType} onMenuClick={(open) => setIsNavOpen(open)} selectedItem={setItem} />
          <Recommendations type={RselectedType} onMenuClick={(open) => setIsNavOpen(open)} selectedItem={setItem} />

          <Feedback />

        </main>
        {/* <Footer /> */}

        <EndFooter />

        <CopyRight />
      </div>
    </div>
  );
};

export default Index;
