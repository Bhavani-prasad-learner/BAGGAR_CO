// getRecommendations.ts

// const computeCosineSimilarity = (vec1, vec2) => {
//     const keys = Object.keys(vec1);
//     const dotProduct = keys.reduce((sum, key) => sum + vec1[key] * vec2[key], 0);
//     const magnitude1 = Math.sqrt(keys.reduce((sum, key) => sum + vec1[key] ** 2, 0));
//     const magnitude2 = Math.sqrt(keys.reduce((sum, key) => sum + vec2[key] ** 2, 0));
//     return dotProduct / (magnitude1 * magnitude2 || 1); // Avoid division by 0
// };

const computeCosineSimilarity = (vec1, vec2) => {
    const keys = Object.keys(vec1);

    let dot = 0;
    let mag1 = 0;
    let mag2 = 0;

    for (const key of keys) {
        const v1 = vec1[key] ?? 0;
        const v2 = vec2[key] ?? 0;

        dot += v1 * v2;
        mag1 += v1 * v1;
        mag2 += v2 * v2;
    }

    if (mag1 === 0 || mag2 === 0) return 0;

    return dot / (Math.sqrt(mag1) * Math.sqrt(mag2));
};


interface FlavourProfile {
    bitterness: number;
    // Calories: number;
    creaminess: number;
    crunchiness: number;
    earthiness: number;
    freshness: number;
    fruitiness: number;
    sourness: number;
    spiciness: number;
    sweetness: number;
    umami: number;
}

interface Dish {
    itemName: string;
    price: string;
    lowpicpath: string;
    picPath: string;
    itemRating: number;
    chefInfo: string;
    calInfo:string;
    flavourProfile: FlavourProfile;
}



const dishes = [
   {
      itemName: "Bread Omelette",
      price: "99",
      lowpicpath: "/webp2/BreadOmelette (1).webp",
      picPath: "/webp2/BreadOmelette.webp",
      itemRating: 4.3,
      flavourProfile: {
        "spiciness": 2,      // Mild masala inside
        "sourness": 1,       // Slight tang from seasoning
        "sweetness": 1,      // Minimal
        "creaminess": 2,     // Egg + butter
        "crunchiness": 1,    // Toasted bread edges
        "earthiness": 2,     // Egg + bread flavor
        "umami": 3           // Savory breakfast flavor
      },
      chefInfo: "Classic bread omelette, lightly spiced and pan-fried to perfection.",
      calInfo: "220-260 kcal"
    },
    {
      itemName: "Cheese Omelette",
      price: "129",
      lowpicpath: "/webp2/CheeseOmelette (1).webp",
      picPath: "/webp2/CheeseOmelette.webp",
      itemRating: 4.5,
      flavourProfile: {
        "spiciness": 1,      // Very mild
        "sourness": 1,       // Light
        "sweetness": 1,      // Minimal
        "creaminess": 4,     // Cheese adds richness
        "crunchiness": 1,    // Slight from edges
        "earthiness": 2,     // Egg + cheese
        "umami": 4           // Savory and cheesy
      },
      chefInfo: "Soft omelette loaded with melted cheese for a creamy bite.",
      calInfo: "250-290 kcal"
    },
    {
      itemName: "Masala Omelette",
      price: "119",
      lowpicpath: "/webp2/MasalaOmelette (1).webp",
      picPath: "/webp2/MasalaOmelette.webp",
      itemRating: 4.6,
      flavourProfile: {
        "spiciness": 3,      // Spicy masala mix
        "sourness": 1,       // Slight tang from spices
        "sweetness": 1,      // Minimal
        "creaminess": 2,     // Egg base
        "crunchiness": 1,    // Slight edges
        "earthiness": 3,     // Herbs + spices
        "umami": 4           // Savory and flavorful
      },
      chefInfo: "Fluffy omelette loaded with Indian masala spices for a zesty taste.",
      calInfo: "230-270 kcal"
    },
    {
      itemName: "Mushroom Omelette",
      price: "139",
      lowpicpath: "/webp2/Mushroomomelet (1).webp",
      picPath: "/webp2/Mushroomomelet.webp",
      itemRating: 4.5,
      flavourProfile: {
        "spiciness": 2,      // Mildly spiced
        "sourness": 1,       // Slight
        "sweetness": 1,      // Minimal
        "creaminess": 2,     // Egg + mushroom texture
        "crunchiness": 1,    // Slight mushroom bite
        "earthiness": 4,     // Strong mushroom flavor
        "umami": 4           // Savory mushroom + egg
      },
      chefInfo: "Soft omelette with fresh mushrooms, lightly seasoned for earthy flavor.",
      calInfo: "240-280 kcal"
    },
    {
      itemName: "Plain Omelette",
      price: "89",
      lowpicpath: "/webp2/PlainOmelette (1).webp",
      picPath: "/webp2/PlainOmelette.webp",
      itemRating: 4.2,
      flavourProfile: {
        "spiciness": 1,      // Very mild
        "sourness": 0,       // None
        "sweetness": 1,      // Minimal
        "creaminess": 2,     // Egg base
        "crunchiness": 1,    // Slight edges
        "earthiness": 2,     // Egg flavor
        "umami": 3           // Classic savory taste
      },
      chefInfo: "Simple and classic omelette, lightly seasoned and cooked soft.",
      calInfo: "200-240 kcal"
    },
     {
      itemName: "Chicken Noodles",
      price: "199",
      lowpicpath: "/webp2/ChickenNoodles (1).webp",
      picPath: "/webp2/ChickenNoodles.webp",
      itemRating: 4.5,
      flavourProfile: {
        "spiciness": 2,      // Mildly spiced
        "sourness": 1,       // Light tang from sauce
        "sweetness": 1,      // Slight sweetness
        "creaminess": 1,     // Not creamy
        "crunchiness": 1,    // Slightly crisp veggies
        "earthiness": 2,     // Chicken + soy notes
        "umami": 4           // Strong savory flavor
      },
      chefInfo: "Stir-fried noodles with tender chicken pieces and fresh vegetables.",
      calInfo: "320-360 kcal"
    },
    {
      itemName: "Double Egg Chicken Noodles",
      price: "219",
      lowpicpath: "/webp2/DoubleEggChickenNoodles (1).webp",
      picPath: "/webp2/DoubleEggChickenNoodles.webp",
      itemRating: 4.6,
      flavourProfile: {
        "spiciness": 2,      // Mild spice
        "sourness": 1,       // Light tang from sauce
        "sweetness": 1,      // Slight
        "creaminess": 2,     // Egg adds some richness
        "crunchiness": 1,    // Slight veggies crunch
        "earthiness": 3,     // Chicken + egg depth
        "umami": 5           // Savory and rich
      },
      chefInfo: "Noodles tossed with double eggs and succulent chicken for a hearty meal.",
      calInfo: "380-420 kcal"
    },
    {
      itemName: "Double Egg Noodles",
      price: "189",
      lowpicpath: "/webp2/DoubleEggNoodels (1).webp",
      picPath: "/webp2/DoubleEggNoodels.webp",
      itemRating: 4.4,
      flavourProfile: {
        "spiciness": 1,      // Very mild
        "sourness": 1,       // Light sauce tang
        "sweetness": 1,      // Minimal
        "creaminess": 2,     // Egg adds richness
        "crunchiness": 1,    // Slight veggies
        "earthiness": 2,     // Egg and sauce flavors
        "umami": 4           // Rich and savory
      },
      chefInfo: "Soft noodles cooked with double eggs, lightly seasoned for a classic taste.",
      calInfo: "330-370 kcal"
    },
    {
      itemName: "Egg Noodles",
      price: "179",
      lowpicpath: "/webp2/EggNoodles (1).webp",
      picPath: "/webp2/EggNoodles.webp",
      itemRating: 4.3,
      flavourProfile: {
        "spiciness": 1,      // Mild
        "sourness": 1,       // Light
        "sweetness": 1,      // Minimal
        "creaminess": 1,     // Light egg presence
        "crunchiness": 1,    // Soft noodles
        "earthiness": 2,     // Egg + sauce
        "umami": 3           // Savory but lighter than double egg
      },
      chefInfo: "Classic egg noodles, stir-fried with light seasoning and vegetables.",
      calInfo: "300-340 kcal"
    },
     {
      itemName: "Blue Berry Cheese Cake",
      price: "229",
      lowpicpath: "/webp2/BlueBerryCheeseCake (1).webp",
      picPath: "/webp2/BlueBerryCheeseCake.webp",
      itemRating: 4.7,
      flavourProfile: {
        "spiciness": 0,      // None
        "sourness": 3,       // Tangy blueberry topping
        "sweetness": 5,      // Rich sweetness
        "creaminess": 5,     // Velvety cream cheese
        "crunchiness": 2,    // Biscuit crust base
        "earthiness": 1,     // Very subtle
        "umami": 2           // Mild dairy umami
      },
      chefInfo: "A creamy cheesecake topped with a luscious blueberry glaze and biscuit crust.",
      calInfo: "350-400 kcal"
    },
    {
      itemName: "Caramel Cheese Cake",
      price: "239",
      lowpicpath: "/webp2/CaramelCheeseCake (1).webp",
      picPath: "/webp2/CaramelCheeseCake.webp",
      itemRating: 4.8,
      flavourProfile: {
        "spiciness": 0,      // None
        "sourness": 2,       // Mild cream cheese tang
        "sweetness": 5,      // Sweet caramel topping
        "creaminess": 5,     // Rich and smooth
        "crunchiness": 2,    // Crumbly crust
        "earthiness": 1,     // Very subtle
        "umami": 2           // Light dairy umami
      },
      chefInfo: "Decadent cheesecake layered with silky caramel sauce and crunchy biscuit crust.",
      calInfo: "370-420 kcal"
    },
     {
      itemName: "Herb Grilled Paneer",
      price: "249",
      lowpicpath: "/webp2/HerbGrilledPaneer (1).webp",
      picPath: "/webp2/HerbGrilledPaneer.webp",
      itemRating: 4.5,
      flavourProfile: {
        "spiciness": 2,      // Mild spice from herbs
        "sourness": 2,       // Slight tang from marinade
        "sweetness": 1,      // Subtle balance
        "creaminess": 2,     // Paneer softness
        "crunchiness": 1,    // Light grilled edges
        "earthiness": 3,     // Herbal + paneer flavor
        "umami": 3           // Balanced savory notes
      },
      chefInfo: "Paneer marinated with fresh herbs and spices, grilled to perfection.",
      calInfo: "280-320 kcal"
    },
    {
      itemName: "Spicy Grilled Paneer",
      price: "259",
      lowpicpath: "/webp2/SpicyGrilledPaneer (1).webp",
      picPath: "/webp2/SpicyGrilledPaneer.webp",
      itemRating: 4.6,
      flavourProfile: {
        "spiciness": 4,      // High spice level
        "sourness": 2,       // Tangy marinade
        "sweetness": 1,      // Low sweetness
        "creaminess": 2,     // Soft paneer texture
        "crunchiness": 1,    // Crispy grilled coating
        "earthiness": 3,     // Masala + paneer earthiness
        "umami": 3           // Savory grilled balance
      },
      chefInfo: "Paneer cubes coated in a spicy marinade and grilled for a fiery bite.",
      calInfo: "300-340 kcal"
    },
    {
      itemName: "Herb Grilled Chicken",
      price: "279",
      lowpicpath: "/webp2/HerbGrilledChicken (1).webp",
      picPath: "/webp2/HerbGrilledChicken.webp",
      itemRating: 4.7,
      flavourProfile: {
        "spiciness": 2,      // Mild herb spice
        "sourness": 2,       // Lemon/herb tang
        "sweetness": 1,      // Balanced
        "creaminess": 1,     // Lean texture
        "crunchiness": 1,    // Grilled char
        "earthiness": 3,     // Earthy herb notes
        "umami": 4           // Chicken savory base
      },
      chefInfo: "Juicy chicken marinated in herbs and grilled with a smoky flavor.",
      calInfo: "320-360 kcal"
    },
    {
      itemName: "Spicy Grilled Chicken",
      price: "289",
      lowpicpath: "/webp2/SpicyGrilledChicken (1).webp",
      picPath: "/webp2/SpicyGrilledChicken.webp",
      itemRating: 4.8,
      flavourProfile: {
        "spiciness": 5,      // Extra hot and fiery
        "sourness": 2,       // Light tang in marinade
        "sweetness": 1,      // Very low
        "creaminess": 1,     // Lean meat
        "crunchiness": 1,    // Crispy grilled char
        "earthiness": 3,     // Spices + chicken depth
        "umami": 5           // Strong savory chicken umami
      },
      chefInfo: "Tender chicken marinated with bold spices, grilled for intense smoky heat.",
      calInfo: "340-380 kcal"
    },
     {
      itemName: "Double Masala Maggi",
      price: "149",
      lowpicpath: "/webp2/DoubleMasalaMaggi (1).webp",
      picPath: "/webp2/DoubleMasalaMaggi.webp",
      itemRating: 4.4,
      flavourProfile: {
        "spiciness": 4,      // Extra masala heat
        "sourness": 1,       // Slight tang from spices
        "sweetness": 1,      // Subtle balance
        "creaminess": 2,     // Starch in noodles
        "crunchiness": 0,    // Soft noodles
        "earthiness": 3,     // Masala base
        "umami": 3           // Seasoning richness
      },
      chefInfo: "Maggi with double masala for an extra spicy and flavorful kick.",
      calInfo: "350 kcal"
    },
    {
      itemName: "Classic Veg Maggi",
      price: "129",
      lowpicpath: "/webp2/ClassicVegMaggi (1).webp",
      picPath: "/webp2/ClassicVegMaggi.webp",
      itemRating: 4.3,
      flavourProfile: {
        "spiciness": 2,      // Mild spice
        "sourness": 1,       // Light tang from spices
        "sweetness": 1,      // Neutral balance
        "creaminess": 2,     // Slight starch texture
        "crunchiness": 0,    // Soft noodles
        "earthiness": 2,     // Simple masala flavor
        "umami": 2           // Basic Maggi taste
      },
      chefInfo: "Classic plain Maggi cooked with signature masala and spices.",
      calInfo: "320 kcal"
    },
    {
      itemName: "Chicken Maggi",
      price: "179",
      lowpicpath: "/webp2/ChickenMaggi (1).webp",
      picPath: "/webp2/ChickenMaggi.webp",
      itemRating: 4.6,
      flavourProfile: {
        "spiciness": 3,      // Balanced masala with chicken
        "sourness": 1,       // Very mild tang
        "sweetness": 1,      // Balanced flavor
        "creaminess": 2,     // Slightly rich broth
        "crunchiness": 0,    // Soft noodles
        "earthiness": 3,     // Chicken adds depth
        "umami": 4           // Strong chicken umami
      },
      chefInfo: "Maggi cooked with tender chicken pieces and spices for a hearty meal.",
      calInfo: "400 kcal"
    },
    {
      itemName: "Double Egg Chicken Maggi",
      price: "199",
      lowpicpath: "/webp2/DoubleEggChickenMaggi (1).webp",
      picPath: "/webp2/DoubleEggChickenMaggi.webp",
      itemRating: 4.7,
      flavourProfile: {
        "spiciness": 3,      // Balanced spice
        "sourness": 1,       // Very mild
        "sweetness": 1,      // Slight balance
        "creaminess": 3,     // Egg yolk richness
        "crunchiness": 0,    // Soft noodles
        "earthiness": 3,     // Chicken + masala depth
        "umami": 5           // Chicken + eggs = strong umami
      },
      chefInfo: "Maggi packed with chicken and topped with two eggs for a protein-rich twist.",
      calInfo: "480 kcal"
    },
    {
      itemName: "Double Egg Maggi",
      price: "169",
      lowpicpath: "/webp2/DoubleEggMaggi (1).webp",
      picPath: "/webp2/DoubleEggMaggi.webp",
      itemRating: 4.5,
      flavourProfile: {
        "spiciness": 2,      // Mild spices
        "sourness": 1,       // Light tang
        "sweetness": 1,      // Neutral balance
        "creaminess": 3,     // Creaminess from eggs
        "crunchiness": 0,    // Soft noodles
        "earthiness": 2,     // Base masala notes
        "umami": 4           // Eggs add savory depth
      },
      chefInfo: "Maggi served with two eggs for a simple yet protein-packed option.",
      calInfo: "420 kcal"
    },
     {
      itemName: "Signature Veg Patty Burger",
      price: "249",
      lowpicpath: "/webp2/SignatureVegPattyBurger (1).webp",
      picPath: "/webp2/SignatureVegPattyBurger.webp",
      itemRating: 4.5,
      flavourProfile: {
        "spiciness": 2,      // Mild chili/pepper notes from seasoning
        "sourness": 2,       // Tang from pickles or sauce
        "sweetness": 1,      // Slight sweetness from bun/ketchup
        "creaminess": 3,     // Cheese + mayo-based sauce
        "crunchiness": 3,    // Lettuce, onion & toasted bun
        "earthiness": 2,     // Veg patty base
        "umami": 4           // Patty seasoning + melted cheese
      },
      chefInfo: "Crispy veg patty with fresh lettuce, onion, tomato and a slice of melted cheese in a toasted bun.",
      calInfo: "420 kcal"
    },
    {
      itemName: "Signature Chicken Patty Burger",
      price: "289",
      lowpicpath: "/webp2/SignatureChickenPattyBurger (1).webp",
      picPath: "/webp2/SignatureChickenPattyBurger.webp",
      itemRating: 4.7,
      flavourProfile: {
        "spiciness": 3,      // Peppery marinade on the chicken
        "sourness": 2,       // Tang from pickles or house sauce
        "sweetness": 1,      // Light sweetness from bun/sauces
        "creaminess": 3,     // Cheese + creamy sauce
        "crunchiness": 3,    // Lettuce & toasted bun
        "earthiness": 3,     // Grilled chicken base
        "umami": 5           // Strong chicken + seasoning umami
      },
      chefInfo: "Juicy grilled chicken patty layered with lettuce, tomato, melted cheese and chef’s special sauce on a toasted bun.",
      calInfo: "510 kcal"
    },{
    itemName: "Aglio Olio Veg",
    price: "239",
    lowpicpath: "/webp2/AglioOlioVeg (1).webp",
    picPath: "/webp2/AglioOlioVeg.webp",
    itemRating: 4.4,
    flavourProfile: {
      "spiciness": 3,      // Red chili flakes & spices
      "sourness": 1,       // Very light acidity
      "sweetness": 1,      // Minimal sweetness
      "creaminess": 1,     // Oil-based, not creamy
      "crunchiness": 1,    // Light bite from veggies/olives
      "earthiness": 3,     // Basil + olive oil earthiness
      "umami": 3           // Olives + garlic umami
    },
    chefInfo: "A light Italian pasta made with olive oil, black olives, basil leaves, and spices for a fresh Mediterranean taste.",
    calInfo: "260-310 kcal"
  },
  {
    itemName: "Alfredo Veg",
    price: "259",
    lowpicpath: "/webp2/AlfredoVeg (1).webp",
    picPath: "/webp2/AlfredoVeg.webp",
    itemRating: 4.6,
    flavourProfile: {
      "spiciness": 1,      // Very mild spice
      "sourness": 1,       // Almost none
      "sweetness": 2,      // Creamy milk sweetness
      "creaminess": 5,     // Rich white sauce
      "crunchiness": 1,    // Soft texture, little crunch
      "earthiness": 2,     // Subtle herb notes
      "umami": 4           // Cheese + cream umami
    },
    chefInfo: "Rich and creamy white sauce pasta infused with herbs, served with your choice of penne or spaghetti.",
    calInfo: "320-380 kcal"
  },
  {
    itemName: "Aglio Olio Non Veg",
    price: "279",
    lowpicpath: "/webp2/AglioOlioNonVeg (1).webp",
    picPath: "/webp2/AglioOlioNonVeg.webp",
    itemRating: 4.5,
    flavourProfile: {
      "spiciness": 4,      // Red chilli peppers
      "sourness": 1,       // Minimal acidity
      "sweetness": 1,      // Almost none
      "creaminess": 1,     // Oil-based, not creamy
      "crunchiness": 1,    // Light bite
      "earthiness": 3,     // Garlic + olive oil
      "umami": 4           // Chicken + garlic umami
    },
    chefInfo: "Classic Aglio Olio with extra virgin olive oil, red chili peppers, garlic, and tender chicken for a flavorful twist.",
    calInfo: "300-360 kcal"
  },
  {
    itemName: "Alfredo Non Veg",
    price: "299",
    lowpicpath: "/webp2/AlfredoNonVeg (1).webp",
    picPath: "/webp2/AlfredoNonVeg.webp",
    itemRating: 4.7,
    flavourProfile: {
      "spiciness": 1,      // Barely any spice
      "sourness": 1,       // Very mild
      "sweetness": 2,      // Cream & milk sweetness
      "creaminess": 5,     // Super creamy sauce
      "crunchiness": 1,    // Soft pasta texture
      "earthiness": 2,     // Herbs + butter
      "umami": 5           // Chicken + Parmesan cheese umami
    },
    chefInfo: "Pasta served in a rich, creamy sauce made with butter, cream, and Parmesan cheese, enhanced with tender chicken.",
    calInfo: "350-420 kcal"
  }
];

export const getTopRecommendations = (
    userProfile,
    topN = 5
) => {
    const scores = dishes.map((dish) => ({
        ...dish,
        similarity: computeCosineSimilarity(userProfile, dish.flavourProfile),
    }));
    // console.log(userProfile)
    // console.log(scores.sort((a, b) => b.similarity - a.similarity))
    return scores.sort((a, b) => b.similarity - a.similarity).slice(0, topN);
};
