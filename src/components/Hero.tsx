import React, { useLayoutEffect } from "react";
import { motion } from "framer-motion";

const Hero: React.FC = () => {

  useLayoutEffect(() => {
    if (window.location.hash) {
      window.history.replaceState(null, '', window.location.pathname);
    }
    window.scrollTo(0, 0);
  }, []);

  return (
    /* ✅ CHANGED: hero takes half screen height and centers content */
    <div className="relative flex items-center justify-center overflow-hidden h-[50vh] bg-brand-mesh-premium">

      {/* noise texture */}
      <div 
        className="absolute inset-0 opacity-[0.12] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.50' numOctaves='5' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
        }}
      ></div>

      {/* ✅ CHANGED: removed mt-80 and margin hacks */}
      <div className="text-center relative z-20 px-6">

        {/* ✅ CHANGED: responsive width */}
        <div className="max-w-3xl mx-auto">

          <div className="flex flex-col justify-center items-center">

            <motion.a
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
              href="#menu"

              /* ✅ CHANGED: responsive font sizes */
              className="z-30 py-3 px-6 md:px-10 tracking-wide font-semibold text-center
              text-lg sm:text-xl md:text-2xl lg:text-3xl"
            >
              <span 
                className="font-cinzel"
                style={{
                  backgroundImage: "linear-gradient(to right, #FC2E20, #FD7F20, #FDB750, #FD7F20, #FC2E20)",
                  backgroundSize: "200% auto",
                  animation: "gradientAnimation 5s linear infinite",
                  WebkitTextFillColor: "transparent", 
                  WebkitBackgroundClip: "text"
                }}
              >
                Timeless taste, <br />crafted with pride.
              </span>
            </motion.a>

          </div>
        </div>
      </div>

    </div>
  );
};

export default Hero;