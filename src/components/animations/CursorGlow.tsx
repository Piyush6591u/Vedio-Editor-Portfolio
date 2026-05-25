"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CursorGlow() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 30, damping: 25 });
  const springY = useSpring(y, { stiffness: 30, damping: 25 });
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      // Use requestAnimationFrame to throttle updates
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
      
      rafRef.current = requestAnimationFrame(() => {
        x.set(e.clientX);
        y.set(e.clientY);
      });
    };
    
    window.addEventListener("mousemove", handleMove);
    
    return () => {
      window.removeEventListener("mousemove", handleMove);
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [x, y]);

  return (
    <motion.div
      className="cursor-glow fixed z-0 pointer-events-none hidden md:block mix-blend-screen"
      style={{ left: springX, top: springY }}
      animate={{ opacity: [0.4, 0.6, 0.4] }}
      transition={{ duration: 6, ease: "easeInOut", repeat: Infinity }}
    />
  );
}
