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
    { id: 1, itemName: "Regular Rumali Chicken Shawarma",price: "119",
    picPath: "/webp/regular-rumali-chicken-shawarma.webp",
    calInfo: "350-450 kcal",
    chefInfo: "Tender grilled chicken wrapped in soft rumali roti with a balanced mix of veggies and creamy garlic mayo."
   },
//     { id: 2, itemName: "BLACK BERRY NOIRE", price: 250, type: "yours",      chefInfo: "Chocolate crepe with warm velvety nutella fresh blackberries and vanilla bean ice cream.",
//   picPath: "/webp2/black-noire.webp", lowpicPath:"/webp2/black-noire (1).webp" },
//         { id: 3, itemName: "BERRY KISSED VELVET", price: 295, type: "yours",      
//           chefInfo: "red velvet crepe embraced with layers of vanilla spone and delight cream crowned with freshly seasoned berries.",
//  picPath: "/webp2/red-velvet.webp", lowpicPath:"/webp2/red-velvet (1).webp" },
//     { id: 3, itemName: "Strawberry Matcha",     chefInfo: "This homemade tomato basil soup Made with fresh basil and roasted tomatoes, it's lightly creamy and delicious",
// price: 250, type: "yours", picPath: "/webp2/strawberry-matcha.webp", lowpicPath:"/webp2/strawberry-matcha (1).webp"},


    { id: 4, itemName: "Kababs Shawarma", price: 149, type: "spicy", picPath: "/webp/resmi-kabab-shawarma.webp",  chefInfo: "Juicy and soft reshmi kabab pieces blended with cream-based marinade, wrapped in rumali roti with veggies and mild sauces."
 },
     { id:10,
      itemName: "Falafel Salad", price: "129", picPath: "/webp/salad-2.webp",
      calInfo: "300-420 kcal",
      chefInfo: "2 Pcs Falafel + Lettuce, capsicum, onion, cucumber, tomatoes and shredded carrots and beetroot mixed with our flavourful seasoning sauce, special in-house garlic mayonnaise."
    },
    { id:5,
    itemName: "Classic Paneer Sandwich",
    price: "129",
    picPath: "/webp/classic-paneer-sandwich.webp",
    chefInfo: "Our classic paneer sandwich is made with freshly marinated paneer, layered with crisp veggies and house-made chutney, then toasted between buttery golden bread.",
    calInfo: "280–370 kcal"
  },
  ];

  const drinkenuItems = [
     { id: 9, itemName: "Samosa with Chai", price: 79, type: "yours", picPath: "/webp2/SamosaWithChai.webp" },
        { id: 9, itemName: "Straw Berry Mojito", price: 79, type: "yours", picPath: "/webp/straw-berry-mojito.webp" }
  ]


  // const filteredItems = menuItems.filter((item, index) => item.type === type);
  // console.log(filteredItems, type)
  const handleClick = (item: string) => {
    onMenuClick(true)
    selectedItem(item)
  }


  return (<>
    {/* <section className="relative pb-10 bg-[#FFFFF] text-white"> */}

          <section id="Recommendations" className="relative mb-2 bg-brand-mesh rounded-[2rem] pt-8 pb-8 ">
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
