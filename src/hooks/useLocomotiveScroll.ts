// import { useEffect, useRef } from 'react';
// import LocomotiveScroll from 'locomotive-scroll';
// import 'locomotive-scroll/dist/locomotive-scroll.css';

// interface UseLocomotiveScrollProps {
//   options?: {
//     el?: HTMLElement | null;
//     smooth?: boolean;
//     multiplier?: number;
//     class?: string;
//     lerp?: number;
//     smartphone?: {
//       smooth?: boolean;
//       multiplier?: number;
//     };
//     tablet?: {
//       smooth?: boolean;
//       multiplier?: number;
//     };
//   };
// }

// export const useLocomotiveScroll = ({ options = {} }: UseLocomotiveScrollProps = {}) => {
//   const scrollRef = useRef<LocomotiveScroll | null>(null);


//   useEffect(() => {
//     if (!scrollRef.current) {
//       scrollRef.current = new LocomotiveScroll({
//         el: document.querySelector('[data-scroll-container]'),
//         smooth: true,
//         multiplier:1.5,
//         class: 'is-revealed',
//         lerp: 0.09,
//         getDirection: true,    // detects scroll direction
//       getSpeed: true,        // detects scroll speed
//       touchMultiplier: 1.75,    // increases responsiveness to touch
//       reloadOnContextChange: true, // reload on resize/orientation change
//       smartphone: {
//         smooth: true,
//         multiplier: 2,
//         lerp: 0.1,
//       },
//       tablet: {
//         smooth: true,
//         multiplier: 1.5,
//         lerp: 0.09,
//       },
//         ...options,
//       });
      
//     // ✅ Call update on window load to fix layout
//     const onLoad = () => {
//       scrollRef.current?.update();
//     };

//     window.addEventListener("load", onLoad);
//   }

//   return () => {
//     // ✅ Cleanup scroll and event listener
//     if (scrollRef.current) {
//       scrollRef.current.destroy();
//       scrollRef.current = null;
//     }
//     // window.removeEventListener("load", onLoad);
//   };
// }, [options]);
// return scrollRef;
// }