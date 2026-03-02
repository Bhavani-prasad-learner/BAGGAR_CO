import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { AnimatePresence, motion } from 'framer-motion'
import { PiPlant } from "react-icons/pi";
import { TbMeat } from "react-icons/tb";
import { LuWine } from "react-icons/lu";

// Define Category type explicitly as string literal union
type Category = "veg" | "non-veg" | "drinks";

interface MenuNavigationProps {
  categories: string[];
  selected: Category;
  onSelect: (type: Category) => void;
}

const MenuNavigation: React.FC<MenuNavigationProps> = ({ categories, selected, onSelect }) => {

  const menuRef = useRef<HTMLDivElement>(null);

  return (
    <div id="menu" ref={menuRef} className="max-w-screen bg-[#FFFFFF] sticky z-30 py-4 border-t border-black">
      <div className="container mx-auto -mb-14 px-4">
        <div className="flex gap-5 justify-center">
           {categories.map((category) => (
  <div key={category} className="">
    {selected === category && (
      <motion.div
        layoutId="underline"
        className="h-[3px] bg-gray-400"
        style={{ width: "100%" }}
        transition={{ type: "spring", stiffness: 500, damping: 20 }}

      />
    )}
    <div
      className={`flex flex-col gap-0 send_flowers-regular justify-center items-center px-5 py-6 text-3xl bg-[#FFFFFF] cursor-pointer
      ${selected === category ? 'text-[#FDFD96]' : 'text-black'}`}
      // onClick={() => scrollToSection(category)}
      onClick={()=>onSelect(category as Category)}
    >
      {category === 'veg' && <PiPlant className={`text-4xl ${selected === category ? 'text-[#FDFD96]' : ''}`} />}
      {category === 'non-veg' && <TbMeat className={`text-4xl ${selected === category ? 'text-[#FDFD96]' : ''}`} />}
      {category === 'drinks' && <LuWine className={`text-4xl ${selected === category ? 'text-[#FDFD96]' : ''}`} />}
      <span className="whitespace-nowrap">{category}</span>
    </div>
  </div>
))}
      
        </div>
      </div>
    </div>
  );
};

export default MenuNavigation;
