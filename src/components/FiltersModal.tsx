import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useCallback } from "react";

type FiltersModalProps = {
  onClose: () => void;
  onApply: (filters: Record<string, string[]>) => void;
  initialFilters?: Record<string, string[]>;
};

export default function FiltersModal({
  onClose,
  onApply,
  initialFilters = {},
}: FiltersModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>(initialFilters);

  const isSelected = (category: string, value: string) =>
    selectedFilters[category]?.includes(value);

  const toggleFilter = (category: string, value: string) => {
    setSelectedFilters((prev) => {
      const existing = prev[category] || [];
      const updated = existing.includes(value)
        ? existing.filter((v) => v !== value)
        : [...existing, value];

      return { ...prev, [category]: updated };
    });
  };

  const clearAll = () => {
    setSelectedFilters({}); // Clears the visual checkboxes in the modal
    onApply({});            // Instantly tells the parent: "Zero filters applied!"
              // Closes the modal immediately
  };

  const handleApply = () => {
    onApply(selectedFilters);
    onClose();
  };

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.3 } },
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { type: "spring", damping: 20, stiffness: 250 },
    },
    exit: { opacity: 0, scale: 0.95, transition: { duration: 0.2 } },
  };

  const renderSection = (title: string, items: string[]) => (
    <div className="flex flex-col">
      <h3 className="font-semibold text-lg text-black">{title}</h3>
      <div className="flex flex-wrap gap-2">
        {items.map((item) => (
          <button
            key={item}
            onClick={() => toggleFilter(title, item)}
            className={`px-3 py-1 rounded-lg border text-sm transition-all ${
              isSelected(title, item)
                ? "bg-[#f9dcdc] text-[#c25c61] border-[#c25c61]"
                : "bg-white text-black border-gray-300"
            }`}
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );

  const dietFilters = ["veg", "non-veg", "vegan"];
  const categoryFilters = ["starters", "mains", "desserts", "beverages"];
  const priceFilters = ["0-100", "100-500", "500-5000"];
  const spiceFilters = ["mild", "medium", "very"];
  const tasteFilters = ["spicy", "sweet", "creamy", "cheesey"];
  const miscFilters = ["best sellers", "chef's specials"];
  const allergenFilters = ["gluten-free", "dairy-free", "nut-free"];

  // Add this right before your return statement
  const totalFiltersApplied = Object.values(selectedFilters).reduce(
    (total, currentArray) => total + currentArray.length,
    0
  );

  

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0  flex items-center justify-center z-[100]"
        variants={backdropVariants}
        initial="hidden"
        animate="visible"
        exit="hidden"
        onClick={onClose}
      >
        <motion.div
          ref={modalRef}
          className="bg-white w-[600px] max-h-[85vh] overflow-y-auto rounded-2xl p-6 relative"
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4
            border border-gray-600
            rounded-full
            p-2
            text-gray-600
            "
          >
            <X size={20} />
          </button>

          <h2 className="text-4xl lobster-regular font-bold mb-6 text-black">Filters</h2>

          <div className="flex flex-col gap-4">
            {renderSection("Diet", dietFilters)}
            {renderSection("Category", categoryFilters)}
            {renderSection("Price", priceFilters)}
            {/* {renderSection("Spice Level", spiceFilters)}
            {renderSection("Taste", tasteFilters)} */}
            {renderSection("Allergens", allergenFilters)}
            {renderSection("Special", miscFilters)}
          </div>

          {/* Bottom Buttons */}
          <div className="flex justify-between mt-8">
            <button
              onClick={clearAll}
              className="text-sm text-gray-500 hover:text-black"
            >
              Clear All
            </button>

            <button
              onClick={handleApply}
              className="px-5 py-2 bg-[#A95700] text-white rounded-lg"
            >
              Apply Filters {totalFiltersApplied > 0 && `(${totalFiltersApplied})`}
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
