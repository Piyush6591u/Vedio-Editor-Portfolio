"use client";

import { useEffect, useRef } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

export default function CustomCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springX = useSpring(cursorX, { stiffness: 300, damping: 28 });
  const springY = useSpring(cursorY, { stiffness: 300, damping: 28 });
  const ringRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const onOver = (e: Event) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      if (target.closest("button, a, [data-cursor='hover'], .magnetic-btn, video")) {
        ringRef.current?.classList.add("cursor--hover");
      }
    };

    const onOut = (e: Event) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      if (target.closest("button, a, [data-cursor='hover'], .magnetic-btn, video")) {
        ringRef.current?.classList.remove("cursor--hover");
      }
    };

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
    };
  }, [cursorX, cursorY]);

  return (
    <>
      <motion.div
        ref={ringRef}
        className="fixed pointer-events-none z-[9999]"
        style={{ x: springX, y: springY }}
      >
        <div className="cursor-ring md:block hidden" />
        <div className="cursor-dot md:hidden block" />
      </motion.div>
    </>
  );
}
