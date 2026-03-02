// const navItems = {
//   "CREPES": [
//     {
//       itemName: "BLACK BERRY NOIRE",
//       price: "275",
//       lowpicpath: "/webp2/black-noire (1).webp",
//       picPath: "/webp2/black-noire.webp",
//       itemRating: 4.2,
//       flavourProfile: {
//         spiciness: 0,
//         sourness: 2,      // Blackberry tang
//         sweetness: 4,     // Nutella + ice cream
//         creaminess: 4,    // Ice cream & crepe
//         crunchiness: 1,
//         earthiness: 1,
//         umami: 1
//       },
//       chefInfo:
//         "A soft chocolate crepe layered with warm Nutella, fresh blackberries, and finished with vanilla bean ice cream.",
//       calInfo: "260–300 kcal"
//     },
//     {
//       itemName: "BERRY KISSED VELVET",
//       price: "295",
//       lowpicpath: "/webp2/red-velvet (1).webp",
//       picPath: "/webp2/red-velvet.webp",
//       itemRating: 4.2,
//       flavourProfile: {
//         spiciness: 0,
//         sourness: 1,
//         sweetness: 4,
//         creaminess: 5,   // Cream-forward dessert
//         crunchiness: 1,
//         earthiness: 1,
//         umami: 1
//       },
//       chefInfo:
//         "Red velvet crepe layered with vanilla sponge, silky cream, and topped with lightly macerated fresh berries.",
//       calInfo: "280–320 kcal"
//     }
//   ],

//   "MATCHAS": [
//     {
//       itemName: "Strawberry Matcha",
//       price: "250",
//       lowpicpath: "/webp2/strawberry-matcha (1).webp",
//       picPath: "/webp2/strawberry-matcha.webp",
//       itemRating: 4.3,
//       flavourProfile: {
//         spiciness: 0,
//         sourness: 2,      // Strawberry acidity
//         sweetness: 3,
//         creaminess: 3,
//         crunchiness: 0,
//         earthiness: 4,   // Matcha dominant
//         umami: 1
//       },
//       chefInfo:
//         "Smooth ceremonial-grade matcha blended with milk and strawberry for a balanced earthy-sweet finish.",
//       calInfo: "180–220 kcal"
//     },
//     {
//       itemName: "Mango Matcha",
//       price: "250",
//       lowpicpath: "/webp2/mango-matcha (1).webp",
//       picPath: "/webp2/mango-matcha.webp",
//       itemRating: 4.3,
//       flavourProfile: {
//         spiciness: 0,
//         sourness: 1,
//         sweetness: 4,    // Ripe mango
//         creaminess: 3,
//         crunchiness: 0,
//         earthiness: 4,
//         umami: 1
//       },
//       chefInfo:
//         "Earthy matcha paired with ripe mango and milk, creating a smooth tropical balance.",
//       calInfo: "190–230 kcal"
//     }
//   ],

//   "SANDWICHES": [
//     {
//       itemName: "Samosa with Chai",
//       price: "149",
//       lowpicpath: "/webp2/SamosaWithChai (1).webp",
//       picPath: "/webp2/SamosaWithChai.webp",
//       itemRating: 4.7,
//       flavourProfile: {
//         spiciness: 3,
//         sourness: 1,
//         sweetness: 1,
//         creaminess: 0,
//         crunchiness: 5,   // Core highlight
//         earthiness: 3,
//         umami: 3
//       },
//       chefInfo:
//         "Golden fried samosas with a spiced potato filling, paired with a comforting cup of hot chai.",
//       calInfo: "250–300 kcal"
//     }
//   ],

//   "MILKSHAKES": [
//     {
//       itemName: "LAVENDER HONEY CREME",
//       price: "220",
//       lowpicpath: "/webp2/lavender-honey-milkshake (1).webp",
//       picPath: "/webp2/lavender-honey-milkshake.webp",
//       itemRating: 4.7,
//       flavourProfile: {
//         spiciness: 0,
//         sourness: 0,
//         sweetness: 3,
//         creaminess: 5,   // Ultra creamy
//         crunchiness: 0,
//         earthiness: 2,   // Floral lavender
//         umami: 0
//       },
//       chefInfo:
//         "A rich, creamy milkshake infused with floral lavender and natural honey for a calming finish.",
//       calInfo: "300–340 kcal"
//     },
//     {
//       itemName: "VELVET VANILLA",
//       price: "220",
//       lowpicpath: "/webp2/velvet-milkshake (1).webp",
//       picPath: "/webp2/velvet-milkshake.webp",
//       itemRating: 4.7,
//       flavourProfile: {
//         spiciness: 0,
//         sourness: 0,
//         sweetness: 4,
//         creaminess: 5,
//         crunchiness: 0,
//         earthiness: 1,
//         umami: 0
//       },
//       chefInfo:
//         "Classic vanilla milkshake with a velvety smooth texture and deep, aromatic vanilla notes.",
//       calInfo: "320-360 kcal"
//     }
//   ],

//   "FRUIT DRINKS": [
//     {
//       itemName: "POMELMO (GRAPEFRUIT)",
//       price: "95",
//       lowpicpath: "/webp2/pomelmo (1).webp",
//       picPath: "/webp2/pomelmo.webp",
//       itemRating: 4.7,
//       flavourProfile: {
//         spiciness: 0,
//         sourness: 4,      // Grapefruit bite
//         sweetness: 1,
//         creaminess: 0,
//         crunchiness: 0,
//         earthiness: 1,
//         umami: 0
//       },
//       chefInfo:
//         "A refreshing grapefruit drink with a crisp, citrus-forward profile and light bitterness.",
//       calInfo: "60–80 kcal"
//     },
//     {
//       itemName: "ARANCIATA (ORANGE)",
//       price: "95",
//       lowpicpath: "/webp2/orange-juice (1).webp",
//       picPath: "/webp2/orange-juice.webp",
//       itemRating: 4.7,
//       flavourProfile: {
//         spiciness: 0,
//         sourness: 2,
//         sweetness: 3,
//         creaminess: 0,
//         crunchiness: 0,
//         earthiness: 1,
//         umami: 0
//       },
//       chefInfo:
//         "Fresh orange drink with a bright citrus aroma and naturally sweet finish.",
//       calInfo: "70–90 kcal"
//     }
//   ]
// };


const navItems = {
  "Sandwich": [{
    itemName: "Classic Paneer Sandwich",
    price: "129",
    lowpicpath: "/webp/classic-paneer-sandwich (1).webp",
    picPath: "/webp/classic-paneer-sandwich.webp",
    itemRating: "4",
    flavourProfile: {
      spiciness: 2,      // Mild spices in paneer filling
      sourness: 1,       // Possibly from sauces like ketchup or chutney
      sweetness: 1,      // Slight sweetness from bread or sauces
      creaminess: 3,     // From mayo or cheese
      crunchiness: 3,    // Toasted bread or raw veggies inside
      earthiness: 2,     // From paneer and herbs
      umami: 2,          // Mild umami from grilled paneer and condiments
      // calories: 3        // Moderate calorie count
    },
    chefInfo: "",
    calInfo: "280–370 kcal"
  }],
  "Veg Shawarma": [{
    itemName: "Classic Paneer Shawarma",
    price: "149",
    lowpicpath: "/webp/classic-paneer-shawarma (1).webp",
    picPath: "/webp/classic-paneer-shawarma.webp",
    itemRating: "4",
    flavourProfile: {
      spiciness: 3,      // Mild to moderate spices in marinade and sauces
      sourness: 2,       // Likely from pickles or yogurt-based sauces
      sweetness: 1,      // Slight sweetness from grilled veggies or sauce
      creaminess: 4,     // From mayo or garlic sauce
      crunchiness: 2,    // Slight crunch from veggies or grilled wrap
      earthiness: 3,     // From paneer and Indian spices
      umami: 3,          // Savory paneer, sauces
      // calories: 4        // Moderate to high due to paneer and sauces
    },
    chefInfo: "",
    calInfo: "350–450 kcal"
  },
  {
    itemName: "Falafel Shawarma",
    price: "109",
    lowpicpath: "/webp/falafel-shawarma (1).webp",
    picPath: "/webp/falafel-shawarma.webp",
    itemRating: "5",
    flavourProfile: {
      spiciness: 3,      // Mild to moderate spice from falafel and sauce
      sourness: 2,       // From pickles or yogurt sauce
      sweetness: 1,      // Mild sweetness from veggies like carrots
      creaminess: 4,     // Garlic mayo or tahini sauce adds creaminess
      crunchiness: 4,    // Falafel and fresh veggies
      earthiness: 4,     // Falafel, chickpeas, and herbs contribute
      umami: 2,          // From sauces and seasoning
      // calories: 4        // Medium-high due to falafel and sauces
    },
    calInfo: "350–450 kcal",
    chefInfo: "",
  }
  ],
  "Quick Bites": [
    {
      itemName: "French Fries",
      price: "109",
      lowpicpath: "/webp/frenchfries (1).webp",
      picPath: "/webp/frenchfries.webp",
      itemRating: "4",
      flavourProfile: {
        spiciness: 1,
        sourness: 0,
        sweetness: 0,
        creaminess: 0,
        crunchiness: 5,
        earthiness: 1,
        umami: 1,
        // calories: 4
      },
      chefInfo: "",
      calInfo: "300–400 kcal"
    },
    {
      itemName: "Peri Peri French Fries",
      price: "119",
      lowpicpath: "/webp/spicy_frenchfries (1).webp",
      picPath: "/webp/spicy_frenchfries.webp",
      itemRating: "4",
      flavourProfile: {
        spiciness: 4,
        sourness: 1,
        sweetness: 0,
        creaminess: 0,
        crunchiness: 5,
        earthiness: 1,
        umami: 2,
        // calories: 4
      },
      chefInfo: "",
      calInfo: "330–430 kcal"
    },
    {
      itemName: "Cheesy Peri Peri French Fries",
      price: "139",
      lowpicpath: "/webp/cheesy_peri_frenchfries (1).webp",
      picPath: "/webp/cheesy_peri_frenchfries.webp",
      itemRating: "4",
      flavourProfile: {
        spiciness: 4,
        sourness: 1,
        sweetness: 0,
        creaminess: 4,
        crunchiness: 5,
        earthiness: 1,
        umami: 3,
        // calories: 5
      },
      chefInfo: "",
      calInfo: "450–550 kcal"
    },
    {
      itemName: "Veg Nuggets",
      price: "119",
      lowpicpath: "/webp/vegnuggets (1).webp",
      picPath: "/webp/vegnuggets.webp",
      itemRating: "4",
      flavourProfile: {
        spiciness: 2,
        sourness: 0,
        sweetness: 1,
        creaminess: 1,
        crunchiness: 4,
        earthiness: 2,
        umami: 3,
        // calories: 4
      },
      chefInfo: "",
      calInfo: "250–350 kcal"
    },
    {
      itemName: "Crispy Falafel (4 Pcs)",
      price: "99",
      lowpicpath: "/webp/crispy_falafel (1).webp",
      picPath: "/webp/crispy_falafel.webp",
      itemRating: "4",
      flavourProfile: {
        spiciness: 3,
        sourness: 1,
        sweetness: 1,
        creaminess: 0,
        crunchiness: 4,
        earthiness: 3,
        umami: 2,
        // calories: 3
      },
      chefInfo: "",
      calInfo: "220–300 kcal"
    }
  ],
  "Salads": [
    {
      itemName: "Falafel Salad", price: "129", lowpicpath: "/webp/salad-2 (1).webp", picPath: "/webp/salad-2.webp", itemRating: '4', flavourProfile: {
        spiciness: 3,     // Mild seasoning and possible spices in falafel or sauce
        sourness: 2,      // Slight tanginess possibly from tomatoes or dressing
        sweetness: 1,     // Mild sweetness from beetroot and carrots
        creaminess: 4,    // From garlic mayonnaise
        crunchiness: 5,   // Raw veggies like lettuce, cucumber, onion, etc.
        earthiness: 3,    // Falafel and beetroot bring earthy tones
        umami: 2,         // Slight umami from garlic mayo and seasoning
        // calories: 4       // Medium-high due to falafel and mayo
      },
      calInfo: "300-420 kcal",
      chefInfo: "2 Pcs Falafel + Lettuce, capsicum, onion, cucumber, tomatoes and shredded carrots and beetroot mixed with our flavourful seasoning sauce, special in-house garlic mayonnaise."
    }
  ],
  "Classic Shawarma": [
   {
    itemName: "Regular Rumali Chicken Shawarma",
    price: "119",
    lowpicpath: "/webp/regular-rumali-chicken-shawarma (1).webp",
    picPath: "/webp/regular-rumali-chicken-shawarma.webp",
    itemRating: "5",
    flavourProfile: {
      spiciness: 3,
      sourness: 2,
      sweetness: 1,
      creaminess: 4,
      crunchiness: 2,
      earthiness: 3,
      umami: 4,
      // calories: 4
    },
    calInfo: "350-450 kcal",
    chefInfo: "Tender grilled chicken wrapped in soft rumali roti with a balanced mix of veggies and creamy garlic mayo."
  },
  {
    itemName: "Peri Peri Rumali Chicken Shawarma",
    price: "129",
    lowpicpath: "/webp/peri-peri-chicken-shawarma (1).webp",
    picPath: "/webp/peri-peri-chicken-shawarma.webp",
    itemRating: "5",
    flavourProfile: {
      spiciness: 5,
      sourness: 3,
      sweetness: 1,
      creaminess: 3,
      crunchiness: 2,
      earthiness: 3,
      umami: 4,
      // calories: 4
    },
    calInfo: "370-480 kcal",
    chefInfo: "Zesty peri-peri marinated chicken rolled in rumali roti with fresh salad and spicy peri sauce."
  },
  {
    itemName: "Mexican Rumali Chicken Shawarma",
    price: "129",
    lowpicpath: "/webp/mexican-shawarma (1).webp",
    picPath: "/webp/mexican-shawarma.webp",
    itemRating: "5",
    flavourProfile: {
      spiciness: 4,
      sourness: 3,
      sweetness: 2,
      creaminess: 3,
      crunchiness: 3,
      earthiness: 2,
      umami: 4,
      // calories: 4
    },
    calInfo: "360-470 kcal",
    chefInfo: "Mexican-flavored chicken shawarma with jalapeños, tangy salsa, and creamy dressing in a rumali wrap."
  },
  {
    itemName: "labanese Rumali Chicken Shawarma",
    price: "129",
    lowpicpath: "/webp/lebanse-shawarma (1).webp",
    picPath: "/webp/lebanse-shawarma.webp",
    itemRating: "5",
    flavourProfile: {
      spiciness: 2,
      sourness: 2,
      sweetness: 1,
      creaminess: 5,
      crunchiness: 2,
      earthiness: 3,
      umami: 4,
      // calories: 4
    },
    calInfo: "350-460 kcal",
    chefInfo: "Authentic Lebanese-style chicken with toum sauce, lettuce, and garlic mayo in a soft rumali wrap."
  },
  {
    itemName: "spicy Rumali Chicken Shawarma",
    price: "129",
    lowpicpath: "/webp/spicy-shawarma (1).webp",
    picPath: "/webp/spicy-shawarma.webp",
    itemRating: "5",
    flavourProfile: {
      spiciness: 5,
      sourness: 2,
      sweetness: 1,
      creaminess: 3,
      crunchiness: 2,
      earthiness: 3,
      umami: 4,
      // calories: 4
    },
    calInfo: "370-490 kcal",
    chefInfo: "Hot and spicy chicken shawarma with fiery sauces and veggies wrapped in a rumali roti."
  },
  {
    itemName: "Arabic Rumali Chicken Shawarma",
    price: "129",
    lowpicpath: "/webp/arabic-shawarma (1).webp",
    picPath: "/webp/arabic-shawarma.webp",
    itemRating: "5",
    flavourProfile: {
      spiciness: 3,
      sourness: 1,
      sweetness: 2,
      creaminess: 5,
      crunchiness: 2,
      earthiness: 3,
      umami: 5,
      // calories: 5
    },
    calInfo: "400-520 kcal",
    chefInfo: "Rich Arabic-style chicken with hummus, garlic sauce, and pickled veggies in rumali bread."
  },
  {
    itemName: "India Masala Rumali  Chicken Shawarma",
    price: "129",
    lowpicpath: "/webp/indian-masala-shawarma (1).webp",
    picPath: "/webp/indian-masala-shawarma.webp",
    itemRating: "5",
    flavourProfile: {
      spiciness: 4,
      sourness: 2,
      sweetness: 1,
      creaminess: 3,
      crunchiness: 2,
      earthiness: 4,
      umami: 4,
      // calories: 4
    },
    calInfo: "380-490 kcal",
    chefInfo: "Indian-spiced chicken with capsicum, onion, and flavorful masala sauces wrapped in rumali roti."
  },
  {
    itemName: "BBQ Rumali Chicken Shawarma",
    price: "129",
    lowpicpath: "/webp/bbq-shawarma (1).webp",
    picPath: "/webp/bbq-shawarma.webp",
    itemRating: "5",
    flavourProfile: {
      spiciness: 3,
      sourness: 2,
      sweetness: 3,
      creaminess: 4,
      crunchiness: 2,
      earthiness: 3,
      umami: 5,
      // calories: 5
    },
    calInfo: "400-530 kcal",
    chefInfo: "Smoky BBQ chicken packed with creamy mayo, veggies, and BBQ sauce in a rumali wrap."
  },
  {
    itemName: "Tandoori Rumali Chicken Shawarma",
    price: "129",
    lowpicpath: "/webp/tandori-shawarma (1).webp",
    picPath: "/webp/tandori-shawarma.webp",
    itemRating: "5",
    flavourProfile: {
      spiciness: 4,
      sourness: 2,
      sweetness: 1,
      creaminess: 3,
      crunchiness: 2,
      earthiness: 4,
      umami: 4,
      // calories: 4
    },
    calInfo: "370-480 kcal",
    chefInfo: "Traditional tandoori chicken shawarma with smoky spices and fresh salad in a soft rumali wrap."
  },
  {
    itemName: "Chicken French fries rumali Shawarma",
    price: "99",
    lowpicpath: "/webp/chicken-french-fries-shawarma (1).webp",
    picPath: "/webp/chicken-french-fries-shawarma.webp",
    itemRating: "5",
    flavourProfile: {
      spiciness: 3,
      sourness: 2,
      sweetness: 1,
      creaminess: 4,
      crunchiness: 4,
      earthiness: 2,
    umami: 4,
     // calories: 5
    },
    calInfo: "420-540 kcal",
    chefInfo: "Crispy French fries and seasoned chicken with mayo and salad, wrapped in a rumali roti for the perfect crunch."
  }],
  "Signature Shawarma": [
  {
    itemName: "Chicken 65 Shawarma",
    price: "149",
    lowpicpath: "/webp/chicken-65-shawarma (1).webp",
    picPath: "/webp/chicken-65-shawarma.webp",
    itemRating: "5",
    flavourProfile: {
    spiciness: 5,
    sourness: 3,
    sweetness: 1,
    creaminess: 3,
    crunchiness: 3,
    earthiness: 3,
    umami: 5,
    // calories: 5
  },
  calInfo: "420-550 kcal",
  chefInfo: "Crispy, spicy Chicken 65 chunks wrapped with onion, lettuce, and sauces in a soft rumali roti."
},
  {
  itemName: "Butter Chicken Shawarma",
  price: "149",
  lowpicpath: "/webp/butter-chicken-shawarma (1).webp",
  picPath: "/webp/butter-chicken-shawarma.webp",
  itemRating: "5",
  flavourProfile: {
    spiciness: 2,
    sourness: 1,
    sweetness: 3,
    creaminess: 5,
    crunchiness: 1,
    earthiness: 3,
    umami: 5,
    // calories: 5
  },
  calInfo: "450-580 kcal",
  chefInfo: "Rich and creamy butter chicken with subtle spices and tangy sauce wrapped in a soft rumali base."
},
  {
  itemName: "Zinger Chicken Shawarma",
  price: "149",
  lowpicpath: "/webp/zinger-shawarma (1).webp",
  picPath: "/webp/zinger-shawarma.webp",
  itemRating: "5",
  flavourProfile: {
    spiciness: 4,
    sourness: 2,
    sweetness: 1,
    creaminess: 3,
    crunchiness: 5,
    earthiness: 2,
    umami: 4,
    // calories: 5
  },
  calInfo: "430-560 kcal",
  chefInfo: "Crispy fried chicken zinger patty with mayo, veggies, and tangy sauces in a rumali wrap."
}
,
  {
  itemName: "Chicken Pizza Shawarma",
  price: "149",
  lowpicpath: "/webp/chicken-pizza-shawarma (1).webp",
  picPath: "/webp/chicken-pizza-shawarma.webp",
  itemRating: "5",
  flavourProfile: {
    spiciness: 3,
    sourness: 2,
    sweetness: 2,
    creaminess: 4,
    crunchiness: 2,
    earthiness: 3,
    umami: 5,
    // calories: 5
  },
  calInfo: "470-600 kcal",
  chefInfo: "Fusion shawarma with cheesy pizza toppings, chicken, and signature sauces rolled in rumali roti."
}
,
  {
  itemName: "Deep Fried Chicken Shawarma",
  price: "139",
  lowpicpath: "/webp/deep-fried-shawarma (1).webp",
  picPath: "/webp/deep-fried-shawarma.webp",
  itemRating: "5",
  flavourProfile: {
    spiciness: 3,
    sourness: 2,
    sweetness: 1,
    creaminess: 3,
    crunchiness: 5,
    earthiness: 3,
    umami: 4,
    // calories: 5
  },
  calInfo: "460-590 kcal",
  chefInfo: "Golden fried chicken wrapped with mayo, crunchy veggies, and seasoning in soft rumali bread."
}
,
  {
  itemName: "Chicken Shawarma in Whole Wheat Roti",
  price: "119",
  lowpicpath: "/webp/wheat-roti-shawarma (1).webp",
  picPath: "/webp/wheat-roti-shawarma.webp",
  itemRating: "5",
  flavourProfile: {
    spiciness: 3,
    sourness: 2,
    sweetness: 1,
    creaminess: 3,
    crunchiness: 2,
    earthiness: 4,
    umami: 4,
    // calories: 3
  },
  calInfo: "320-420 kcal",
  chefInfo: "Healthy version of classic chicken shawarma served in a whole wheat roti with fresh veggies and sauce."
}
]
  ,
  "Kababs Shawarma": [
     {
  itemName: "Reshmi Kabab Shawarma",
  price: "149",
  lowpicpath: "/webp/resmi-kabab-shawarma (1).webp",
  picPath: "/webp/resmi-kabab-shawarma.webp",
  itemRating: "5",
  flavourProfile: {
    spiciness: 2,
    sourness: 1,
    sweetness: 2,
    creaminess: 4,
    crunchiness: 2,
    earthiness: 3,
    umami: 4,
    // calories: 4
  },
  calInfo: "400-520 kcal",
  chefInfo: "Juicy and soft reshmi kabab pieces blended with cream-based marinade, wrapped in rumali roti with veggies and mild sauces."
}
,
 {
  itemName: "Chicken Tikka Shawarma",
  price: "149",
  lowpicpath: "/webp/chicken-tikka-shawarma (1).webp",
  picPath: "/webp/chicken-tikka-shawarma.webp",
  itemRating: "5",
  flavourProfile: {
    spiciness: 4,
    sourness: 2,
    sweetness: 1,
    creaminess: 3,
    crunchiness: 3,
    earthiness: 3,
    umami: 5,
    // calories: 5
  },
  calInfo: "430-560 kcal",
  chefInfo: "Boldly marinated chicken tikka chunks roasted to perfection and wrapped with fresh veggies, mayo, and tikka sauces in a rumali base."
}
,
 {
  itemName: "Malai Kebab Shawarma",
  price: "149",
  lowpicpath: "/webp/malai-shawarma (1).webp",
  picPath: "/webp/malai-shawarma.webp",
  itemRating: "5",
  flavourProfile: {
    spiciness: 1,
    sourness: 1,
    sweetness: 2,
    creaminess: 5,
    crunchiness: 2,
    earthiness: 3,
    umami: 4,
    // calories: 4
  },
  calInfo: "410-530 kcal",
  chefInfo: "Delicately spiced creamy malai kebab pieces wrapped in soft rumali roti with fresh veggies and rich, smooth sauces."
}
 ],
  "Mojitos": [
    {
      itemName: "Lemon and Mint Mojito",
      price: "79",
      lowpicpath: "/webp/lemon-mint-mojito (1).webp",
      picPath: "/webp/lemon-mint-mojito.webp",
      itemRating: "4.5",
      flavourProfile: {
        sweetness: 3,       // Mild sweetness from sugar or syrup
        sourness: 5,        // Sharp citrus kick from fresh lemon
        freshness: 5,       // Dominant mint and soda crispness
        fruitiness: 3,      // Mild fruitiness from lemon
        fizz: 3,            // Light carbonation from soda
        juiciness: 4,       // Juicy from lemon juice
        bitterness: 1,      // Slight bitterness from lemon peel or zest
        spiciness: 0,       // No spice
        creaminess: 0,      // No creamy content
        // calories: 2         // Light and refreshing, low in calories
      },
      calInfo: "80–120 kcal",
      chefInfo: "A classic cooler made with freshly squeezed lemon juice, muddled mint leaves, sugar, and soda. "
    }

    ,
    {
      itemName: "Orange Mojito",
      price: "79",
      lowpicpath: "/webp/orange-mojito (1).webp",
      picPath: "/webp/orange-mojito.webp",
      itemRating: "4.5",
      flavourProfile: {
        sweetness: 4,       // Natural and syrupy sweetness from oranges
        sourness: 3,        // Citrusy tang from orange and lime
        freshness: 5,       // Mint and soda create a crisp, refreshing base
        fruitiness: 5,      // Strong orange-forward profile
        fizz: 3,            // Light effervescence from soda
        juiciness: 4,       // Fresh orange segments or juice adds juiciness
        bitterness: 1,      // Slight bitterness from orange zest or rind
        spiciness: 0,       // No spices
        creaminess: 0,      // No creamy elements
        // calories: 2         // Light and refreshing, low calorie
      },
      calInfo: "110–150 kcal",
      chefInfo: "A zesty citrus cooler made with fresh orange juice, lime, mint leaves, and sparkling soda. "
    }

    ,
    {
      itemName: "Straw Berry Mojito",
      price: "79",
      lowpicpath: "/webp/straw-berry-mojito (1).webp",
      picPath: "/webp/straw-berry-mojito.webp",
      itemRating: "4.5",
      flavourProfile: {
        sweetness: 4,       // Natural and syrupy strawberry sweetness
        sourness: 3,        // From lime juice or lemon zest
        freshness: 5,       // Enhanced by mint and soda
        fruitiness: 5,      // Dominant strawberry flavor
        fizz: 3,            // From soda or carbonated base
        juiciness: 4,       // Muddled strawberries give a juicy texture
        spiciness: 0,       // No spice involved
        creaminess: 0,      // No cream or dairy used
        bitterness: 1,      // Slight, from mint or citrus rind
        // calories: 2         // Fairly low, mostly fruit and soda
      },
      calInfo: "100–140 kcal",
      chefInfo: "A sweet and tangy delight made with muddled strawberries, fresh mint leaves, lime wedges, and sparkling soda."
    }
    ,
    {
      itemName: "Water Melon Mojito",
      price: "79",
      lowpicpath: "/webp/water-melon-mojito (1).webp",
      picPath: "/webp/water-melon-mojito.webp",
      itemRating: "4.5",
      flavourProfile: {
        sweetness: 4,       // Natural sweetness from fresh watermelon
        sourness: 3,        // Mild tang from lime juice
        freshness: 5,       // Mint and chilled soda give high freshness
        fruitiness: 5,      // Dominated by juicy watermelon flavor
        fizz: 3,            // Sparkling soda or carbonated water
        juiciness: 5,       // High due to watermelon base
        spiciness: 0,       // No spice involved
        creaminess: 0,      // No creamy components
        bitterness: 1,      // Slight from mint or lime peel
        // calories: 2         // Relatively low-calorie, mostly fruit and soda
      },
      calInfo: "90–130 kcal",
      chefInfo: "A refreshing summer cooler made with fresh watermelon juice, muddled mint leaves, lime wedges, and sparkling soda."}
    ,
    {
      itemName: "Black Currant Mojito",
      price: "79",
      lowpicpath: "/webp/black-currant-mojito (1).webp",
      picPath: "/webp/black-currant-mojito.webp",
      itemRating: "4.5",
      flavourProfile: {
        sweetness: 4,        // Sweetness from black currant syrup
        sourness: 4,         // Tang from lime juice and black currant
        freshness: 5,        // Mint and chilled soda bring a refreshing feel
        fruitiness: 5,       // Strong fruity profile from black currant
        fizz: 4,             // Sparkling soda gives a bubbly texture
        tartness: 3,         // Distinct tart edge from the black currant
        spiciness: 0,        // No spice
        creaminess: 0,       // No creamy elements
        bitterness: 1,       // Barely noticeable, may come from lime peel
        // calories: 3          // Moderate sugar from syrup
      },
      calInfo: "140–200 kcal",
      chefInfo: "A vibrant, refreshing mocktail made with the bold flavor of black currant syrup, crushed mint leaves, zesty lime, and sparkling soda."
    }
    , {
      itemName: "ButterScotch Mojito",
      price: "79",
      lowpicpath: "/webp/butterscotch-mojito (1).webp",
      picPath: "/webp/butterscotch-mojito.webp",
      itemRating: "4.5",
      flavourProfile: {
        sweetness: 5,        // Strong butterscotch syrup and sugar
        sourness: 4,         // Zesty lime juice gives a nice tang
        freshness: 5,        // Crisp mint and ice-cold soda create a refreshing feel
        fizz: 4,             // Carbonated soda adds a fizzy lift
        spiciness: 0,        // No spice
        creaminess: 0,       // No dairy or creamy element
        bitterness: 1,       // Slight from lime rind or mint leaves
        // calories: 3          // Moderate calorie level due to syrup and sugar
      },
      calInfo: "150-220 kcal",
      chefInfo: "A chilled mocktail that marries the coolness of mint with the tang of lime and the rich, buttery sweetness of butterscotch syrup."
    }

  ]

};



export default navItems