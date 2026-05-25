"use client";

import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { ArrowDown, Play } from "lucide-react";
import { MagneticButton } from "@/components/animations/MagneticButton";
import { profile } from "@/data/profile";

declare global {
  interface Window {
    __checkpoint1?: number;
    setCheckpoint1?: () => void;
    reverseToCheckpoint1?: () => void;
  }
}

/* ─── Particles canvas ─────────────────────────────────── */
function Particles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    type P = { x: number; y: number; size: number; sx: number; sy: number; o: number };
    const pts: P[] = Array.from({ length: 55 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 1.4 + 0.2,
      sx: (Math.random() - 0.5) * 0.25,
      sy: (Math.random() - 0.5) * 0.25,
      o: Math.random() * 0.35 + 0.08,
    }));

    let raf: number;
    const tick = () => {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const p of pts) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(91,91,255,${p.o})`;
        ctx.fill();
        p.x = (p.x + p.sx + canvas.width) % canvas.width;
        p.y = (p.y + p.sy + canvas.height) % canvas.height;
      }
      raf = requestAnimationFrame(tick);
    };
    tick();

    const onResize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    window.addEventListener("resize", onResize);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", onResize); };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-0 opacity-50" />;
}

/* ─── Hero Section ─────────────────────────────────────── */
export function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const opacity = useTransform(scrollYProgress, [0, 0.55], [1, 0]);

  const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.11, delayChildren: 0.25 } } };
  const fadeUp = {
    hidden: { opacity: 0, y: 45, filter: "blur(12px)" },
    visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.85, ease: "easeOut" as const } },
  };

  // Mouse parallax for ambient and portrait
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 120, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 120, damping: 20 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      mouseX.set((e.clientX - cx) / cx * 12); // range roughly -12..12
      mouseY.set((e.clientY - cy) / cy * 10);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [mouseX, mouseY]);

  useEffect(() => {
    // initialize checkpoint at mount (this point)
    window.__checkpoint1 = window.scrollY || 0;

    // allow manual reset of checkpoint
    window.setCheckpoint1 = () => {
      window.__checkpoint1 = window.scrollY || 0;
      // eslint-disable-next-line no-console
      console.log("Checkpoint 1 set at", window.__checkpoint1);
    };

    // reverse to checkpoint (smooth scroll)
    window.reverseToCheckpoint1 = () => {
      const pos = window.__checkpoint1 ?? 0;
      window.scrollTo({ top: pos, behavior: "smooth" });
      // eslint-disable-next-line no-console
      console.log("Reversed to Checkpoint 1:", pos);
    };

    return () => {
      // cleanup globals
      try {
        delete window.setCheckpoint1;
        delete window.reverseToCheckpoint1;
      } catch (e) {}
    };
  }, []);

  return (
    <section
      id="hero"
      ref={ref}
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background: "#050505" }}>
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="ambient-light bg-[#5b5bff]"
          style={{ width: 900, height: 900, top: "-25%", right: "-12%", opacity: 0.065, x: springX, y: springY }}
          animate={{ scale: [1, 1.18, 1], opacity: [0.045, 0.085, 0.045] }}
          transition={{ duration: 9, repeat: Infinity }}
        />
        <motion.div
          className="ambient-light bg-[#a78bfa]"
          style={{ width: 600, height: 600, bottom: "5%", left: "-8%", opacity: 0.05, x: springX, y: springY }}
          animate={{ scale: [1, 1.22, 1] }}
          transition={{ duration: 11, repeat: Infinity, delay: 2.5 }}
        />
      </div>

      <Particles />

      {/* ── Main grid ── */}
      <motion.div
        style={{ y, opacity }}
        className="relative z-10 w-full container-site grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center pt-28 md:pt-36 pb-24 min-h-screen"
      >
        {/* LEFT ── copy */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="flex flex-col gap-8 order-2 lg:order-1"
        >
          {/* Availability badge */}
          <motion.div variants={fadeUp}>
            <span
              className="inline-flex items-center gap-2.5 text-[11px] font-medium tracking-[0.3em] uppercase px-5 py-2.5 rounded-full"
              style={{
                background: "rgba(91,91,255,0.1)",
                border: "1px solid rgba(91,91,255,0.28)",
                color: "#5b5bff",
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#5b5bff] animate-pulse" />
              {profile.availability}
            </span>
          </motion.div>

          {/* Hero headline */}
          <motion.div variants={fadeUp}>
            <h1 className="hero-title" style={{ color: "#f5f5f5" }}>
              Cinematic
              <br />
              <span className="gradient-text">Video Editor</span>
              <br />
              <span style={{ color: "rgba(255,255,255,0.35)", fontSize: "0.7em", letterSpacing: "-0.02em" }}>
                &amp; Storyteller
              </span>
            </h1>
          </motion.div>

          {/* Bio */}
          <motion.p
            variants={fadeUp}
            className="body-text leading-[1.8] max-w-[460px]"
          >
            {profile.shortBio}
          </motion.p>

          {/* CTAs */}
          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 pt-2">
            <MagneticButton
              onClick={() => window.open("https://wa.me/917275572180", "_blank")}
              className="group relative px-9 py-4 rounded-full text-sm font-semibold text-white overflow-hidden"
              style={{
                background: "linear-gradient(135deg, #5b5bff, #7c7cff)",
                boxShadow: "0 0 36px rgba(91,91,255,0.4), 0 4px 20px rgba(0,0,0,0.3)",
              } as React.CSSProperties}
            >
              <span className="relative z-10 tracking-wide">Hire Me</span>
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: "linear-gradient(135deg, #7272ff, #a78bfa)" }}
              />
            </MagneticButton>

            <MagneticButton
              onClick={() => document.getElementById("work")?.scrollIntoView({ behavior: "smooth" })}
              className="group flex items-center gap-3 px-9 py-4 rounded-full text-sm font-semibold glass glass-hover"
              style={{ color: "#e0e0e0" }}
            >
              <Play size={15} className="group-hover:text-[#5b5bff] transition-colors" />
              <span className="tracking-wide">View Work</span>
            </MagneticButton>
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={fadeUp}
            className="flex gap-10 pt-6"
            style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
          >

          </motion.div>
        </motion.div>

        {/* RIGHT ── floating portrait */}
        <motion.div
          initial={{ opacity: 0, scale: 0.88 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 1.1,
            delay: 0.35,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="relative flex items-center justify-center order-1 lg:order-2"
        >
          {/* OUTER ROTATING RINGS */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <motion.div
              className="rounded-full"
              style={{
                width: 620,
                height: 620,
                border: "1px solid rgba(91,91,255,0.12)",
              }}
              animate={{ rotate: 360 }}
              transition={{
                duration: 30,
                repeat: Infinity,
                ease: "linear",
              }}
            />

            <motion.div
              className="absolute rounded-full"
              style={{
                width: 500,
                height: 500,
                border: "1px solid rgba(91,91,255,0.08)",
              }}
              animate={{ rotate: -360 }}
              transition={{
                duration: 45,
                repeat: Infinity,
                ease: "linear",
              }}
            />

            <motion.div
              className="absolute rounded-full"
              style={{
                width: 380,
                height: 380,
                border: "1px dashed rgba(91,91,255,0.08)",
              }}
              animate={{ rotate: 360 }}
              transition={{
                duration: 55,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          </div>

          {/* FLOATING SOFTWARE BADGES */}
          <motion.div
            className="absolute top-16 -left-10 glass px-5 py-3 rounded-full flex items-center gap-3"
            animate={{ y: [0, -10, 0] }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <div className="w-3 h-3 rounded-full bg-indigo-500" />
            <span className="text-base font-medium text-zinc-200">Video Editor</span>
          </motion.div>

          <motion.div
            className="absolute top-10 right-0 glass px-5 py-3 rounded-full flex items-center gap-3"
            animate={{ y: [0, 10, 0] }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
          </motion.div>

          <motion.div
            className="absolute bottom-24 -left-2 glass px-5 py-3 rounded-full flex items-center gap-3"
            animate={{ y: [0, 8, 0] }}
            transition={{
              duration: 4.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <span className="text-sm text-zinc-200">✨ 500+ Edits</span>
          </motion.div>

          <motion.div
            className="absolute bottom-10 right-[-30px] glass px-5 py-3 rounded-full flex items-center gap-3"
            animate={{ y: [0, -8, 0] }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <div className="w-3 h-3 rounded-full bg-indigo-500" />
            <span className="text-sm text-zinc-200">After Effects</span>
          </motion.div>

          {/* MAIN PHOTO CONTAINER */}
          <motion.div
            className="relative z-10"
            style={{ x: springX, y: springY }}
            animate={{
              y: [0, -12, 0],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            {/* GLOW */}
            <div
              className="absolute inset-0 rounded-full blur-3xl"
              style={{
                background:
                  "radial-gradient(circle, rgba(91,91,255,0.55) 0%, rgba(168,85,247,0.25) 40%, transparent 75%)",
                transform: "scale(1.2)",
              }}
            />

            {/* PHOTO BORDER */}
            <div
              className="relative rounded-full p-[6px]"
              style={{
                background:
                  "linear-gradient(135deg, rgba(91,91,255,1), rgba(168,85,247,0.9), rgba(236,72,153,0.9))",
                boxShadow:
                  "0 0 60px rgba(91,91,255,0.45), 0 0 140px rgba(91,91,255,0.15)",
              }}
            >
              {/* INNER BORDER */}
              <div
                className="rounded-full p-[10px]"
                style={{
                  background: "#050505",
                }}
              >
                {/* IMAGE */}
                <div className="relative overflow-hidden rounded-full">
                  <img
                    src="/images/profile.png"
                    alt={profile.name}
                    className="
              object-cover
              object-top
              rounded-full
              w-[320px]
              h-[320px]
              md:w-[420px]
              md:h-[420px]
              lg:w-[500px]
              lg:h-[500px]
            "
                  />

                  {/* OVERLAY */}
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(to top, rgba(0,0,0,0.35), transparent 40%)",
                    }}
                  />
                </div>
              </div>
            </div>

            {/* NAME TEXT */}
            <div className="mt-8 text-center">
              <h2
                className="heading-display font-bold text-white"
                style={{
                  fontSize: "clamp(1.6rem, 2vw, 2.4rem)",
                }}
              >
                {profile.name}
              </h2>

              <p
                className="mt-2 uppercase tracking-[0.35em] text-sm"
                style={{
                  color: "#5b5bff",
                }}
              >
                {profile.title}
              </p>
            </div>
          </motion.div>
        </motion.div>

        {/* Floating tool pills */}
        {[
          { label: "Premiere Pro", pos: "top-6  -left-12", delay: 0 },
          { label: "After Effects", pos: "-bottom-2 right-2", delay: 0.3 },
          { label: "DaVinci", pos: "top-1/2 -right-14", delay: 0.6 },
        ].map((b) => (
          <motion.div
            key={b.label}
            className={`absolute ${b.pos} glass px-4 py-2.5 rounded-2xl text-xs font-medium hidden md:flex items-center gap-2.5`}
            style={{ color: "#aaa" }}
            initial={{ opacity: 0, scale: 0.75 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.3 + b.delay, duration: 0.5, ease: "easeOut" }}
          >
            <span className="w-2 h-2 rounded-full bg-[#5b5bff] flex-shrink-0" />
            {b.label}
          </motion.div>
        ))}
      </motion.div>


      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 cursor-pointer z-10 group"
        onClick={() => document.getElementById("services")?.scrollIntoView({ behavior: "smooth" })}
      >
        <span
          className="text-[10px] tracking-[0.35em] uppercase group-hover:text-white transition-colors"
          style={{ color: "#555" }}
        >
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.6, repeat: Infinity }}
        >
          <ArrowDown size={15} color="#5b5bff" />
        </motion.div>
      </motion.div>
    </section >
  );
}
