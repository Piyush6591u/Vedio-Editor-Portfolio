"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { profile } from "@/data/profile";

interface PreloaderProps {
  onComplete: () => void;
}

export function Preloader({ onComplete }: PreloaderProps) {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const duration = 2200;
    const interval = 30;
    const steps = duration / interval;
    let current = 0;

    const timer = setInterval(() => {
      current++;
      const ease = 1 - Math.pow(1 - current / steps, 3);
      setProgress(Math.round(ease * 100));

      if (current >= steps) {
        clearInterval(timer);
        setTimeout(() => {
          setVisible(false);
          setTimeout(onComplete, 800);
        }, 300);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [onComplete]);

  const tagline = profile.tagline;
  const chars = tagline.split("");

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="preloader"
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center grain"
          style={{ background: "#050505" }}
          exit={{ opacity: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }}
        >
          {/* Ambient lights */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              className="ambient-light w-[600px] h-[600px] bg-[#5b5bff]"
              style={{ top: "20%", left: "30%", opacity: 0.06 }}
              animate={{ scale: [1, 1.2, 1], opacity: [0.04, 0.08, 0.04] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
          </div>

          {/* Main content */}
          <div className="relative z-10 text-center px-6">
            {/* Logo / Name */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="mb-8"
            >
              <span
                className="text-sm font-medium tracking-[0.4em] uppercase"
                style={{ color: "#5b5bff" }}
              >
                {profile.name}
              </span>
            </motion.div>

            {/* Animated tagline */}
            <div className="mb-12 overflow-hidden">
              <div className="flex flex-wrap justify-center gap-x-[0.3em]">
                {chars.map((char, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: 0.3 + i * 0.035,
                      duration: 0.5,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="heading-display text-2xl md:text-4xl"
                    style={{ color: char === " " ? "transparent" : "#f5f5f5" }}
                  >
                    {char === " " ? "\u00A0" : char}
                  </motion.span>
                ))}
              </div>
            </div>

            {/* Progress bar */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="relative"
            >
              <div
                className="w-64 h-px mx-auto mb-4 overflow-hidden rounded-full"
                style={{ background: "rgba(255,255,255,0.1)" }}
              >
                <motion.div
                  className="h-full rounded-full"
                  style={{
                    background: "linear-gradient(90deg, #5b5bff, #a78bfa)",
                    width: `${progress}%`,
                    transition: "width 0.03s linear",
                  }}
                />
              </div>
              <motion.span
                className="text-xs tabular-nums"
                style={{ color: "#b3b3b3" }}
              >
                {progress}%
              </motion.span>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
