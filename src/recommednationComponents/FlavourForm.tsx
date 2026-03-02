import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Slider } from '@mui/material';
import { CaretDown, CaretUp, House, Info } from 'phosphor-react';
const formParts = ["general", "food", "drink"];
import { PiQuestionMarkLight } from "react-icons/pi";
import { AiOutlineInfo } from "react-icons/ai";
import confetti from 'canvas-confetti';
import { useFlavour } from '@/context/FlavourContext';
import { useSetFlavourProfile } from "@/hooks/useSetFlavourProfile";
import { Check } from 'lucide-react';
// import { useNavigate } from "react-router-dom";

// const navigate = useNavigate();

// const handleClick = () => {
//     navigate("/"); // go to home
//     setTimeout(() => {
//     const el = document.getElementById("Recommendations");
//     if (el) el.scrollIntoView({ behavior: "smooth" });
//   }, 100);// wait a tick for DOM to render
// };

const formFields = {
    general: ["Sweetness", "Spiciness", "Sourness", "Creaminess"],
    food: ["Crunchiness", "Umami"],
    drink: ["Freshness", "Fruitiness", "Bitterness"],
    // calorie: ["Calories"]
};

const bgImg = {
    general: "/webp/bg-lemon-2.webp",
    food: "/webp/bg-pizza-1.webp",
    drink: "/webp/bg-wine-1.webp",
    // calorie: "/webp/bg-fire.webp",
}

export default function FlavourForm() {
    //  useEffect(() => {
    //     const setVh = () => {
    //       const vh = window.innerHeight * 0.01;
    //       document.documentElement.style.setProperty('--vh', `${vh}px`);
    //     };

    //     window.addEventListener('resize', setVh);
    //     setVh();

    //     return () => window.removeEventListener('resize', setVh);
    //   }, []);


    const [step, setStep] = useState(0);
    const [formData, setFormData] = useState({});
    const [formCompleted, setFormCompleted] = useState(false);
    const [activeSlider, setActiveSlider] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    // const { setUserFlavourProfile,userFlavourProfile } = useFlavour()

    const labels = {
        Sweetness: [
            "not sweet",
            "least sweet",
            "little less sweet",
            "normally sweet",
            "little more sweet",
            "sweetest"
        ],
        Spiciness: [
            "not spicy",
            "less spicy",
            "slightly spicy",
            "normal spicy",
            "very spicy",
            "extremely spicy"
        ],
        Sourness: [
            "not sour",
            "less sour",
            "slightly sour",
            "normal sour",
            "more sour",
            "very sour"
        ],
        Creaminess: [
            "not creamy",
            "less creamy",
            "slightly creamy",
            "normal creamy",
            "most creamy",
            "very creamy"
        ],
        Crunchiness: [
            "not crunchy",
            "least crunchy",
            "slightly crunchy",
            "normal crunchy",
            "more crunchy",
            "super crunchy"
        ],
        Umami: [
            "not umami",
            "least umami",
            "light umami",
            "normal umami",
            "richer umami",
            "strong umami"
        ],
        Freshness: [
            "not fresh",
            "least fresh",
            "somewhat fresh",
            "just fresh",
            "more fresh",
            "very fresh"
        ],
        Fruitiness: [
            "not fruity",
            "least fruity",
            "slightly fruity",
            "moderate fruity",
            "more fruity",
            "very fruity"
        ],
        Bitterness: [
            "not bitter",
            "least bitter",
            "mildly bitter",
            "normal bitter",
            "more bitter",
            "very bitter"
        ],
        Calories: [
            "zero cal",
            "low cal",
            "below average cal",
            "moderate cal",
            "high cal",
            "very high cal"
        ]
    };




    const setFlavourProfile = useSetFlavourProfile();
    const handleSliderChange = (field) => (e, value) => {
        setFormData({ ...formData, [field]: value });
    };

    const handleSliderStart = (field) => () => {
        setActiveSlider(field);
    };

    const handleSliderEnd = () => {
        setActiveSlider(null);
    };

    const handleNext = () => {
        if (step < formParts.length - 1) setStep(step + 1);
    };

    const handlePrev = () => {
        if (step == formParts.length - 1) setFormCompleted(false)
        if (step > 0) setStep(step - 1);
    };

    const currentPart = formParts[step];

    const variants = {
        initial: { y: 100, opacity: 0 },
        animate: { y: 0, opacity: 1 },
        exit: { y: -100, opacity: 0 },
    };

    const handleCelebrate = () => {
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
        });
    };



    const handleFinal = async () => {
        try {
            await setFlavourProfile(formData);
            // success toast or redirect
        } catch (error) {
            console.log(error)
        }
        handleCelebrate()
        setFormCompleted(true)
        console.log('user data submitted:', formData)

    }

    return (
        <div className="h-[100svh] bg-[#FFFFFF] text-black flex flex-col items-center justify-center  relative overflow-hidden">

            {formCompleted ? (
                <div className="text-center space-y-6">

                    <h2 className="text-3xl font-bold">   🎉</h2>
                    <h2 className="text-3xl font-bold"> Thank You!</h2>
                    <p className="text-lg">You've successfully submitted </p>
                    <span className="text-sm text-gray-500">Recommendations will be below Menu.</span>
                    <div className='flex flex-col gap-2 justify-center items-center'>
                        <button
                            onClick={handlePrev}
                            disabled={step === 0}
                            className="border-2 w-[100%] bg-restaurant-primary rounded-lg py-2 px-4 uppercase tracking-wide font-semibold text-black py-2 px-4 rounded disabled:opacity-30"
                        >
                            edit preferences
                        </button>
                        <a
                            href="/"
                            className="mt-2 w-[80%] inline-block px-6 border border-gray-500 py-2  rounded-lg font-semibold uppercase"
                        >
                            Go Home
                        </a>

                        {/* <button
                            onClick={()=>navigate("/")}
                            className="mt-4 w-[80%] inline-block px-6 py-2 bg-restaurant-primary rounded-lg font-semibold uppercase"
                        >
                            CHECK RECOMMENDATIONS
                        </button> */}


                    </div>
                </div>
            ) : (
                <>
                    <div className='fixed  left-4 top-6'>
                        {/* <a href='/' className='mt-2 py-1 flex items-center justify-center rounded-lg bg-[#1C1D20] w-20'> */}
                        <a href="/" className='w-30 h-30 md:right-12 z-40 flex items-center justify-center p-2 px-5 rounded-xl bg-black/70 text-white transition-colors hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/30'>
                            <House  className='w-6 h-6 md:w-10 md:h-10 text-white' />
                        </a>

                    </div>
                    <div className="absolute top-0 left-0 w-full h-2 bg-gray-800">

                        <div
                            className="h-full bg-restaurant-primary transition-all duration-500"
                            style={{ width: `${((step + 1) / formParts.length) * 100}%` }}
                        ></div>
                    </div>

                    <AnimatePresence mode="wait">
                        {/* <motion.div
                            exit="exit"
                            animate={{ rotate: [-15], y: [40, 20, 40, 20, 40] }}
                            transition={{
                                y: {
                                    duration: 10,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                    delay: 1,
                                }
                            }}
                            className="absolute opacity-30 pointer-events-none top-[20%] left-[10%] w-full h-full scale-[0.9] z-10 rotate-[-15deg]">
                            <img src={bgImg[currentPart]} />

                        </motion.div> */}
                        <motion.div
                            key={step}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            variants={variants}
                            transition={{ duration: 0.5 }}
                            className="w-full h-100vh flex flex-col md:items-center"
                        >
                            <h2 className="text-4xl md:text-5xl capitalize
 lobster-regular text-center tracking-wide font-semibold text-black  mt-4 mb-0 md:mb-8 transform scale-[0.8] p-0">{currentPart} Preferences</h2>


                            <div className={`p-2 rounded-3xl `}>
                                {formFields[currentPart].map((field) => (
                                    <div
                                        key={field}
                                        className={`px-3 py-3 w-full md:w-[70vw] transition-all ease-in-out duration-1000 ${field === isOpen ? "bg-[#EAEFF2] rounded-2xl" : ""}`}
                                    >
                                        <div className="flex justify-between">
                                            <label className="block mb-2 md:mb-4">{field}</label>
                                            {isOpen !== field ? (
                                                <button onClick={() => setIsOpen(field)} className='flex flex-row gap-2'>
                                                    {formData[field] != null && (<>

                                                        <span className='px-4 py-2 rounded-lg bg-[#d5dfe6]'>{labels[field][formData[field]]}</span>

                                                    </>
                                                    )
                                                    }
                                                    <CaretDown size={32} />
                                                </button>
                                            ) : (
                                                <button onClick={() => setIsOpen(false)} className='flex flex-row gap-2'>
                                                    {formData[field] != null && (<>

                                                        <span className='px-4 py-2 -mt-1 mb-2 rounded-lg bg-[#d5dfe6]'>{labels[field][formData[field]]}</span>

                                                    </>
                                                    )
                                                    }
                                                    <CaretUp size={32} />
                                                </button>
                                            )}
                                        </div>

                                        <AnimatePresence mode="wait">
                                            {isOpen === field && (
                                                <motion.div
                                                    key="lol"
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: "auto", opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    transition={{ duration: 0.4, ease: "easeInOut" }}
                                                    className="flex flex-row gap-2 w-full flex-wrap overflow-hidden flex-1"
                                                // ✅ added height animation and overflow-hidden
                                                >
                                                    {labels[field].map((label, index) => (
                                                        <button
                                                            key={index}
                                                            onClick={() => {
                                                                setFormData({ ...formData, [field]: index });
                                                                setIsOpen(false);
                                                            }}
                                                            className="px-4 py-2 rounded-lg bg-[#d5dfe6] hover:bg-gray-300"
                                                        >
                                                            {label}
                                                        </button>
                                                    ))}
                                                </motion.div>
                                            )}
                                            {isOpen !== field && (
                                             <div className="relative pb-4 ">
                                                        <motion.div
                                                          className="absolute left-0 bottom-0 h-[1px] bg-[rgba(25,25,25,0.3)] origin-center"
                                                          initial={{ scaleX: 0 }}
                                                          whileInView={{ scaleX: 1 }}
                                                          exit={{ scaleX: 0 }}
                                                          transition={{ duration: 0.2, ease: "easeOut" }}
                                                          viewport={{ once: true, amount: 0.7 }}
                                                          key={field}
                                                          style={{ width: "100%" }}
                                                        />
                                                      </div>)}
                                        </AnimatePresence>
                                       
                                    </div>
                                    
                                ))}
                            </div>

                        </motion.div>
                    </AnimatePresence>

                    <div className="absolute bottom-8 px-8 flex justify-between mt-6 w-full max-w-md">
                        <div>

                        </div>
                        <div className="flex gap-3">
                            <button
                                onClick={handlePrev}
                                disabled={step === 0}
                                className="border-2 border-gray-500 rounded-lg py-2 px-6 uppercase tracking-wide font-semibold text-black py-2 px-4 rounded disabled:opacity-30"
                            >
                                Back
                            </button>
                            {step === formParts.length - 1 ? <button
                                onClick={handleFinal}
                                className="bg-restaurant-primary rounded-lg py-2 px-6 uppercase tracking-wide font-semibold text-black py-2 px-4 rounded"
                            >
                                <span>Finish</span>


                            </button> : <button
                                onClick={handleNext}
                                disabled={step === formParts.length - 1}
                                className="bg-restaurant-primary rounded-lg py-2 px-6 uppercase tracking-wide font-semibold text-black py-2 px-4 rounded"
                            >
                                <span>Next</span>


                            </button>}

                            {/* <button
                        onClick={handleNext}
                        disabled={step === formParts.length - 1}
                        className="bg-restaurant-primary rounded-2xl py-2 px-4 uppercase tracking-wide font-semibold text-white py-2 px-4 rounded"
                    >
                        {step === formParts.length - 1 ? <span>Finish</span> : <span>Next</span>}


                    </button> */}
                        </div>

                    </div>
                </>
            )}
        </div>
    );
}
