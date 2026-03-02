import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TbShoppingCartPlus } from "react-icons/tb";
import { GoStar } from "react-icons/go";
import { PiForkKnifeLight } from "react-icons/pi";
import { LuWine } from "react-icons/lu";


export default function ImageCarousel({ images, switcher, foodSwitch }) {
  const [[page, direction], setPage] = useState([0, 0]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [switchState, setSwitchState] = useState(true);
  const isMd = useMediaQuery("(min-width: 768px)");
const offset = window.innerWidth * 1;
const [imageStates, setImageStates] = useState(() =>
  images.map((img) => ({
    src: img.lowpicpath,
    loaded: false,
  }))
);

function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    setMatches(media.matches);
    const listener = () => setMatches(media.matches);
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, [query]);

  return matches;
}

useEffect(() => {
  images.forEach((img, index) => {
    const imageLoader = new Image();
    imageLoader.src = img.picPath;
    imageLoader.onload = () => {
      setImageStates((prev) => {
        const updated = [...prev];
        updated[index] = {
          src: img.picPath,
          loaded: true,
        };
        return updated;
      });
    };
  });
}, [images]);



  useEffect(() => {
    setPage([0, 0]); // reset on images switch
  }, [images]);



  const swipeOffsetRef = useRef(0);
  // useEffect(()=>{console.log(swipeOffsetRef.current)},[swipeOffsetRef.current])
  const paginate = (newDirection) => {
    if (isAnimating) return;  // Prevent action during animation
    setIsAnimating(true);
    setPage(([prevPage]) => [prevPage + newDirection, newDirection]);
  };

  const handleClick = () => {
    // setSwitchState(!foodSwitch);
    switcher(!foodSwitch);
  };

  if (!images || images.length === 0) return null;
  const imageIndex = ((page % images.length) + images.length) % images.length;
  return (
    <div className="relative w-[100vw] h-[86vh] overflow-hidden flex items-center justify-center transform scale-y-[0.95] scale-x-[0.95]">
      <AnimatePresence initial={false} custom={[direction, swipeOffsetRef]}>
        <motion.div
          key={page}
          custom={direction}
          drag={isAnimating ? false : "x"}
          dragElastic={0}
          dragConstraints={{ left: 0, right: 0 }}
          dragMomentum={false}
          onDragEnd={(e, info) => {
            swipeOffsetRef.current = info.offset.x;

            if (info.offset.x < -50) paginate(1);
            else if (info.offset.x > 50) paginate(-1);
          }}
          animate={{ x: 0, zIndex: 20 }}
          initial={{ x: direction > 0 ? offset : -offset, zIndex: 10 }}
          onAnimationComplete={() => setIsAnimating(false)}
          exit={
            (({ }) => ({
              x: swipeOffsetRef.current < 0 ? -100 : 100,
              zIndex: 10,
              transition: {
                duration: 0.89,
                ease: [1, 0.5, 0, 0],
              },
            })) as any
          }
          transition={{ duration: 1.2, ease: [0.65, 0.05, 0, 1] }}
          className="absolute w-full h-full flex items-center justify-center overflow-hidden"
        >
          <motion.div className="absolute w-full h-full flex items-center justify-center overflow-hidden">

          {/* Image with parallax-style animation */}
          <motion.img
            src={imageStates[imageIndex].src}
            className="w-full h-full object-cover rounded-lg"
             style={{
        filter: imageStates[imageIndex].loaded ? "blur(0)" : "blur(20px)",
        transition: "filter 0.5s ease",      
      }}
            draggable={false}
            dragElastic={0}
            initial={{ scale: 1 }}
            animate={{ scale: 1 }}
            exit={{
              scale: 1,
              transition: {

                duration: 1.5,         // 👈 Slower exit
                ease: [0.65, 0.05, 0, 1]

              }

            }}

          />
          </motion.div>

          {/* Overlay */}
          <motion.div
            className="absolute top-0 left-0 w-full h-full bg-black opacity-40 z-10 pointer-events-none"
            initial={{ opacity: 0.4 }}
            animate={{ opacity: 0.4 }}
            exit={{ opacity: 0.4 }}
            transition={{ duration: 0.8 }}
          />

          {/* Name */}
          <motion.div
            className="pointer-events-none lobster-regular z-20 absolute top-0 left-0 w-full flex text-center justify-center items-center text-3xl md:text-7xl text-white"

            animate={{ x: 0 }}
            initial={{ x: direction > 0 ? offset : -offset  }}
            exit={(() => ({
              x: swipeOffsetRef.current < 0 ? -offset : offset,


            })) as any}
            transition={{
              duration: 1.2, ease: [0.65, 0.05, 0, 1]
            }}
          >
            <span className="bg-black/70 py-1 px-4 rounded-xl whitespace-nowrap">
                          {images[imageIndex].itemName}
            </span>

          </motion.div>

          {/* switch button */}

          <motion.div
            className="z-20 text-xl md:text-5xl absolute bottom-[20%] right-[2%] text-white"
            animate={{ x: 0 }}
            initial={{ x: direction > 0 ? offset: -offset }}
            exit={(() => ({
              x: swipeOffsetRef.current < 0 ? -offset: offset,

            })) as any}
            transition={{
              duration: 1.2, ease: [0.65, 0.05, 0, 1]
            }}
            onClick={() => { handleClick() }}

          >
            {foodSwitch ? <span className="flex justify-center items-center w-8 h-8 md:w-10 md:h-10 rounded-2xl " style={{ backgroundColor: "rgba(0,0,0,0.6)" }}>  <LuWine /> </span>
              : <span className="flex justify-center items-center w-8 h-8 md:w-10 md:h-10 rounded-2xl absolute top-[22%] right-[2%]" style={{ backgroundColor: "rgba(0,0,0,0.6)" }} > <PiForkKnifeLight /></span>
            }

          </motion.div>


          {/* Price */}
          <motion.div
            className="pointer-events-none z-20 absolute bottom-[7%] left-[2%] text-xl md:text-5xl text-white"
            animate={{ x: 0 }}
            initial={{ x: direction > 0 ? offset: -offset }}
            exit={(() => ({
              x: swipeOffsetRef.current < 0 ? -offset: offset,


            })) as any}
            transition={{
              duration: 1.2, ease: [0.65, 0.05, 0, 1]
            }}

          >
            ₹{images[imageIndex].price}
          </motion.div>

          {/* Cart & Rating */}
          <motion.div
            className="pointer-events-none z-20 absolute bottom-[7%] right-[2%] flex flex-col gap-2"
            animate={{ x: 0 }}
            initial={{ x: direction > 0 ? offset: -offset }}
            exit={(() => ({
              x: swipeOffsetRef.current < 0 ? -offset: offset,


            })) as any}
            // ease: [0.65, 0.05, 0, 1]

            transition={{
              duration: 1.2, ease: [0.65, 0.05, 0, 1]
            }}
          >
            {/* <div className="flex flex-row gap-2 justify-end">
              <TbShoppingCartPlus className="scale-[0.95] opacity-30 text-2xl md:text-5xl text-white" />
            </div> */}
            <div className="text-xl flex flex-row gap-2  z-[99] text-white md:text-5xl">
              4.5
              <GoStar className="text-xl md:text-5xl text-yellow-500 mt-1" />
            </div>

          </motion.div>
          <motion.div
            animate={{ x: 0 }}
            initial={{ x: direction > 0 ? offset: -offset }}
            exit={(() => ({
              x: swipeOffsetRef.current < 0 ? -offset: offset,


            })) as any}
            // ease: [0.65, 0.05, 0, 1]

            transition={{
              duration: 1.2, ease: [0.65, 0.05, 0, 1]
            }}

            className="absolute w-full bottom-[7.5%] flex justify-center items-center gap-2 z-[98] py-4 px-2">
            {images.map((_, idx) => (
              <span
                key={idx}
                className={`w-2 h-2 rounded-full ${imageIndex === idx ? 'bg-white' : 'bg-gray-400 opacity-50'
                  }`}
              ></span>
            ))}
          </motion.div>
        </motion.div>

      </AnimatePresence>


    </div>
  );
}
