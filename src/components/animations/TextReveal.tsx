"use client";

import { motion, Variants } from "framer-motion";
import { cn } from "@/lib/utils";

interface TextRevealProps {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  tag?: "h1" | "h2" | "h3" | "h4" | "p" | "span";
}

const containerVariants: Variants = {
  hidden: {},
  visible: (stagger: number) => ({
    transition: {
      staggerChildren: stagger,
    },
  }),
};

const wordVariants: Variants = {
  hidden: { y: "100%", opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export function TextReveal({
  text,
  className,
  delay = 0,
  stagger = 0.06,
  tag: Tag = "h1",
}: TextRevealProps) {
  const words = text.split(" ");

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10%" }}
      custom={stagger}
      variants={containerVariants}
      style={{ transitionDelay: `${delay}s` }}
    >
      <Tag className={cn("overflow-hidden", className)}>
        {words.map((word, i) => (
          <span key={i} className="inline-block overflow-hidden mr-[0.25em]">
            <motion.span className="inline-block" variants={wordVariants}>
              {word}
            </motion.span>
          </span>
        ))}
      </Tag>
    </motion.div>
  );
}
