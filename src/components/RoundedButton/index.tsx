import React from 'react'
import { useEffect, useRef } from 'react';
import styles from './style.module.scss';

import { motion, AnimatePresence } from "framer-motion";

export default function index({children, backgroundColor="#455CE9", ...attributes}) {



  return (
      <div className={styles.roundedButton} style={{overflow: "hidden"}}  {...attributes}>
          {
            children
          }
      </div>

  )
}
