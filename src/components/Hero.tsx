import React, { useEffect, useLayoutEffect } from "react";
import { motion } from "framer-motion";
import shawarmaVideo from "./videos/sha.mp4";
import LQIPImage from "./LQIPImage";
import { ArrowDown, CaretDown, FadersHorizontal } from "phosphor-react";
import { ArrowBigDown, ArrowDown01, ArrowDownCircle, ArrowDownNarrowWideIcon } from "lucide-react";
// import { useLocomotiveScroll } from "@/hooks/useLocomotiveScroll";


const Hero: React.FC = () => {

  useLayoutEffect(() => {
    // Remove any hash from URL without triggering scroll
    if (window.location.hash) {
      window.history.replaceState(null, '', window.location.pathname);
    }
    // Scroll to top
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="relative flex items-center justify-center overflow-hidden min-h-[100vsh] h-[100vsh] bg-black">
      <div className="absolute opacity-30 scale-[0.5] h-[200vh] w-[200vw] bg-repeat bg-auto bg-black md:w-[108vw] bg-[url('/webp/black-pattern.webp')] bg-auto"></div>
      {/* <img
        src="/webp2/bg-pattern-1.webp"
        alt=""
        aria-hidden
        className="absolute inset-0 w-full h-full object-cover"
        fetchPriority="high"
      /> */}

      {/* <div className="absolute inset-0 bg-black opacity-30 z-10"></div> */}
      <div className="mt-28 md:-mt-28 mb-28 text-center relative z-20">
        <div className="max-w-4xl">


          {/* <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5, delay: 0.3, type: 'spring', stiffness: 80,
              damping: 30,
              bounce: 0.6, ease: 'easeOut',
            }}
            viewport={{ once: true, amount: 0.7 }}
            className="z-20 text-white -mt-18 md:-mt-40 md:h-[90vh]"
          >
            <img width={400}
              height={600} className="md:scale-[55%] scale-[120%] " src="./webp2/logo.webp" />
          </motion.div> */}




          <div className="flex flex-col justify-center items-center md:scale-[135%] md:mb-10">
            <motion.a
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.4,
                type: "tween",
                ease: "easeOut"
              }}
              viewport={{ once: true, amount: 0.7 }}
              data-scroll-to
              href="#menu"
              // onClick={scrollToMenu}
              className="z-30 w-[max-content] py-3 px-10 tracking-wide font-semibold text-[#c25c61] text-2xl text-center"
            //  className="z-30 w-64 py-4 px-4 uppercase tracking-wide font-semibold bg-[#A47551] text-white font-medium rounded-2xl hover:bg-[#3d251e] transition-colors text-lg text-center border-2 border-white"

            >
              <span className="lobster-regular"
               style={{backgroundImage:"linear-gradient(to right, #FC2E20, #FD7F20, #FDB750,#FD7F20, #FC2E20)",
                  backgroundSize: "200% auto",
                  animation: "gradientAnimation 5s linear infinite",
                  WebkitTextFillColor: "transparent", WebkitBackgroundClip: "text"
                }}> Taste is our identity</span>
            </motion.a>
            <motion.a
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.4,
                type: "tween",
                ease: "easeOut"
              }}
              viewport={{ once: true, amount: 0.7 }}
              data-scroll-to
              href="#menu"
              // onClick={scrollToMenu}
              className="z-30 w-[max-content] px-10 tracking-wide font-thin text-white rounded-2xl hover:bg-[#3d251e] transition-colors text-sm text-center"
            //  className="z-30 w-64 py-4 px-4 uppercase tracking-wide font-semibold bg-[#A47551] text-white font-medium rounded-2xl hover:bg-[#3d251e] transition-colors text-lg text-center border-2 border-white"

            >
              Authentic taste, every bite.
            </motion.a>
            {/* <motion.a
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.2,
                type: "tween",
                ease: "easeOut"
              }}
              viewport={{ once: true, amount: 0.7 }}
              data-scroll-to
              href="#menu"
              // onClick={scrollToMenu}
              className="z-30 mt-2 w-[max-content] py-1 px-10 tracking-wide font-thin text-white rounded-2xl hover:bg-[#3d251e] transition-colors text-md text-center"
            //  className="z-30 w-64 py-4 px-4 uppercase tracking-wide font-semibold bg-[#A47551] text-white font-medium rounded-2xl hover:bg-[#3d251e] transition-colors text-lg text-center border-2 border-white"

            >
         <CaretDown/>
        
            </motion.a> */}
            {/* <motion.a
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.2,
                type: "tween",
                ease: "easeOut"

              }}
              viewport={{ once: true, amount: 0.1 }}
              href="https://thewritersroom.co.in/about/"
              className="z-30 w-48 py-4 px-4 uppercase tracking-wide font-semibold bg-transparent border-2 border-white text-white font-medium rounded-2xl hover:bg-white/10 transition-colors text-lg text-center"
            >
              About Us
            </motion.a> */}
          </div>
         
        </div>

      </div>
      {/* </motion.div>
      </motion.div> */}

      {/* <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#0C0B09] to-transparent z-10"></div> */}
    </div>
  );
};

export default Hero;
