'use client';
import styles from './style.module.scss';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { opacity, slideUp } from './anim';

const words = ["Welcome", "స్వాగతం", "स्वागत", "Welcome", "స్వాగతం", "स्वागत", "Welcome", "स्वागत"];

export default function Preloader() {
    const [index, setIndex] = useState(0);
    const [dimension, setDimension] = useState({ width: 0, height: 0 });
    const vh = (v) => (dimension.height * v) / 100;

    useEffect(() => {
        const updateDimension = () => {
            setDimension({ width: window.innerWidth, height: window.innerHeight });
        };
        updateDimension();
        window.addEventListener('resize', updateDimension);
        return () => window.removeEventListener('resize', updateDimension);
    }, []);

    useEffect(() => {
        if (index === words.length - 1) return;
        const timeout = setTimeout(() => {
            setIndex(prev => prev + 1);
        }, index === 0 ? 1000 : 150);
        return () => clearTimeout(timeout);
    }, [index]);

    const initialPath = `M0 0 L${dimension.width} 0 L${dimension.width} ${dimension.height} Q${dimension.width / 2} ${dimension.height + 300} 0 ${dimension.height}  L0 0`;
    const targetPath = `M0 0 L${dimension.width} 0 L${dimension.width} ${dimension.height} Q${dimension.width / 2} ${dimension.height} 0 ${dimension.height}  L0 0`;
    const targetPath2 = `M0 ${vh(105)} L${dimension.width} ${vh(105)} L${dimension.width} ${dimension.height} Q${dimension.width / 2} ${dimension.height} 0 ${dimension.height} L0 ${vh(105)}`;
    const initialPath2 = `M0 ${dimension.height} L${dimension.width} ${dimension.height} L${dimension.width} ${dimension.height} Q${dimension.width / 2} ${dimension.height + 300} 0 ${dimension.height} L0 ${dimension.height}`;

    const slideSplit = {
        initial: { top: 0 },
        exit: {
            top: "-105vh",
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.2 }
        }
    };

    const curve = {
        initial: { d: initialPath },
        exit: {
            d: targetPath,
            transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1], delay: 0.3 }
        }
    };

    const curve2 = {
        initial: {
            d: initialPath2, // Start from the bottom
            transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] }
        },
        exit: {
            d: targetPath2, // Move downward
            transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1], delay: 0.3 }
        }
    };

    return (
        // <motion.div variants={slideSplit} initial="initial" exit="exit" className={styles.introduction}>
        <motion.div variants={slideUp(1.05 * dimension.height)} initial="initial" exit="exit" className={styles.introduction}>

            {dimension.width > 0 && (
                <>
                    <motion.p variants={opacity} initial="initial" animate="enter">
                        <span></span>{words[index]} 
                    </motion.p>
                    <svg>
                        <motion.path variants={curve} initial="initial" exit="exit" />
                        <motion.path variants={curve2} initial="initial" exit="exit" />
                    </svg>
                </>
            )}
        </motion.div>
    );
}
