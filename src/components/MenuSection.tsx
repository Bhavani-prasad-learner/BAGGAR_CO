
import React, { useState } from "react";
import { motion } from "framer-motion";
import { BsSliders2 } from "react-icons/bs";
import { GoSearch } from "react-icons/go";
import FiltersModal from "./FiltersModal";

interface MenuItem {
  id: number;
  name: string;
  price: number;
  diet: string[];
  category: string[];
  allergens?: string[];
  special?: string[];
}

interface MenuSectionProps {
  type: string;
  onMenuClick: (open: boolean) => void;
  selectedItem: (item: string) => void;
  setIsSearchActive: (item: boolean) => void;
}

const MenuSection = ({
  type,
  onMenuClick,
  selectedItem,
  setIsSearchActive
}: MenuSectionProps) => {

  const menuItems: MenuItem[] = [
    { id: 1, name: "veg currys with pulao's", price: 259, diet: ["veg", "vegan"], category: ["mains"], allergens: ["gluten-free", "dairy-free"] },
    { id: 2, name: "veg curries", price: 119, diet: ["veg"], category: ["mains"], special: ["best sellers"] },
    { id: 5, name: "non-veg curries", price: 229, diet: ["non-veg"], category: ["mains"], allergens: ["nut-free"] },
    { id: 3, name: "pulao's with iguru", price: 109, diet: ["non-veg"], category: ["mains"], special: ["chef's specials"] },
    { id: 4, name: "family & jumbo packs", price: 699, diet: ["non-veg"], category: ["mains"] }
  ];

  const [isFirstClicked, setIsFirstClicked] = useState(false);

  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const filters = ["beverages", "deserts", "trending", "veg", "vegan", "non-veg"];

  const [isFiltersModalOpen, setIsFiltersModalOpen] = useState(false);
  const [appliedFilters, setAppliedFilters] = useState<Record<string, string[]>>({});

  const totalAppliedCount = Object.values(appliedFilters).reduce(
    (total, currentArray) => total + currentArray.length,
    0
  );

  const filteredItems = menuItems.filter(item => {

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

    const selectedDiets = appliedFilters["Diet"] || [];
    const selectedCategories = appliedFilters["Category"] || [];
    const selectedAllergens = appliedFilters["Allergens"] || [];
    const selectedSpecials = appliedFilters["Special"] || [];

    const hasAnyTagSelected =
      activeFilters.length > 0 ||
      selectedDiets.length > 0 ||
      selectedCategories.length > 0 ||
      selectedAllergens.length > 0 ||
      selectedSpecials.length > 0;

    if (!hasAnyTagSelected) return true;

    const matchesQuickPill = activeFilters.some(pill =>
      item.diet.includes(pill) ||
      item.category.includes(pill) ||
      item.special?.includes(pill)
    );

    const matchesDiet = selectedDiets.some(diet => item.diet.includes(diet));
    const matchesCategory = selectedCategories.some(cat => item.category.includes(cat));
    const matchesAllergen = selectedAllergens.some(a => item.allergens?.includes(a));
    const matchesSpecial = selectedSpecials.some(s => item.special?.includes(s));

    return matchesQuickPill || matchesDiet || matchesCategory || matchesAllergen || matchesSpecial;
  });

  const handleFiltersClick = (filter: string) => {
    setActiveFilters(prev =>
      prev.includes(filter) ? prev.filter(x => x !== filter) : [...prev, filter]
    );
  };

  const handleClick = (item: string) => {
    window.history.pushState({ overlay: true }, "");
    onMenuClick(true);
    selectedItem(item);

    if (!isFirstClicked) {
      setIsFirstClicked(true);
    }
  };

  return (
    <div id="menu" className="min-h-[60vh] font-cinzel relative bg-sub-brand text-white -mt-8 mb-2 rounded-[2rem] pt-10 pb-16 z-30">

      <div className="max-w-3xl mx-auto px-4 relative">

        {/* MENU TITLE */}
        <div className="flex w-full justify-center items-center mb-6">

          <motion.h2
            key={type}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center w-full"
          >

            <div className="flex items-center justify-center gap-3 md:gap-6 w-full mb-2 md:mb-4">

              <span className="text-3xl sm:text-4xl md:text-4xl lg:text-5xl font-bold tracking-wide font-cinzel text-yellow-400">
                Our Menu
              </span>

            </div>

            <div className="flex justify-center w-full">
              <img
                src="./border_p.png"
                alt="border"
                className="w-40 sm:w-56 md:w-72 object-contain"
              />
            </div>

          </motion.h2>

        </div>

        {/* SEARCH + FILTER */}
        <div className="flex flex-row items-center gap-2 justify-center mb-4">

          {/* Search */}
          <div
            className="w-[90%] relative bg-[#1b463b] pl-8 rounded-lg cursor-pointer"
            onClick={() => setIsSearchActive(true)}
          >
            <div className="text-sm sm:text-base text-white px-2 py-2">
              What do you want to order?
            </div>

            <GoSearch className="absolute top-2 left-2 text-white" size={18} />
          </div>

          {/* Filter Button */}
          <div
            className="relative bg-[#1b463b] px-3 py-2 rounded-lg cursor-pointer"
            onClick={() => setIsFiltersModalOpen(true)}
          >

            <BsSliders2 className="text-white" size={18} />

            {totalAppliedCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-[#A95700] text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-[#171717]">
                {totalAppliedCount}
              </span>
            )}

          </div>

          {isFiltersModalOpen && (
            <FiltersModal
              initialFilters={appliedFilters}
              onClose={() => setIsFiltersModalOpen(false)}
              onApply={(newSelectedFilters) => setAppliedFilters(newSelectedFilters)}
            />
          )}

        </div>

        {/* QUICK FILTERS */}
        <div className="flex flex-wrap gap-2 px-4 mb-8 justify-center">

          {filters.map(filter => (

            <span
              key={filter}
              onClick={() => handleFiltersClick(filter)}
              className={`px-3 py-1 rounded-lg text-sm sm:text-base bg-[#1b463b] cursor-pointer transition-all duration-300
              ${activeFilters.includes(filter)
                  ? "text-[#FFA500] border border-[#FFA500]"
                  : "text-white/70"
                }`}
            >
              {filter}
            </span>

          ))}

        </div>

        {/* MENU ITEMS */}

        <motion.div
          key={activeFilters.sort().join("|") || "all"}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-6"
        >

          {filteredItems.length > 0 ? (

            filteredItems.map(item => (

              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -80 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4 }}
                viewport={{ once: true }}
                className="group cursor-pointer"
              >

                <p className="text-xs   sm:text-sm md:text-lg text-gray-400 mb-1">
                  from RS {item.price}
                </p>

                <div className="relative pb-2" onClick={() => handleClick(item.name)}>

                  <div className="flex items-center justify-between">

                    <h3 className="font-lora">

                      <span className="text-xl font-cinzel sm:text-2xl md:text-4xl lg:text-5xl text-white leading-tight">
                        {item.name}
                      </span>

                    </h3>

                    <span className={`inline-block text-3xl md:text-5xl transition-transform ease-in-out duration-300 ${!isFirstClicked ? "rounded-full arrow-pulse" : ""}`}>→</span>

                  </div>

                </div>

                <div className="relative pb-1">

                  <motion.div
                    className="absolute left-0 bottom-0 h-[3px] bg-gray-600 origin-left"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    transition={{ duration: 1 }}
                    viewport={{ once: true }}
                    style={{ width: "100%" }}
                  />

                </div>

              </motion.div>

            ))

          ) : (

            <div className="text-center text-lg text-white/80">
              No items have been found
            </div>

          )}

        </motion.div>

      </div>

    </div>
  );
};

export default MenuSection;