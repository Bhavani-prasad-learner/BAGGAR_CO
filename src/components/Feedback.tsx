import { FaStar } from "react-icons/fa";
import { motion } from "framer-motion"
const Feedback = () => {

    return (
        <div className="flex flex-col relative h-[fit-content] w-full overflow-hidden mb-10  bg-brand-mesh ">
            <div className="ml-5 flex items-center font-medium text-restaurant-primary">
                <span
                
                className="md:text-5xl ">———</span><span
                 style={{backgroundImage:"linear-gradient(to right, #FC2E20, #FD7F20, #FDB750,#FD7F20, #FC2E20)",
                  backgroundSize: "200% auto",
                  animation: "gradientAnimation 5s linear infinite",
                  WebkitTextFillColor: "transparent", WebkitBackgroundClip: "text"
                }}
                className="text-2xl md:text-5xl font-cinzel tracking-wide lobster-regular ml-5">enjoy your food</span>
            </div>
            <motion.div
                animate={{ x: [170], y: [180], rotate: [20, 4, 20] }}
                transition={{
                    y: {
                        duration: 10,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 1,
                    },
                    rotate: {
                        duration: 10,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 3,
                    },
                }}
                className="absolute -top-16 -left-52 w-[150px] h-[150px] transform scale-10 opacity-30 rotate-180">
                <img src="./webp/bg-parsley.webp" />
            </motion.div>
            <motion.div
                animate={{ x: [170], y: [180], rotate: [-150, -134, -150] }}
                transition={{
                    y: {
                        duration: 10,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 1,
                    },
                    rotate: {
                        duration: 10,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 3,
                    },
                }}
                className="absolute -top-48 left-28 w-[100px] h-[100px] transform scale-1 opacity-35 rotate-180">
                <img src="./webp/bg-parsley.webp" />
            </motion.div>
            <div className="flex flex-col justify-center items-center gap-3 p-5 -mt-12 text-center">
                <div className="flex justify-center  w-full mt-10 scale-[0.7]">
                    <div className="flex items-center bg-white shadow-md px-4 py-5 pr-12 w-fit space-x-4">
                        {/* Rating Number */}
                        <div className="text-5xl md:text-7xl font-medium tracking-tighter text-gray-800">4.8</div>

                        {/* Vertical Divider */}
                        <div className="w-px h-10 bg-gray-200" />

                        {/* Stars and Text */}
                        <div className="flex flex-col justify-center">
                            <div className="flex text-orange-400 mb-1 md:mb-4">
                                {[...Array(5)].map((_, index) => (
                                    <FaStar key={index} size={18} className="md:w-8 md:h-8" />
                                ))}
                            </div>
                            <div className="text-sm md:text-lg text-gray-700">Review by Google</div>
                        </div>
                    </div>
                </div>
                <div className="text-lg md:text-2xl text-gray-300"> <span className="underline">20,000+ happy shawarma lovers</span>  visited our authentic restaurants</div>
                {/* <div className="-mt-3">craving satisfied?</div> */}
                <div className="-mt-3 md:mt-1 text-sm md:text-2xl font-semibold text-white tracking-wide">- RATE US -</div>

            </div>
        </div>

    );
};

export default Feedback;
