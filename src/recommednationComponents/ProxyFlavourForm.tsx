import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
// import { flavourQuestions } from "./flavourQuestions";
import { useSetFlavourProfile } from "@/hooks/useSetFlavourProfile";

export default function ProxyFlavourForm({ setUserProfile }) {
  const [step, setStep] = useState(0);
  const [profile, setProfile] = useState(emptyFlavourProfile);
  const [answers, setAnswers] = useState({});
  const [completed, setCompleted] = useState(false);

  const current = flavourQuestions[step];

  const handleOptionSelect = (effects) => {
    setAnswers(prev => ({
      ...prev,
      [step]: effects
    }));
  };

  const handleNext = () => {
    const effects = answers[step];
    if (!effects) return;

    setProfile(prev => applyEffects(prev, effects, 1));

    if (step === flavourQuestions.length - 1) {
      handleFinish();
    } else {
      setStep(step + 1);
    }
  };

  const handlePrev = () => {
    if (step === 0) return;

    const effects = answers[step - 1];
    if (effects) {
      setProfile(prev => applyEffects(prev, effects, -1));
    }

    setStep(step - 1);
  };

  const handleFinish = async () => {
    setCompleted(true);
    await setUserProfile(profile);
  };

  return (
    <div className="h-[fit-content] flex flex-col items-center justify-center px-4">



      <AnimatePresence mode="wait">
        <motion.div className="h-[fit-content]">
          <div className="w-full max-w-md mb-4 h-1 bg-gray-200 rounded">
            <div
              className="h-full bg-lime-500 transition-all rounded"
              style={{ width: `${((step + 1) / flavourQuestions.length) * 100}%` }}
            />
          </div>
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.4 }}
            className="w-[90vw] max-w-md "
          >
            <h2 className="text-lg font-semibold mb-6">
              {current.question}
            </h2>

            <div className="grid grid-cols-1 gap-4 mb-6">
              {current.options.map((opt, i) => {
                const selected = answers[step] === opt.effects;

                return (
                  <button
                    key={i}
                    onClick={() => handleOptionSelect(opt.effects)}
                    className={`flex items-center gap-4 p-4 rounded-xl transition
                    ${selected ? " border border-orange-400 text-white" : "bg-[#2E2E2E]"}
                  `}
                  >
                    <span className="text-2xl">{opt.emoji}</span>
                    <span className="text-sm font-medium">{opt.label}</span>
                  </button>
                );
              })}
            </div>

            {/* NAV BUTTONS */}

          </motion.div>
          <div className="flex justify-center gap-2">
            <button
              onClick={handlePrev}
              disabled={step === 0}
              className="px-4 py-2 rounded-lg bg-[#2E2E2E] text-white disabled:opacity-30"
            >
              Back
            </button>

            <button
              onClick={handleNext}
              disabled={!answers[step]}
              className="px-6 py-2 rounded-lg bg-[#2E2E2E] text-white disabled:opacity-40"
            >
              {step === flavourQuestions.length - 1 ? "Finish" : "Next"}
            </button>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}



function applyEffects(profile, effects) {
  const updated = { ...profile };
  Object.keys(effects).forEach(key => {
    updated[key] = (updated[key] || 0) + effects[key];
  });
  return updated;
}

const emptyFlavourProfile = {
  bitterness: 0,
  calories: 0,
  creaminess: 0,
  crunchiness: 0,
  earthiness: 0,
  freshness: 0,
  fruitiness: 0,
  sourness: 0,
  spiciness: 0,
  sweetness: 0,
  umami: 0
};

// const flavourQuestions = [
//   // 1️⃣ FOOD IDENTITY (strongest signal)
//   {
//     id: "food_identity",
//     question: "Which food do you usually crave the most?",
//     options: [
//       {
//         label: "Chicken Biryani",
//         emoji: "🍗",
//         effects: {
//           spiciness: 3,
//           umami: 3,
//           calories: 2,
//           earthiness: 1
//         }
//       },
//       {
//         label: "Paneer Butter Masala",
//         emoji: "🧈",
//         effects: {
//           creaminess: 3,
//           umami: 2,
//           sweetness: 1,
//           calories: 2
//         }
//       },
//       {
//         label: "Cheesy Pizza",
//         emoji: "🍕",
//         effects: {
//           creaminess: 3,
//           calories: 3,
//           umami: 2
//         }
//       },
//       {
//         label: "Fresh Salad Bowl",
//         emoji: "🥗",
//         effects: {
//           freshness: 3,
//           crunchiness: 2,
//           bitterness: 1
//         }
//       }
//     ]
//   },

//   // 2️⃣ SPICE COMFORT
//   {
//     id: "spice_level",
//     question: "How do you feel about spicy food?",
//     options: [
//       {
//         label: "Love spicy food",
//         emoji: "🌶️",
//         effects: {
//           spiciness: 3,
//           umami: 1
//         }
//       },
//       {
//         label: "Medium is good",
//         emoji: "🙂",
//         effects: {
//           spiciness: 2
//         }
//       },
//       {
//         label: "Prefer mild food",
//         emoji: "😌",
//         effects: {
//           sweetness: 1,
//           creaminess: 1
//         }
//       }
//     ]
//   },

//   // 3️⃣ SWEET VS SAVOURY
//   {
//     id: "sweet_vs_savoury",
//     question: "Which side do you enjoy more?",
//     options: [
//       {
//         label: "Sweet & indulgent",
//         emoji: "🍰",
//         effects: {
//           sweetness: 3,
//           creaminess: 1,
//           calories: 2
//         }
//       },
//       {
//         label: "Savoury & filling",
//         emoji: "🍛",
//         effects: {
//           umami: 3,
//           spiciness: 1,
//           calories: 1
//         }
//       }
//     ]
//   },

//   // 4️⃣ TEXTURE PREFERENCE
//   {
//     id: "texture_preference",
//     question: "Which texture do you enjoy more?",
//     options: [
//       {
//         label: "Crispy & crunchy",
//         emoji: "🍟",
//         effects: {
//           crunchiness: 3,
//           calories: 1
//         }
//       },
//       {
//         label: "Soft & creamy",
//         emoji: "🧁",
//         effects: {
//           creaminess: 3,
//           calories: 1
//         }
//       }
//     ]
//   },

//   // 5️⃣ DRINK CHOICE (very powerful proxy)
//   {
//     id: "drink_choice",
//     question: "Pick a drink you enjoy the most",
//     options: [
//       {
//         label: "Coffee",
//         emoji: "☕",
//         effects: {
//           bitterness: 3,
//           earthiness: 2
//         }
//       },
//       {
//         label: "Fruit Juice",
//         emoji: "🍹",
//         effects: {
//           fruitiness: 3,
//           sweetness: 2,
//           freshness: 1
//         }
//       },
//       {
//         label: "Soft Drink",
//         emoji: "🥤",
//         effects: {
//           sweetness: 3,
//           calories: 2
//         }
//       },
//       {
//         label: "Water",
//         emoji: "🚿",
//         effects: {
//           freshness: 2
//         }
//       }
//     ]
//   },

//   // 6️⃣ SOUR / TANGY TOLERANCE
//   {
//     id: "sour_tolerance",
//     question: "How do you feel about tangy flavours?",
//     options: [
//       {
//         label: "Love tangy food",
//         emoji: "🍋",
//         effects: {
//           sourness: 3,
//           freshness: 1
//         }
//       },
//       {
//         label: "Sometimes okay",
//         emoji: "🙂",
//         effects: {
//           sourness: 2
//         }
//       },
//       {
//         label: "Prefer non-tangy food",
//         emoji: "😌",
//         effects: {
//           sweetness: 1,
//           creaminess: 1
//         }
//       }
//     ]
//   },

//   // 7️⃣ EARTHY VS FRESH
//   {
//     id: "earthy_vs_fresh",
//     question: "Which flavours attract you more?",
//     options: [
//       {
//         label: "Mushrooms, millets",
//         emoji: "🍄",
//         effects: {
//           earthiness: 3,
//           umami: 1
//         }
//       },
//       {
//         label: "Greens & herbs",
//         emoji: "🌿",
//         effects: {
//           freshness: 3,
//           bitterness: 1
//         }
//       }
//     ]
//   },

//   // 8️⃣ HEALTH VS INDULGENCE (calories signal)
//   {
//     id: "health_vs_indulgence",
//     question: "When eating out, you usually choose…",
//     options: [
//       {
//         label: "Light & healthy",
//         emoji: "🥗",
//         effects: {
//           freshness: 2,
//           calories: 1
//         }
//       },
//       {
//         label: "Rich & indulgent",
//         emoji: "🍔",
//         effects: {
//           calories: 3,
//           creaminess: 1,
//           umami: 1
//         }
//       }
//     ]
//   }
// ];

const flavourQuestions = [

  // 🌶️ spiciness
  {
    id: "spiciness_level",
    question: "How spicy do you like your food?",
    options: [
      { label: "No spice", emoji: "🥛", effects: { spiciness: 1 } },
      { label: "Mild", emoji: "🙂", effects: { spiciness: 2 } },
      { label: "Medium", emoji: "🌶️", effects: { spiciness: 3 } },
      { label: "Spicy", emoji: "🔥", effects: { spiciness: 4 } },
      { label: "Very spicy", emoji: "🌋", effects: { spiciness: 5 } }
    ]
  },

  // 🍬 sweetness
  {
    id: "sweetness_level",
    question: "How sweet do you like your food?",
    options: [
      { label: "Not sweet", emoji: "🚫🍬", effects: { sweetness: 1 } },
      { label: "Slightly sweet", emoji: "🙂", effects: { sweetness: 2 } },
      { label: "Balanced", emoji: "⚖️", effects: { sweetness: 3 } },
      { label: "Sweet", emoji: "🍯", effects: { sweetness: 4 } },
      { label: "Very sweet", emoji: "🍰", effects: { sweetness: 5 } }
    ]
  },

  // 🥛 creaminess
  {
    id: "creaminess_level",
    question: "How creamy do you like your food?",
    options: [
      { label: "Not creamy", emoji: "🚫🥛", effects: { creaminess: 1 } },
      { label: "Slightly creamy", emoji: "🙂", effects: { creaminess: 2 } },
      { label: "Balanced", emoji: "⚖️", effects: { creaminess: 3 } },
      { label: "Creamy", emoji: "🧈", effects: { creaminess: 4 } },
      { label: "Very creamy", emoji: "🥛", effects: { creaminess: 5 } }
    ]
  },

  // 🍟 crunchiness
  {
    id: "crunchiness_level",
    question: "How much crunchy texture do you enjoy?",
    options: [
      { label: "Soft only", emoji: "🍞", effects: { crunchiness: 1 } },
      { label: "Little crunch", emoji: "🙂", effects: { crunchiness: 2 } },
      { label: "Balanced", emoji: "⚖️", effects: { crunchiness: 3 } },
      { label: "Crunchy", emoji: "🍟", effects: { crunchiness: 4 } },
      { label: "Very crunchy", emoji: "🔥🍟", effects: { crunchiness: 5 } }
    ]
  },

  // 🍋 sourness
  {
    id: "sourness_level",
    question: "How much tangy/sour flavour do you enjoy?",
    options: [
      { label: "Not at all", emoji: "🚫🍋", effects: { sourness: 1 } },
      { label: "Very little", emoji: "🙂", effects: { sourness: 2 } },
      { label: "Balanced", emoji: "⚖️", effects: { sourness: 3 } },
      { label: "Quite tangy", emoji: "🍋", effects: { sourness: 4 } },
      { label: "Love very tangy", emoji: "🤤🍋", effects: { sourness: 5 } }
    ]
  },

  // 🍄 earthiness
  {
    id: "earthiness_level",
    question: "How much earthy flavour do you enjoy?",
    options: [
      { label: "Not at all", emoji: "🚫🍄", effects: { earthiness: 1 } },
      { label: "Very little", emoji: "🙂", effects: { earthiness: 2 } },
      { label: "Neutral", emoji: "⚖️", effects: { earthiness: 3 } },
      { label: "Like earthy foods", emoji: "🍄", effects: { earthiness: 4 } },
      { label: "Love earthy flavours", emoji: "🌲", effects: { earthiness: 5 } }
    ]
  },

  // 🌿 freshness
  {
    id: "freshness_level",
    question: "How much fresh/light food do you prefer?",
    options: [
      { label: "Rarely", emoji: "🍔", effects: { freshness: 1 } },
      { label: "Sometimes", emoji: "🙂", effects: { freshness: 2 } },
      { label: "Balanced", emoji: "⚖️", effects: { freshness: 3 } },
      { label: "Prefer fresh", emoji: "🥗", effects: { freshness: 4 } },
      { label: "Always fresh & light", emoji: "🌿", effects: { freshness: 5 } }
    ]
  },

  // 🍓 fruitiness
  {
    id: "fruitiness_level",
    question: "How much fruity flavour do you like?",
    options: [
      { label: "Not fruity", emoji: "🚫🍓", effects: { fruitiness: 1 } },
      { label: "Slightly fruity", emoji: "🙂", effects: { fruitiness: 2 } },
      { label: "Balanced", emoji: "⚖️", effects: { fruitiness: 3 } },
      { label: "Quite fruity", emoji: "🍓", effects: { fruitiness: 4 } },
      { label: "Very fruity", emoji: "🍍", effects: { fruitiness: 5 } }
    ]
  },

  // ☕ bitterness
  {
    id: "bitterness_level",
    question: "How comfortable are you with bitter flavours?",
    options: [
      { label: "Avoid completely", emoji: "🚫☕", effects: { bitterness: 1 } },
      { label: "Very little", emoji: "🙂", effects: { bitterness: 2 } },
      { label: "Neutral", emoji: "⚖️", effects: { bitterness: 3 } },
      { label: "Like it", emoji: "☕", effects: { bitterness: 4 } },
      { label: "Love bitter foods", emoji: "💪☕", effects: { bitterness: 5 } }
    ]
  },

  // 🍜 umami
  {
    id: "umami_level",
    question: "How savoury and rich do you like your food?",
    options: [
      { label: "Very light", emoji: "🥗", effects: { umami: 1 } },
      { label: "Light", emoji: "🙂", effects: { umami: 2 } },
      { label: "Balanced", emoji: "⚖️", effects: { umami: 3 } },
      { label: "Rich", emoji: "🍜", effects: { umami: 4 } },
      { label: "Very rich & savoury", emoji: "🤤🍖", effects: { umami: 5 } }
    ]
  },

  // 🍔 calories / HEAVINESS
  {
    id: "calorie_preference",
    question: "How heavy or rich do you prefer your meals?",
    options: [
      { label: "Very light meals", emoji: "🥗", effects: { calories: 1 } },
      { label: "Mostly light", emoji: "🙂", effects: { calories: 2 } },
      { label: "Balanced", emoji: "⚖️", effects: { calories: 3 } },
      { label: "Rich & filling", emoji: "🍛", effects: { calories: 4 } },
      { label: "Very indulgent", emoji: "🍔", effects: { calories: 5 } }
    ]
  }

];
