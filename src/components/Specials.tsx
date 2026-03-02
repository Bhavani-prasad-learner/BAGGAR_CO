import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const dishes = [
  {
    title: "French Fries",
    image: "/frenchfries.png",
    ingredients: ["Potatoes", "Salt", "Oil"],
  },
  {
    title: "Veg Nuggets",
    image: "/vegnuggets.png",
    ingredients: ["Bun", "Patty", "Lettuce", "Sauce"],
  },
  {
    title: "Salad",
    image: "/salad.png",
    ingredients: ["Dough", "Cheese", "Tomato", "Olives"],
  },
];

const DishCard = ({ dish }) => {
     const [imageClicked, setImageClicked]=useState(false)
return(
  <div className="pl-4 pr-4 relative" onClick={()=>setImageClicked(!imageClicked)}>
        <div>
    {imageClicked && (
       <div className="absolute top-0 left-0 w-full h-72 bg-black bg-opacity-70 z-100 flex items-center justify-center rounded-lg">
        <p className="text-white text-xl font-bold">$9.99</p> {/* replace with actual price if available */}
      </div>)}
    <img
      src={dish.image}
      alt={dish.title}
      className="w-full h-72 object-cover rounded-lg mb-4"
    />
    </div>
    <h3 className="font-semibold text-white text-lg">{dish.title}</h3>
    <p className="text-gray-500 text-sm flex flex-wrap justify-center gap-2 mt-1">
      {dish.ingredients.map((item, i) => (
        <span key={i} className="flex items-center gap-1">
          <span className="text-gray-400">•</span>
          {item}
        </span>
      ))}
    </p>
  </div>
);
}

const DishCarousel = () => {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1); // 1 = forward, -1 = backward

  useEffect(() => {
    const interval = setInterval(() => {
      setDirection(1);
      setIndex((prev) => (prev + 1) % dishes.length);
    }, 4500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-[500px] w-full overflow-hidden rounded-xl mb-16">
       <div className="w-full p-0 text-center bg-[#0C0B09] rounded-xl">
    <h2 className="text-sm text-restaurant-primary font-semibold tracking-wide uppercase mb-4">
      - Specials Choice -
    </h2>
    <h1 className="text-3xl warnes-regular font-bold text-white-500 mt-1 mb-16">
      popular dishes
    </h1>
      <AnimatePresence custom={direction}>
        <motion.div
          key={index}
          custom={direction}
          initial={{ x: direction === 1 ? "100%" : "-100%"}}
          animate={{ x: 0 }}
          exit={{ x: direction === 1 ? "-100%" : "100%" }}
          transition={{ duration: 0.4 }}
          className="absolute w-full h-full"
        >
          <DishCard dish={dishes[index]} />
        </motion.div>
      </AnimatePresence>
    </div>
    </div>
  );
};

export default DishCarousel;
