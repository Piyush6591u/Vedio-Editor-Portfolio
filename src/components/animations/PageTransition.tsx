"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function PageTransition() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const onStart = () => setVisible(true);
    const onEnd = () => setVisible(false);
    // simple lifecycle - shown briefly on mount
    const t = setTimeout(() => setVisible(false), 600);
    return () => clearTimeout(t);
  }, []);

  return (
    <motion.div
      aria-hidden
      initial={{ opacity: 1, backdropFilter: "blur(0px)" }}
      animate={visible ? { opacity: 1, backdropFilter: "blur(2px)" } : { opacity: 0, backdropFilter: "blur(0px)" }}
      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
      className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-black/60 via-transparent to-transparent"
    />
  );
}
