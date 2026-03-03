"use client"
import { useState, useEffect } from "react";
import ImageCarousel from "@/recommednationComponents/ImageCarousel";
import { FaStar } from "react-icons/fa6";
import { useGetFlavourProfile } from "@/hooks/useGetFlavourProfile";
import { getTopRecommendations } from "../recommednationComponents/getTopRecommendations";
import { useAuth } from "@/context/AuthContext";
import { getTopDrinkRecommendations } from "@/recommednationComponents/getTopDrinkRecommendations";
import { auth } from '../firebase/firebaseConfig'
import FoodCardSlider from "@/recommednationComponents/FoodSlider";
import ProxyFlavourForm from "@/recommednationComponents/ProxyFlavourForm";
import { MdOutlineRefresh } from "react-icons/md";
import confetti from "canvas-confetti";
// Add this to your imports at the top


// Delete the local 'interface Dish { ... }' block entirely


const Recommendations = ({ type, onMenuClick, selectedItem }) => {

  const [IsUserLoggedIn, setIsUserLoggedIn] = useState(false)
  const [userProfile, setUserProfile] = useState();

  useEffect(() => {
    const userId = auth.currentUser?.uid
    if (userId) {
      setIsUserLoggedIn(true)
    }

  }, [])

  interface FlavourProfile {
    spiciness: number;
    sourness: number;
    sweetness: number;
    creaminess: number;
    crunchiness: number;
    earthiness: number;
    umami: number;
    // Made these optional (?) and lowercase to prevent errors if they are missing
    bitterness?: number;
    calories?: number;
    freshness?: number;
    fruitiness?: number;
  }
  interface Dish {
    itemName: string;
    price: string;
    lowpicpath: string;
    picPath: string;
    itemRating:string | number; // Accept both to be safe; // <-- Changed from string to number
    flavourProfile: FlavourProfile;
    // Added these optional properties since your data is returning them
    similarity?: number;
    chefInfo?: string;
    calInfo?: string;
  }

  const fetchFlavourProfile = useGetFlavourProfile();
  const [foodmenuItems, setFoodMenuitems] = useState<Dish[]>([]);
  const [drinkenuItems, setDrinkMenuitems] = useState<Dish[]>([]);
  const { user, loading } = useAuth();
  const [foodSwitch, setFoodSwitch] = useState(true);

  const switcher = (switchState) => {
    setFoodSwitch(switchState)
  }
  // useEffect(() => {
  //  const fetchAndCompute = async () => {
  //     try {
  //       const userProfile = await fetchFlavourProfile();
  //       const topFoodItems = getTopRecommendations(userProfile);
  //       const topDrinkItems = getTopDrinkRecommendations(userProfile);

  //       setFoodMenuitems(topFoodItems);
  //       setDrinkMenuitems(topDrinkItems);
  //     } catch (err) {
  //       console.error("❌ Error fetching recommendations:", err);
  //     }
  //   };

  //   if (!loading && user) {
  //     fetchAndCompute();
  //   }
  // }, [loading, user]);

  useEffect(() => {

    if (userProfile) {
      try {
        confetti({ particleCount: 120, spread: 80 });
        const topFoodItems = getTopRecommendations(userProfile);
        const topDrinkItems = getTopDrinkRecommendations(userProfile);

        setFoodMenuitems(topFoodItems);
        setDrinkMenuitems(topDrinkItems);
      } catch (err) {
        console.error("❌ Error fetching recommendations:", err);
      }
    } else {
      setFoodMenuitems([]);
      setDrinkMenuitems([]);
    }

  }, [userProfile]);


  const handleClick = (item: string) => {
    onMenuClick(true)
    selectedItem(item)
  }


  return (<>

    {/* <section id="Recommendations" className="relative mb-10 bg-[#0C0B09] text-white"> */}
    <section id="Recommendations" className="relative mb-10 bg-brand-mesh rounded-[2rem] pt-8 pb-8 text-white ">

      <div className="flex flex-col items-center justify-center">
        <h2 className="text-[2.4rem] md:text-7xl mb-4 whitespace-nowrap lobster-regular">
          recommendations
        </h2>


        {foodmenuItems.length === 0 ?
          //       <div className="relative w-[95%] h-[75vh] mb-4 rounded overflow-hidden shadow-lg">
          //         <img
          //           src='/webp2/sugar.webp'
          //           alt="Main"
          //           className="w-full h-full object-cover"
          //         />
          //         <div className="absolute top-0 left-0 bg-black opacity-50 h-full w-full z-10" />
          //         <a href='/recommendation-form' style={{
          // pointerEvents: IsUserLoggedIn ? "auto" : "none"}}>
          //           <div className="absolute top-0  left-0 h-full w-full z-20 flex flex-col justify-center items-center gap-1 text-lg whitespace-nowrap text-white">
          //             <span className="lobster-regular  tracking-wider text-4xl font-thin">Find Out Your </span>
          //             <span className="lobster-regular  tracking-wider text-4xl font-thin">Favourite</span>

          //             {IsUserLoggedIn?
          //             <span
          //               // onClick={handlePrev}
          //               // disabled={step === 0}
          //               className="border-gray-500  rounded-2xl py-2 px-5 text-lg rounded-sm disabled:opacity-30"
          //             >
          //               - open -
          //             </span>:
          //               <span
          //               // onClick={handlePrev}
          //               // disabled={step === 0}
          //               className="border-gray-500  rounded-xl py-2 px-5 text-sm rounded-2xl disabled:opacity-30"
          //           style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
          //           >
          //               - open -
          //             </span>
          //             }

          //             {/* <div className="flex text-orange-400 mt-5 bg-transparent border-2 border-white rounded-3xl px-5 py-2 w-[fit-content] h-[fit-content]">
          //               {[...Array(5)].map((_, index) => (
          //                 <FaStar key={index} size={18} />
          //               ))}
          //             </div> */}
          //           </div>
          //         </a>
          //       </div>
          <ProxyFlavourForm setUserProfile={setUserProfile} />
          :


          (foodSwitch === true ?
            <div className="relative w-[100%] h-[max-content] mb-4 rounded overflow-hidden" style={{ touchAction: "pan-y" }} >
              {/* <ImageCarousel 
             key={foodSwitch ? 'food' : 'drink'}
            images={foodmenuItems} switcher={switcher} foodSwitch={foodSwitch} /> */}
              <FoodCardSlider images={foodmenuItems} />


            </div>



            :
            <div className="relative w-[100%] h-[79vh] mb-4 rounded overflow-hidden shadow-lg" style={{ touchAction: "pan-y" }}>
              <ImageCarousel
                key={foodSwitch ? 'food' : 'drink'}
                images={drinkenuItems} switcher={switcher} foodSwitch={foodSwitch} />
            </div>)


        }



        {foodmenuItems.length !== 0 ?
          (<div onClick={() => setUserProfile(null)}

            className="w-[fit-content] flex gap-2 items-center px-4 py-1 text-lg text-white bg-[#2E2E2E]  rounded-xl flex justify-center">
            <MdOutlineRefresh className="text-lg"/> <span>reset recommendations</span>
          </div>)
          : null}

      </div>

    </section>

  </>
  );
};

export default Recommendations;
