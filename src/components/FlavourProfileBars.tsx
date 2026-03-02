import { motion } from 'framer-motion';

// Utility to get bar color based on score
const getColor = (score) => {
  if (score >= 4) return '#ef4444';   // bg-red-500
  if (score === 3) return '#f59e0b';  // bg-yellow-500
  if (score === 2) return '#22c55e';  // bg-green-500
  return '#9ca3af';                // Low or default
};

const FlavourProfileBars = ({ profile, chefInfo, calInfo }) => {
  return (
    <motion.div
      key="flavour-profile"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.4, ease: 'easeInOut' }}
      className="p-5 mb-10 border border-gray-700 rounded-2xl text-white"
    >
      <div className='flex justify-between'>
        <h2 className="text-lg md:text-xl mb-4 font-bold">Flavour Profile</h2>
        <span className='mt-1.5 text-sm md:text-lg text-gray-500'>{calInfo}</span>
      </div>

      <div className="space-y-4">
        {Object.entries(profile).map(([key, value]) => (
          <div key={key}>
            <div className="flex justify-between mb-1 font-semibold text-sm md:text-lg text-white capitalize">
              <span>{key}</span>
              <div className='flex flex-row gap-2'>
                <label className={`block mb-2 font-semibold tracking-wider font-bold`} style={{ color: getColor(value) }} >
                  {(() => {
                    const labels = {
                      earthiness: [
                        "not earthy",
                        "least earthy",
                        "slightly earthy",
                        "moderately earthy",
                        "very earthy",
                        "most earthy"
                      ]
                      ,
                      sweetness: [
                        "not sweet",
                        "least sweet",
                        "average sweet",
                        "normally sweet",
                        "very sweet",
                        "sweetest"
                      ],
                      spiciness: [
                        "not spicy",
                        "least spicy",
                        "mildly spicy",
                        "just spicy",
                        "more spicy",
                        "extremely spicy"
                      ],
                      sourness: [
                        "not sour",
                        "least sour",
                        "slightly sour",
                        "normal sour",
                        "more sour",
                        "very sour"
                      ],
                      creaminess: [
                        "not creamy",
                        "least creamy",
                        "lightly creamy",
                        "normal creamy",
                        "more creamy",
                        "very creamy"
                      ],
                      crunchiness: [
                        "not crunchy",
                        "least crunchy",
                        "slightly crunchy",
                        "normal crunchy",
                        "more crunchy",
                        "super crunchy"
                      ],
                      umami: [
                        "not umami",
                        "least umami",
                        "light umami",
                        "normal umami",
                        "richer umami",
                        "strong umami"
                      ],
                      freshness: [
                        "not fresh",
                        "least fresh",
                        "somewhat fresh",
                        "just fresh",
                        "more fresh",
                        "super fresh"
                      ],
                      fizz: [
                        "no fizz",
                        "barely fizzy",
                        "slightly fizzy",
                        "moderately fizzy",
                        "very fizzy",
                        "extremely fizzy"
                      ],
                      fruitiness: [
                        "not fruity",
                        "least fruity",
                        "slightly fruity",
                        "normal fruity",
                        "more fruity",
                        "very fruity"
                      ],
                      tartness: [
                        "not tart",
                        "barely tart",
                        "slightly tart",
                        "moderately tart",
                        "very tart",
                        "extremely tart"
                      ],
                      bitterness: [
                        "not bitter",
                        "some what bitter",
                        "mildly bitter",
                        "normal bitter",
                        "more bitter",
                        "very bitter"
                      ],
                      calories: [
                        "zero cal",
                        "low cal",
                        "below average cal",
                        "moderate cal",
                        "high cal",
                        "very high cal"
                      ],
                      juiciness: [
                        "dry",
                        "barely juicy",
                        "slightly juicy",
                        "moderately juicy",
                        "very juicy",
                        "extremely juicy"
                      ]
                    };
                    return (labels[key][value] ? labels[key][value] : null);
                  })()}
                </label>
                <span>{value}/5</span>

              </div>
            </div>
            <div className="w-full h-1 bg-gray-800 rounded-full overflow-hidden">
              <motion.div
                initial={{ opacity: 0, x: 80, scaleX: 0 }}
                whileInView={{ opacity: 1, x: 0, scaleX: 1 }}
                exit={{ x: -10, scaleX: 0 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                viewport={{ once: true, amount: 0.7 }}
                className="h-full"
                style={{ width: `${(value / 5) * 100}%`, backgroundColor: getColor(value) }}
              ></motion.div>
            </div>
          </div>
        ))}
      </div>
      {chefInfo && (<div className='flex flex-col gap-2 mt-5 text-sm md:text-xl text-black'>

     
        <span className=' text-sm md:text-xl text-gray-400'>{chefInfo}</span>

      </div>
      )}


    </motion.div>
  );
};

export default FlavourProfileBars;
