"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import React from "react";

interface SectionWrapperProps {
  id?: string;
  children: React.ReactNode;
  className?: string;
  /** Show a 1px gradient separator at the top */
  withTopSep?: boolean;
  /** Additional ambient lighting blob config */
  ambient?: { color?: string; position?: "tl" | "tr" | "bl" | "br" | "center" }[];
}

const ambientPositions = {
  tl: { top: "-15%", left: "-10%"  },
  tr: { top: "-15%", right: "-10%" },
  bl: { bottom: "-15%", left: "-10%" },
  br: { bottom: "-15%", right: "-10%" },
  center: { top: "50%", left: "50%", transform: "translate(-50%,-50%)" },
};

export function SectionWrapper({
  id,
  children,
  className,
  withTopSep = true,
  ambient = [],
}: SectionWrapperProps) {
  return (
    <section
      id={id}
      className={cn("relative section-block overflow-hidden", className)}
      style={{ background: "#050505" }}
    >
      {/* Separator */}
      {withTopSep && <div className="section-sep absolute top-0 left-0 right-0" />}

      {/* Ambient blobs */}
      {ambient.map((a, i) => (
        <motion.div
          key={i}
          className="ambient-light"
          style={{
            width: "700px",
            height: "700px",
            backgroundColor: a.color ?? "#5b5bff",
            opacity: 0.055,
            ...ambientPositions[a.position ?? "tr"],
          }}
          animate={{ scale: [1, 1.12, 1], opacity: [0.04, 0.07, 0.04] }}
          transition={{ duration: 9 + i * 3, repeat: Infinity, delay: i * 2 }}
        />
      ))}

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </section>
  );
}

/* ────────────────────────────────────────────────────────── */
/* Reusable section header block                              */
/* ────────────────────────────────────────────────────────── */

interface SectionHeaderProps {
  eyebrow: string;
  title: string;
  titleAccent?: string;    /** The part of title rendered in gradient-text */
  description?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeader({
  eyebrow,
  title,
  titleAccent,
  description,
  align = "center",
  className,
}: SectionHeaderProps) {
  const isCenter = align === "center";

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8%" }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className={cn(
        "flex flex-col",
        isCenter ? "items-center text-center" : "items-start text-left",
        "mb-16 md:mb-20 lg:mb-24",
        className
      )}
    >
      {/* Eyebrow */}
      <span className="eyebrow-text mb-5 inline-flex items-center gap-2">
        <span
          className="inline-block w-6 h-px"
          style={{ background: "var(--accent)" }}
        />
        {eyebrow}
        <span
          className="inline-block w-6 h-px"
          style={{ background: "var(--accent)", opacity: isCenter ? 1 : 0 }}
        />
      </span>

      {/* Heading */}
      <h2
        className="section-title"
        style={{ color: "#f5f5f5", maxWidth: isCenter ? "820px" : undefined }}
      >
        {titleAccent ? (
          <>
            {title}{" "}
            <span className="gradient-text">{titleAccent}</span>
          </>
        ) : (
          title
        )}
      </h2>

      {/* Description */}
      {description && (
        <p
          className="body-text mt-5"
          style={{
            maxWidth: "560px",
            color: "var(--text-secondary)",
          }}
        >
          {description}
        </p>
      )}
    </motion.div>
  );
}
