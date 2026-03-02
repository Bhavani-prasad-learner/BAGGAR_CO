'use client'
import React, { useState, useRef } from 'react'
import styles from './style.module.scss';
import { motion } from 'framer-motion';
import { menuSlide } from '../anim'
import navItems from './NavData';
import MemeCard from '../MemeCard';
import Curve from './Curve';
import { BsSliders2 } from "react-icons/bs";
import { GoSearch } from "react-icons/go";



export default function SearchWindow() {

    const [query, setQuery] = useState('');
    const inputRef = useRef(null);
    const allMenuItems = Object.entries(navItems).flatMap(
        ([category, items]) =>
            items.map(item => ({
                ...item,
                category, // 👈 add category to each item
            }))
    );

    const filteredItems = allMenuItems.filter(item => {
        const q = query.toLowerCase().trim();

        return (
            item.itemName.toLowerCase().includes(q) ||
            item.category.toLowerCase().includes(q)
        );
    });


    const scrollContainerRef = useRef(null);


    const closeMenu = () => {

    }

    return (
        <motion.div variants={menuSlide} initial="initial" animate="enter" exit="exit" className={styles.menu}
        onAnimationComplete={()=>{
            inputRef.current?.focus();
        }}
        >
            <div className={styles.body} >
                <div className={styles.nav} ref={scrollContainerRef}>
                    {/* <div className='mb-8'>

          </div> */}
                    <div className="mt-12 flex flex-row items-center gap-1 justify-center ">
                        <div className="w-[95%] relative flex items-center gap-2 text-black bg-[#2E2E2E] pl-8 h-10 rounded-lg">
                            <input
                                value={query}
                                ref={inputRef}
                                onChange={(e) => setQuery(e.target.value)}
                                className="flex-1 h-full text-sm text-gray-400 bg-[#2E2E2E] px-2 outline-none rounded-lg"
                                type="text"
                                placeholder="What do you want to order?"
                            />


                            <GoSearch className="absolute z-50 top-2 left-2 text-gray-400" size={20} />
                        </div>
                        <div className="bg-[#FFA500]/20  px-2 py-2 rounded-lg">
                            <BsSliders2 className="text-[#FFA500]" size={24} />
                        </div>
                    </div>
                    {query && (
                        <div className="mt-2 space-y-2">
                            {filteredItems.length === 0 ? (
                                <p className="text-sm text-gray-4   00 text-center">
                                    No items found
                                </p>
                            ): <p className="text-sm text-gray-400 pl-4">
                                  Search Results: {filteredItems.length} {filteredItems.length==1?"item":"items"} found
                                </p>
                            }

                            {filteredItems.map((data, index) => (
                                <motion.div
                                    key={`${data.itemName}-${index}`}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3 }}
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
                            ))}
                        </div>
                    )}

                </div>
            </div>
            <Curve />
        </motion.div>
    )
}