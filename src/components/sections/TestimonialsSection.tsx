"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { testimonials } from "@/data/testimonials";
import { SectionWrapper, SectionHeader } from "@/components/shared/SectionWrapper";

function TestimonialCard({
  t,
  isActive,
}: {
  t: typeof testimonials[0];
  isActive?: boolean;
}) {
  return (
    <div
      className="flex-shrink-0 w-[340px] md:w-[420px] flex flex-col gap-5 p-8 rounded-[22px]"
      style={{
        background: isActive ? "rgba(91,91,255,0.07)" : "rgba(255,255,255,0.025)",
        border: isActive
          ? "1px solid rgba(91,91,255,0.28)"
          : "1px solid rgba(255,255,255,0.06)",
        backdropFilter: "blur(20px)",
        boxShadow: isActive ? "0 0 40px rgba(91,91,255,0.1), 0 16px 60px rgba(0,0,0,0.25)" : "none",
        transition: "all 0.4s ease",
      }}
    >
      {/* Quote icon */}
      <Quote
        size={24}
        style={{ color: isActive ? "#5b5bff" : "#333", transition: "color 0.4s" }}
      />

      {/* Stars */}
      <div className="flex gap-1.5">
        {Array.from({ length: t.rating }).map((_, i) => (
          <Star
            key={i}
            size={13}
            className="fill-[#5b5bff]"
            style={{ color: "#5b5bff" }}
          />
        ))}
      </div>

      {/* Review text */}
      <p
        className="text-sm leading-relaxed flex-1"
        style={{ color: isActive ? "#e0e0e0" : "#888", lineHeight: 1.8 }}
      >
        &ldquo;{t.review}&rdquo;
      </p>

      {/* Author */}
      <div className="flex items-center gap-4 pt-4" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        {/* Avatar */}
        <div
          className="w-11 h-11 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0"
          style={{
            background: "linear-gradient(135deg, #5b5bff, #a78bfa)",
            color: "white",
          }}
        >
          {t.name[0]}
        </div>

        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold" style={{ color: "#f0f0f0" }}>
            {t.name}
          </p>
          <p className="text-xs mt-0.5 truncate" style={{ color: "#666" }}>
            {t.role} · {t.company}
          </p>
        </div>

        <span
          className="text-[10px] px-2.5 py-1 rounded-full flex-shrink-0"
          style={{
            background: "rgba(91,91,255,0.1)",
            border: "1px solid rgba(91,91,255,0.2)",
            color: "#5b5bff",
          }}
        >
          {t.projectType}
        </span>
      </div>
    </div>
  );
}

export function TestimonialsSection() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (paused) return;
    const interval = setInterval(() => {
      setActive((p) => (p + 1) % testimonials.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [paused]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.children[active] as HTMLElement;
    if (card) {
      track.scrollTo({ left: card.offsetLeft - 32, behavior: "smooth" });
    }
  }, [active]);

  return (
    <SectionWrapper id="reviews" ambient={[{ position: "bl", color: "#5b5bff" }]}>
      <div className="container-site">
        <SectionHeader
          eyebrow="Testimonials"
          title="What Clients"
          titleAccent="Say"
          description="Real results from real collaborations. Feedback that speaks louder than a showreel."
        />
      </div>

      {/* Carousel — edge-to-edge on mobile */}
      <div
        className="relative"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div
          ref={trackRef}
          className="flex gap-5 overflow-x-auto pb-6 snap-x snap-mandatory px-6 md:px-[max(1.25rem,calc((100vw-1280px)/2+1.25rem))]"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {testimonials.map((t, i) => (
            <div
              key={t.id}
              className="snap-start cursor-pointer"
              onClick={() => setActive(i)}
            >
              <TestimonialCard t={t} isActive={active === i} />
            </div>
          ))}
        </div>

        {/* Edge fade */}
        <div
          className="absolute left-0 top-0 bottom-6 w-20 pointer-events-none"
          style={{ background: "linear-gradient(to right, #050505, transparent)" }}
        />
        <div
          className="absolute right-0 top-0 bottom-6 w-20 pointer-events-none"
          style={{ background: "linear-gradient(to left, #050505, transparent)" }}
        />
      </div>

      {/* Dot indicators */}
      <div className="flex justify-center gap-2 mt-8">
        {testimonials.map((_, i) => (
          <motion.button
            key={i}
            onClick={() => setActive(i)}
            className="rounded-full"
            animate={{
              width: active === i ? 28 : 6,
              background: active === i ? "#5b5bff" : "rgba(255,255,255,0.18)",
            }}
            style={{ height: 6 }}
            transition={{ duration: 0.3 }}
          />
        ))}
      </div>
    </SectionWrapper>
  );
}
