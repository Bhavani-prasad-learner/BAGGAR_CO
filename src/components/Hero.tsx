import React, { useEffect, useLayoutEffect } from "react";
import { motion } from "framer-motion";
import shawarmaVideo from "./videos/sha.mp4";
import LQIPImage from "./LQIPImage";
import { ArrowDown, CaretDown, FadersHorizontal } from "phosphor-react";
import { ArrowBigDown, ArrowDown01, ArrowDownCircle, ArrowDownNarrowWideIcon } from "lucide-react";

const Hero: React.FC = () => {

  useLayoutEffect(() => {
    if (window.location.hash) {
      window.history.replaceState(null, '', window.location.pathname);
    }
    window.scrollTo(0, 0);
  }, []);

  return (
    /* The main container uses the new premium mesh background */
    <div className="relative flex items-center justify-center overflow-hidden min-h-[70vh] bg-brand-mesh-premium">
      
      {/* The SVG Noise Texture layered directly in the component.
         We use inline styles here because long SVG strings can break Tailwind's compiler. 
      */}
      <div 
        className="absolute inset-0 opacity-[0.12] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.50' numOctaves='5' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
        }}
      ></div>

      <div className="mt-70 md:-mt-28 mb-28 text-center relative z-20">
        <div className="max-w-4xl">
          <div className="flex flex-col justify-center items-center md:scale-[135%] md:mb-1">
            
            <motion.a
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
              href="#menu"
              className="z-30 w-max py-3 px-10 tracking-wide font-semibold text-3xl text-center"
            >
              <span 
                className="font-cinzel "
                style={{
                  backgroundImage: "linear-gradient(to right, #FC2E20, #FD7F20, #FDB750, #FD7F20, #FC2E20)",
                  backgroundSize: "200% auto",
                  animation: "gradientAnimation 5s linear infinite",
                  WebkitTextFillColor: "transparent", 
                  WebkitBackgroundClip: "text"
                }}
              >
                Taste is our identity
              </span>
            </motion.a>

            <motion.a
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
              href="#menu"
              className="z-30 w-max px-10 tracking-wide font-thin text-white hover:text-[#DFBA6B] transition-colors text-sm text-center font-lora"
            >
              Authentic taste, every bite.
            </motion.a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;