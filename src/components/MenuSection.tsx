import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Nav from './nav/Nav';
import Navbar from "./Navbar";
import { Item } from "@radix-ui/react-navigation-menu";
import { BsSliders2 } from "react-icons/bs";
import { GoSearch } from "react-icons/go";
import FiltersModal from "./FiltersModal";

type MenuType = "veg" | "non-veg" | "beverages" | "deserts" | "trending" | "vegan";

interface MenuItem {
  id: number;
  name: string;
  price: number;
  diet: string[];       // e.g., ["veg", "non-veg"]
  category: string[];   // e.g., ["starters", "mains", "beverages"]
  allergens?: string[]; // e.g., ["gluten-free", "nut-free"]
  special?: string[];   // e.g., ["best sellers", "chef's specials"]
}

interface MenuSectionProps {
  type: string;
  onMenuClick: (open: boolean) => void;
  selectedItem: (item: string) => void;
  setIsSearchActive: (item: boolean) => void;
}

const MenuSection = ({ type, onMenuClick, selectedItem, setIsSearchActive }: MenuSectionProps) => {
  const menuItems: MenuItem[] = [
    { id: 1, name: "Salads", price: 129, diet: ["veg", "vegan"], category: ["starters"], allergens: ["gluten-free", "dairy-free"] },
    { id: 2, name: "Classic Shawarma", price: 200, diet: ["non-veg"], category: ["mains"], allergens: ["nut-free"] },
    { id: 3, name: "Signature Shawarma", price: 150, diet: ["non-veg"], category: ["mains"], special: ["chef's specials"] },
    { id: 4, name: "Kababs Shawarma", price: 120, diet: ["non-veg"], category: ["mains"] },
    { id: 5, name: "Veg Shawarma", price: 119, diet: ["veg"], category: ["mains"], special: ["best sellers"] },
    { id: 6, name: "Sandwich", price: 99, diet: ["veg"], category: ["starters"], allergens: ["nut-free"] },
    { id: 7, name: "Quick Bites", price: 99, diet: ["veg"], category: ["starters"] },
    { id: 9, name: "Mojitos", price: 79, diet: ["veg", "vegan"], category: ["beverages"], allergens: ["gluten-free", "dairy-free"] }
  ];

 
  // --- STATE ---
  const [isFirstClicked, setIsFirstClicked] = useState(false);
  
  // Quick Filters (Pills)
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const filters = ["beverages", "deserts", "trending", "veg", "vegan", "non-veg"];

  // Modal Filters
  const [isFiltersModalOpen, setIsFiltersModalOpen] = useState(false);
  const [appliedFilters, setAppliedFilters] = useState<Record<string, string[]>>({});

  // --- CALCULATIONS ---
  const totalAppliedCount = Object.values(appliedFilters).reduce(
    (total, currentArray) => total + currentArray.length,
    0
  );

  // // --- ADVANCED ITEM-LEVEL FILTERING ---
  // const filteredItems = menuItems.filter(item => {
    
  //   // 1. Quick Pill Filters Check
  //   if (activeFilters.length > 0) {
  //     const passesPills = activeFilters.some(filter => 
  //       item.diet.includes(filter) || item.category.includes(filter) || item.special?.includes(filter)
  //     );
  //     if (!passesPills) return false;
  //   }

  //   // 2. Modal Diet Check
  //   const selectedDiets = appliedFilters["Diet"] || [];
  //   if (selectedDiets.length > 0) {
  //     const hasDiet = selectedDiets.some(diet => item.diet.includes(diet));
  //     if (!hasDiet) return false; 
  //   }

  //   // 3. Modal Category Check
  //   const selectedCategories = appliedFilters["Category"] || [];
  //   if (selectedCategories.length > 0) {
  //     const hasCategory = selectedCategories.some(cat => item.category.includes(cat));
  //     if (!hasCategory) return false;
  //   }

  //   // 4. Modal Price Check
  //   const selectedPrices = appliedFilters["Price"] || [];
  //   if (selectedPrices.length > 0) {
  //     const matchesPrice = selectedPrices.some(range => {
  //       if (range === "0-100") return item.price >= 0 && item.price <= 100;
  //       if (range === "100-500") return item.price >= 101 && item.price <= 500;
  //       if (range === "500-5000") return item.price >= 501 && item.price <= 5000;
  //       return false;
  //     });
  //     if (!matchesPrice) return false; 
  //   }

  //   // 5. Modal Allergens Check
  //   const selectedAllergens = appliedFilters["Allergens"] || [];
  //   if (selectedAllergens.length > 0) {
  //     const hasAllergen = selectedAllergens.some(allergen => item.allergens?.includes(allergen));
  //     if (!hasAllergen) return false; 
  //   }

  //   // 6. Modal Special Check
  //   const selectedSpecials = appliedFilters["Special"] || [];
  //   if (selectedSpecials.length > 0) {
  //     const hasSpecial = selectedSpecials.some(special => item.special?.includes(special));
  //     if (!hasSpecial) return false;
  //   }

  //   return true; 
  // });
  // --- ADVANCED ITEM-LEVEL FILTERING (OR logic for tags, AND logic for price) ---
  const filteredItems = menuItems.filter(item => {
    
    // --- 1. STRICT PRICE CHECK (AND Logic) ---
    // If prices are selected, the item MUST fit the price. If it fails, we drop it immediately.
    const selectedPrices = appliedFilters["Price"] || [];
    if (selectedPrices.length > 0) {
      const matchesPrice = selectedPrices.some(range => {
        if (range === "0-100") return item.price >= 0 && item.price <= 100;
        if (range === "100-500") return item.price > 100 && item.price <= 500;
        if (range === "500-5000") return item.price > 500 && item.price <= 5000;
        return false;
      });
      if (!matchesPrice) return false; 
    }

    // --- 2. TAG CHECKS (OR Logic) ---
    // Gather all selected tags from pills and modal
    const selectedDiets = appliedFilters["Diet"] || [];
    const selectedCategories = appliedFilters["Category"] || [];
    const selectedAllergens = appliedFilters["Allergens"] || [];
    const selectedSpecials = appliedFilters["Special"] || [];
    
    // Check if ANY tags are selected at all (excluding price)
    const hasAnyTagSelected = 
      activeFilters.length > 0 || 
      selectedDiets.length > 0 || 
      selectedCategories.length > 0 || 
      selectedAllergens.length > 0 || 
      selectedSpecials.length > 0;

    // If no tags are selected (only price was selected, or nothing), keep the item
    if (!hasAnyTagSelected) return true;

    // If tags ARE selected, the item only needs to match AT LEAST ONE of them
    const matchesQuickPill = activeFilters.some(pill => 
      item.diet.includes(pill) || item.category.includes(pill) || item.special?.includes(pill)
    );
    
    const matchesDiet = selectedDiets.some(diet => item.diet.includes(diet));
    const matchesCategory = selectedCategories.some(cat => item.category.includes(cat));
    const matchesAllergen = selectedAllergens.some(allergen => item.allergens?.includes(allergen));
    const matchesSpecial = selectedSpecials.some(special => item.special?.includes(special));

    // If it matches ANY of the selected tag categories, keep it!
    if (matchesQuickPill || matchesDiet || matchesCategory || matchesAllergen || matchesSpecial) {
      return true;
    }

    // If it didn't match any selected tag, drop it
    return false;
  });

  // --- HANDLERS ---
  const handleFiltersClick = (filter: string) => {
    setActiveFilters((prev) =>
      prev.includes(filter) ? prev.filter(x => x !== filter) : [...prev, filter]
    )
  }

  const handleClick = (item: string) => {
    window.history.pushState({ overlay: true }, "");
    onMenuClick(true)
    selectedItem(item)
    if (!isFirstClicked) {
      setIsFirstClicked(true);
    }
  }

  function capitalizeFirstLetter(str: string) {
    if (str === "veg") {
      return "Veg";
    } else if (str === "non-veg") {
      return "Non-Veg";
    } else {
      return "Drinks";
    }
  }

  return (
    <div id="menu" className="min-h-[60vh] relative bg-brand-mesh text-white -mt-8 mb-2 rounded-[2rem] pt-10 pb-16 z-39">
      <div className="max-w-3xl mx-auto px-4 relative">
        
        <div className="flex w-full justify-center items-center">
          <motion.h2 key={type} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className=" tracking-wide font-[700] cormorant_garamond-regular text-3xl mb-4 ">
            <span className="text-3xl md:text-7xl font-bold tracking-wide whitespace-nowrap">
              Our Menu
            </span>
          </motion.h2>
        </div>

        <div className="flex flex-row items-center gap-1 justify-center mb-2">
          
          {/* Search Bar */}
          <div className="w-[95%] relative bg-[#2E2E2E] pl-8 rounded-lg cursor-pointer" onClick={() => setIsSearchActive(true)}>
            <div className="w-[85%] text-[1rem] text-white bg-[#2E2E2E]/20 px-2 py-1 outline-none rounded-lg">What do you want to order? </div>
            <GoSearch className="absolute z-50 top-1 left-2 text-white" size={20} />
          </div>

          {/* Filter Modal Button */}
          <div className="relative bg-[#2E2E2E] px-2 py-2 rounded-lg cursor-pointer" onClick={() => setIsFiltersModalOpen(true)}>
            <BsSliders2 className="text-white" size={18} />
            {totalAppliedCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-[#A95700] text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-[#171717]">
                {totalAppliedCount}
              </span>
            )}
          </div>

          {/* Render Filter Modal */}
          {isFiltersModalOpen && (
            <FiltersModal
              initialFilters={appliedFilters}
              onClose={() => setIsFiltersModalOpen(false)}
              onApply={(newSelectedFilters) => {
                setAppliedFilters(newSelectedFilters);
              }}
            />
          )}
        </div>

        {/* Quick Filters (Pills) */}
        <div className="flex flex-wrap gap-2 px-4 mb-8 justify-center">
          {filters.map((filter) => (
            <span 
              key={filter} 
              onClick={() => handleFiltersClick(filter)}
              className={`px-2 rounded-lg text-lg bg-[#2E2E2E] cursor-pointer transition-all duration-300 ease-in-out ${
                activeFilters.includes(filter) ? " text-[#ffa601] border border-[#FFA500]" : "text-white/60"
              }`}
            >
              {filter}
            </span>
          ))}
        </div>

        {/* Menu Items */}
        <motion.div
          key={activeFilters.sort().join("|") || "all"}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="space-y-5 z-100"
        >
          {filteredItems.length > 0 ? (
            <>
              {filteredItems.map((item) => (
                <motion.div 
                  initial={{ opacity: 0, x: -80 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -80 }}
                  transition={{ duration: 0.3, type: "spring", stiffness: 60, damping: 20, mass: 0.5 }}
                  viewport={{ once: true, amount: 0.7 }} 
                  key={item.id} 
                  className="group cursor-pointer"
                >
                  <p className="text-xs md:text-xl text-gray-400 mb-1">
                    from RS {item.price}
                  </p>

                  <div className="relative pb-2" onClick={() => handleClick(item.name)}>
                    <motion.div 
                      initial={{ opacity: 0, x: -80 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -80 }}
                      transition={{ duration: 0.3, delay: 0.2, type: "spring", stiffness: 60, damping: 20, mass: 0.5 }}
                      viewport={{ once: true, amount: 0.7 }} 
                      className="flex items-center justify-between"
                    >
                      <h3 className="text-2xl cormorant_garamond-regular tracking-wide transition ease-in-out duration-300 ">
                        <span className="text-3xl md:text-6xl text-white tracking-wide mb-2 whitespace-nowrap">
                          {item.name}
                        </span>
                      </h3>
                      <span className={`inline-block text-3xl md:text-5xl transition-transform ease-in-out duration-300 ${!isFirstClicked ? "rounded-full arrow-pulse" : ""}`}>→</span>
                    </motion.div>
                  </div>

                  <div className="relative pb-1">
                    <motion.div
                      className="absolute left-0 bottom-0 h-[3px] bg-gray-600 origin-center"
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      exit={{ scaleX: 0 }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      viewport={{ once: true, amount: 0.7 }}
                      style={{ width: "100%" }}
                    />
                  </div>
                </motion.div>
              ))}
            </>
          ) : (
            <motion.div 
              initial={{ opacity: 0, x: -80 }}
              whileInView={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -80 }}
              transition={{ duration: 0.3, type: "spring", stiffness: 60, damping: 20, mass: 0.5 }}
              viewport={{ once: true, amount: 0.7 }} 
              className="group cursor-pointer"
            >
              <div className="relative pb-2" >
                <motion.div 
                  initial={{ opacity: 0, x: -80 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -80 }}
                  transition={{ duration: 0.3, delay: 0.2, type: "spring", stiffness: 60, damping: 20, mass: 0.5 }}
                  viewport={{ once: true, amount: 0.7 }} 
                  className="flex items-center justify-between"
                >
                  <h3 className="text-2xl text-center cormorant_garamond-regular tracking-wide transition ease-in-out duration-300 ">
                    <span className="text-xl ml-16 text-center md:text-6xl text-white tracking-wide mb-2 whitespace-nowrap">
                      No items have been found
                    </span>
                  </h3>
                </motion.div>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default MenuSection;