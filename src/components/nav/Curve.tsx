'use client'

import { motion } from 'framer-motion'

export default function Curve() {

  /**
   * Define the initial and target SVG path shapes.
   * These paths create a smooth curved edge animation.
   * 
   * `M` = move to starting point,
   * `L` = draw line,
   * `Q` = draw quadratic Bézier curve.
   * 
   * We're dynamically using the current viewport's width/height
   * to make the curve responsive to screen size.
   */

  const initialPath = `M0 ${globalThis.innerHeight} 
                     L${globalThis.innerWidth} ${globalThis.innerHeight} 
                     Q${globalThis.innerWidth / 2} ${globalThis.innerHeight - 200} 
                     0 ${globalThis.innerHeight}`

  const targetPath = `M0 ${globalThis.innerHeight} 
                     L${globalThis.innerWidth} ${globalThis.innerHeight} 
                     Q${globalThis.innerWidth / 2} ${globalThis.innerHeight - 200} 
                     0 ${globalThis.innerHeight}`

  /**
   * Framer Motion animation variants.
   * - `initial`: sets the starting shape of the path.
   * - `enter`: animates into the target shape.
   * - `exit`: animates back to the initial shape (on unmount).
   * 
   * The `transition` uses a smooth cubic-bezier curve for natural motion.
   */
  const curve = {
    initial: { d: initialPath },
    enter: {
      d: targetPath,
      transition: { duration: 5, ease: [0.76, 0, 0.24, 1] }
    },
    exit: {
      d: initialPath,
      transition: { duration: 5, ease: [0.76, 0, 0.24, 1] }
    }
  }

  /**
   * Render an SVG that contains a motion path (from Framer Motion)
   * The path animates between `initial`, `enter`, and `exit` shapes.
   * 
   * The Tailwind classes below replace your SCSS file:
   * - absolute positioning
   * - top: 0, left: -99px
   * - width: 100px
   * - height: full viewport height
   * - white fill (background)
   * - no stroke
   */
  return (
    <svg
      className="absolute top-0 left-[-99px] w-[100px] h-full fill-white stroke-none"
    >
      <motion.path
        variants={curve}
        initial="initial"
        animate="enter"
        exit="exit"
      />
    </svg>
  )
}
