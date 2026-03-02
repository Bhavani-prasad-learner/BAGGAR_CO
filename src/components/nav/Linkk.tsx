'use client'
import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { slide, scale } from '../anim' // animation variants imported externally

/**
 * Linkk Component
 * ----------------
 * Displays a single navigational link with an animated indicator circle.
 * - `data` → object with { title, href, index }
 * - `isActive` → boolean, whether this link is currently active
 * - `setSelectedIndicator` → function to update which link is hovered
 */

export default function Linkk({ data, isActive, setSelectedIndicator }) {
  const { title, href, index } = data

  return (
    /**
     * The outer motion.div acts as the clickable link wrapper.
     * Tailwind CSS equivalents for the .link SCSS class:
     * 
     * position: relative → relative
     * display: flex → flex
     * align-items: center → items-center
     * z-index: 1 → z-[1]
     */
    <motion.div
      className="relative flex items-center z-[1]"
      onMouseEnter={() => setSelectedIndicator(href)}
      custom={index}
      variants={slide}
      initial="initial"
      animate="enter"
      exit="exit"
    >
      {/**
       * Animated indicator circle:
       * 
       * width/height: 10px → w-[10px] h-[10px]
       * background-color: white → bg-white
       * border-radius: 50% → rounded-full
       * position: absolute → absolute
       * left: -30px → left-[-30px]
       * 
       * `variants={scale}` controls its scaling animation.
       * It appears when the link is active (`isActive ? "open" : "closed"`).
       */}
      <motion.div
        variants={scale}
        animate={isActive ? 'open' : 'closed'}
        className="absolute left-[-30px] w-[10px] h-[10px] bg-white rounded-full"
      />

      {/**
       * The actual text link.
       * Uses Next.js Link for client-side routing.
       */}
      <Link href={href}>{title}</Link>
    </motion.div>
  )
}
