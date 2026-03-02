// getRecommendations.ts

const computeCosineSimilarity = (vec1: FlavourProfile, vec2: FlavourProfile) => {
    const key1 = Object.keys(vec2);
    const key2= Object.keys(vec1);
    const keys = key1.filter(key=>key2.includes(key))
    // console.log(keys)
    // console.log(vec1, vec2)
    const dotProduct = keys.reduce((sum, key) => sum + vec1[key] * vec2[key], 0);
    const magnitude1 = Math.sqrt(keys.reduce((sum, key) => sum + vec1[key] ** 2, 0));
    const magnitude2 = Math.sqrt(keys.reduce((sum, key) => sum + vec2[key] ** 2, 0));
    // console.log(dotProduct / (magnitude1 * magnitude2 || 1))
    
   return dotProduct / (magnitude1 * magnitude2 || 1); // Avoid division by 0
};

// 1. Export the FlavourProfile and match the lowercase keys your actual data uses
export interface FlavourProfile {
  spiciness: number;
  sourness: number;
  sweetness: number;
  creaminess: number;
  crunchiness: number;
  earthiness: number;
  umami: number;
  // Made these optional in case some drinks use them
  fizz?: number;
  juiciness?: number;
  bitterness?: number;
  freshness?: number;
  fruitiness?: number;
}
// 2. Export the Dish interface, fix itemRating, and add missing properties
export interface Dish {
  itemName: string;
  price: string;
  lowpicpath: string;
  picPath: string;
  itemRating: number; // Changed from string to number
  flavourProfile: FlavourProfile;
  chefInfo?: string;  // Added optional property
  calInfo?: string;   // Added optional property
  similarity?: number; // Added optional property
}



const dishes = [
{
      itemName: "Water Melon Juice",
      price: "129",
      lowpicpath: "/webp2/WaterMelonJuice (1).webp",
      picPath: "/webp2/WaterMelonJuice.webp",
      itemRating: 4.4,
      flavourProfile: {
        "spiciness": 0,      // Refreshing, no spice
        "sourness": 2,       // Lightly tangy
        "sweetness": 4,      // Naturally sweet
        "creaminess": 1,     // Very light, mostly watery
        "crunchiness": 0,    // Liquid, no crunch
        "earthiness": 1,     // Fresh fruit aroma
        "umami": 0           // No umami
      },
      chefInfo: "Fresh watermelon juice, served chilled for ultimate refreshment.",
      calInfo: "70-90 kcal"
    },
    {
      itemName: "Cardamom Tea",
      price: "99",
      lowpicpath: "/webp2/Cardamomtea (1).webp",
      picPath: "/webp2/Cardamomtea.webp",
      itemRating: 4.5,
      flavourProfile: {
        "spiciness": 1,      // Mild cardamom spice
        "sourness": 0,       // Smooth
        "sweetness": 2,      // Slightly sweetened
        "creaminess": 3,     // Creamy from milk
        "crunchiness": 0,    // No crunch
        "earthiness": 2,     // Aromatic cardamom flavor
        "umami": 1           // Light savory undertones
      },
      chefInfo: "Traditional Indian tea infused with aromatic cardamom pods.",
      calInfo: "80-100 kcal"
    },
    {
      itemName: "Samosa with Chai",
      price: "149",
      lowpicpath: "/webp2/SamosaWithChai (1).webp",
      picPath: "/webp2/SamosaWithChai.webp",
      itemRating: 4.7,
      flavourProfile: {
        "spiciness": 3,      // Spiced potato filling
        "sourness": 1,       // Slight tang from chutney or dough
        "sweetness": 1,      // Minimal
        "creaminess": 1,     // Low
        "crunchiness": 4,    // Crispy fried exterior
        "earthiness": 2,     // Potato + spices
        "umami": 2           // Savory snack
      },
      chefInfo: "Crispy golden samosas served with a steaming cup of chai.",
      calInfo: "250-300 kcal"
    }    

] as Dish[];

export const getTopDrinkRecommendations = (
    userProfile: FlavourProfile,
    topN = 5
): Dish[] => {
    const scores = dishes.map((dish) => ({
        ...dish,
        similarity: computeCosineSimilarity(userProfile, dish.flavourProfile),
    }));
    // console.log(userProfile)
    // console.log(scores.sort((a, b) => b.similarity - a.similarity))
    return scores.sort((a, b) => b.similarity - a.similarity).slice(0, topN);
};
