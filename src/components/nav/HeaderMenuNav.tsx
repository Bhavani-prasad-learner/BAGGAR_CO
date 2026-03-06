'use client'
import React, { useState, useRef, useEffect } from 'react'
import styles from './style.module.scss';
import { motion } from 'framer-motion';
import { menuSlide } from '../anim'
import navItems from './NavData';
import MemeCard from '../MemeCard';
import Curve from './Curve';
import { useLocation } from 'react-router-dom';




export default function HeaderMenuNav() {

  const pathname = useLocation().pathname;

  const scrollContainerRef = useRef(null);
  const anchorItems = { "Home": "/", 
    "About us":"/about",
    "Contact": "/contact", 
    // "Flavour Profiles": "/flavour-profile", 
  }

 

  return (
    <motion.div variants={menuSlide} initial="initial" animate="enter" exit="exit" className={`${styles.menu} bg-[#bec094]`} style={{ textAlign: "left"}}>
      <div className={styles.body} >
        <div className={styles.nav} ref={scrollContainerRef}>
          <div className='mt-20 flex flex-col gap-4 px-4'>
            <span className='text-2xl font-cinzel'> NAVIGATION</span>
            <span className='border w-full border-gray-500'></span>
          </div>
          <div className="w-full h-[50vh] font-lora flex flex-col justify-center pl-4 gap-4">
            {Object.entries(anchorItems).map(([item, key]) => (
              <a key={key} href={key} className="text-lg">
                <span
                  className={`${pathname === key ? 'text-[#A95700]' : 'text-gray-700'
                    } text-5xl tracking-thinner`}
                >
                  {item}
                </span>
              </a>
            ))}

          </div>


        </div>

      </div>
      <Curve />
    </motion.div>
  )
}