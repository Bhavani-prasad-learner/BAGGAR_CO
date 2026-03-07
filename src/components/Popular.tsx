import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion"
import Nav from './nav/Nav'
import Navbar from "./Navbar";
import { Item } from "@radix-ui/react-navigation-menu";
import ImageCarousel from "@/recommednationComponents/ImageCarousel";
import { GoStar } from "react-icons/go";
import { TbShoppingCart } from "react-icons/tb";
import { FaPlus } from "react-icons/fa6";
import { TbShoppingCartPlus } from "react-icons/tb";
import FoodCardSlider from "@/recommednationComponents/FoodSlider";



// interface MenuSectionProps {
//   type: MenuType;
//   onMenuClick: (open: boolean) => void;
//   selectedItem: (item: string) => void;
// }

const Popular = ({ type, onMenuClick, selectedItem }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [foodSwitch, setFoodSwitch] = useState(true);
  const switcher = (switchState) =>{
    setFoodSwitch(switchState)
  }
const foodmenuItems = [

  {
    id: 11,
    itemName: "Chicken Curry",
    price: "229",
    picPath: "/webp3/chicken_curry.webp",
    calInfo: "420-520 kcal",
    chefInfo:
      "Traditional Andhra-style chicken curry slow-cooked with onions, tomatoes, and aromatic spices, creating a rich and flavorful gravy."
  },

  {
    id: 12,
    itemName: "Mutton Biryani",
    price: "299",
    picPath: "/webp3/mutton_biryani.webp",
    calInfo: "600-750 kcal",
    chefInfo:
      "Authentic dum-cooked mutton biryani made with fragrant basmati rice, tender mutton pieces, and a blend of traditional spices."
  },

  {
    id: 13,
    itemName: "Mushroom Curry",
    price: "199",
    picPath: "/webp3/mushroom_curry.webp",
    calInfo: "300-380 kcal",
    chefInfo:
      "Fresh mushrooms simmered in a rich onion-tomato masala gravy with mild spices, delivering a hearty and earthy flavor."
  }

];

  const drinkenuItems = [
     { id: 9, itemName: "Samosa with Chai", price: 79, type: "yours", picPath: "/webp2/SamosaWithChai.webp" },
  ]


  // const filteredItems = menuItems.filter((item, index) => item.type === type);
  // console.log(filteredItems, type)
  const handleClick = (item: string) => {
    onMenuClick(true)
    selectedItem(item)
  }


  return (<>
    {/* <section className="relative pb-10 bg-[#FFFFF] text-white"> */}

          <section id="Recommendations" className="relative mb-2 bg-sub-brand rounded-[2rem] pt-8 pb-8 ">
      <div className="flex flex-col items-center justify-center">
         
        <div className="flex flex-col items-center justify-center text-center mb-4">
  
  <h2 className="text-[2rem] md:text-7xl lobster-regular whitespace-nowrap">
    <span className="font-cinzel text-yellow-300">
      Popular Dishes
    </span>
  </h2>

  <img
    src="./border_p.png"
    alt="bottom border line"
    className="w-[16rem] md:w-[34rem] object-contain m"
  />

</div>
        
        {/* <div className="relative w-[92%] h-[79vh] mb-4 rounded overflow-hidden shadow-lg">

          <ImageCarousel images={foodmenuItems} switcher={switcher}/>

        </div> */}
         {foodSwitch===true?      
                    <div className="relative w-[100%] h-[max-content]  rounded flex justify-center" style={{ touchAction: "pan-y" }}>
                    {/* <ImageCarousel
                                 key={foodSwitch ? 'food' : 'drink'}

                    images={foodmenuItems} switcher={switcher} foodSwitch={foodSwitch}/> */}

                     <FoodCardSlider images={foodmenuItems} />
                  </div>
                  : 
                  <div className="relative w-[100%] h-[79vh]  rounded overflow-hidden shadow-lg" style={{ touchAction: "pan-y" }}>
                    <ImageCarousel 
                                 key={foodSwitch ? 'food' : 'drink'}

                    images={drinkenuItems} switcher={switcher} foodSwitch={foodSwitch}/>
                  </div>}
                


      </div>

    </section>

  </>
  );
};

export default Popular;
