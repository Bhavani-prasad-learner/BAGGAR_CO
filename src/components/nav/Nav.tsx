'use client'
import React,{  useState, useRef } from 'react'
import styles from './style.module.scss';
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { menuSlide } from '../anim'
import navItems from './NavData';
import MemeCard from '../MemeCard';
import Curve from './Curve';




export default function Nav({ selectedItem }) {

  const pathname = usePathname();
  const [selectedIndicator, setSelectedIndicator] = useState(pathname);
const scrollContainerRef = useRef(null);
const closeMenu = () =>{

}

  return (
    <motion.div variants={menuSlide} initial="initial" animate="enter" exit="exit" className={styles.menu}>
      <div className={styles.body} >
        <div onMouseLeave={() => { setSelectedIndicator(pathname) }} className={styles.nav} ref={scrollContainerRef}>
          <div className='mb-8'>

          </div>
        
          {
            navItems[selectedItem]?.map((data, index) => (
              <motion.div
                key={`${data.itemName}-${index}`} // ✅ Unique key for each item
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.3, delay: 0.1, type: 'spring', stiffness: 80,
                  damping: 30,
                  bounce: 0.6, ease: 'easeOut',
                }}
                viewport={{ once: true, amount: 0.1 }}
              >
                <MemeCard
                scrollContainerRef={scrollContainerRef}
                  calInfo={data.calInfo}
                  chefInfo={data.chefInfo}
                  itemName={data.itemName}
                  price={data.price}
                  lowpicPath={data.lowpicpath}
                  HighpicPath={data.picPath}
                  itemRating={data.itemRating}
                  flavourProfile={data.flavourProfile}
                  closeMenu={closeMenu}
                />
              </motion.div>
            ))
          }
        </div>
        {/* <div className="relative pb-4 ">
          <motion.div
            className="absolute left-0 bottom-0 h-[4px] bg-[rgb(255,89,0)] origin-center"
            exit={{ scaleX: 0 }}
            transition={{ duration: 1.3, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.7 }}
            style={{ width: "100%" }}
          />
        </div>
        <div className="relative pb-3 ">
          <motion.div
            className="absolute left-0 bottom-0 h-[4px] bg-orange-500 origin-center"
            exit={{ scaleX: 0 }}
            transition={{ duration: 1.3, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.7 }}
            style={{ width: "100%" }}
          />
        </div> */}
      </div>
      <Curve />
    </motion.div>
  )
}