"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";
import { Play } from "lucide-react";

export default function CustomCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springX = useSpring(cursorX, { stiffness: 300, damping: 28 });
  const springY = useSpring(cursorY, { stiffness: 300, damping: 28 });
  const ringRef = useRef<HTMLDivElement | null>(null);
  const [isVideoHovered, setIsVideoHovered] = useState(false);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const onOver = (e: Event) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      if (target.closest("video, .video-play-overlay")) {
        ringRef.current?.classList.add("cursor--video");
        setIsVideoHovered(true);
      } else if (target.closest("button, a, [data-cursor='hover'], .magnetic-btn")) {
        ringRef.current?.classList.add("cursor--hover");
      }
    };

    const onOut = (e: Event) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      if (target.closest("video, .video-play-overlay")) {
        ringRef.current?.classList.remove("cursor--video");
        setIsVideoHovered(false);
      } else if (target.closest("button, a, [data-cursor='hover'], .magnetic-btn")) {
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
        <div className="cursor-ring md:flex hidden items-center justify-center">
          {isVideoHovered && (
            <motion.span
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              className="text-[9px] font-bold tracking-widest text-white mix-blend-normal absolute flex items-center justify-center"
            >
              PLAY
            </motion.span>
          )}
        </div>
        <div className={`cursor-dot md:hidden block ${isVideoHovered ? "opacity-0" : ""}`} />
      </motion.div>
    </>
  );
}
