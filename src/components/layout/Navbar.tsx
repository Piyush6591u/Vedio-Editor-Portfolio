"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Menu } from "lucide-react";
import { useActiveSection } from "@/hooks/useActiveSection";
import { cn } from "@/lib/utils";
import { profile } from "@/data/profile";

const navItems = [
  { label: "Home", id: "hero" },
  { label: "Videos", id: "work" },
  { label: "Skills", id: "skills" }
];

function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function Navbar({ visible }: { visible: boolean }) {
  const active = useActiveSection(navItems.map((n) => n.id));
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <>
      {/* ── Desktop Navbar ──────────────────────────────────── */}
      <motion.nav
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : -40 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-6 left-1/2 -translate-x-1/2 z-[500] hidden md:flex items-center gap-1 px-3 py-2.5 rounded-full"
        style={{
          background: scrolled
            ? "rgba(5,5,5,0.88)"
            : "rgba(14,14,14,0.65)",
          backdropFilter: "blur(32px) saturate(180%)",
          WebkitBackdropFilter: "blur(32px) saturate(180%)",
          border: scrolled
            ? "1px solid rgba(255,255,255,0.1)"
            : "1px solid rgba(255,255,255,0.07)",
          boxShadow: scrolled
            ? "0 4px 40px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05)"
            : "0 2px 20px rgba(0,0,0,0.2)",
          transition: "background 0.4s ease, border-color 0.4s ease, box-shadow 0.4s ease",
        }}
      >
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => scrollToSection(item.id)}
            className={cn(
              "relative px-5 py-2.5 text-[13px] font-medium rounded-full tracking-wide transition-colors duration-200 whitespace-nowrap",
              active === item.id
                ? "text-white"
                : "text-[#888] hover:text-[#ddd]"
            )}
          >
            {/* Active pill indicator */}
            {active === item.id && (
              <motion.div
                layoutId="nav-active"
                className="absolute inset-0 rounded-full"
                style={{
                  background: "rgba(91,91,255,0.18)",
                  border: "1px solid rgba(91,91,255,0.38)",
                  boxShadow: "0 0 12px rgba(91,91,255,0.15)",
                }}
                transition={{ type: "spring", stiffness: 380, damping: 38 }}
              />
            )}
            <span className="relative z-10">{item.label}</span>
          </button>
        ))}
      </motion.nav>

      {/* ── Mobile Trigger ──────────────────────────────────── */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: visible ? 1 : 0 }}
        onClick={() => setMenuOpen(true)}
        className="fixed top-5 right-5 z-[500] md:hidden w-11 h-11 rounded-full flex items-center justify-center"
        style={{
          background: "rgba(17,17,17,0.9)",
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(255,255,255,0.1)",
          boxShadow: "0 4px 20px rgba(0,0,0,0.4)",
        }}
      >
        <Menu size={18} color="#f5f5f5" />
      </motion.button>

      {/* ── Mobile Fullscreen Menu ───────────────────────────── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, clipPath: "circle(0% at calc(100% - 44px) 44px)" }}
            animate={{ opacity: 1, clipPath: "circle(150% at calc(100% - 44px) 44px)" }}
            exit={{ opacity: 0, clipPath: "circle(0% at calc(100% - 44px) 44px)" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[600] flex flex-col"
            style={{ background: "rgba(3,3,3,0.98)", backdropFilter: "blur(40px)" }}
          >
            {/* Close button */}
            <div className="flex items-center justify-between px-6 pt-6">
              <span
                className="text-sm font-medium tracking-[0.25em] uppercase"
                style={{ color: "#5b5bff" }}
              >
                {profile.name}
              </span>
              <button
                onClick={() => setMenuOpen(false)}
                className="w-11 h-11 rounded-full flex items-center justify-center"
                style={{
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.1)",
                }}
              >
                <X size={18} color="#f5f5f5" />
              </button>
            </div>

            {/* Nav items */}
            <div className="flex flex-col items-start justify-center flex-1 px-8 gap-1">
              {navItems.map((item, i) => (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.07, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  onClick={() => {
                    setMenuOpen(false);
                    setTimeout(() => scrollToSection(item.id), 350);
                  }}
                  className="group flex items-center gap-5 py-4 w-full text-left border-b"
                  style={{ borderColor: "rgba(255,255,255,0.05)" }}
                >
                  <span
                    className="text-xs tabular-nums"
                    style={{ color: "rgba(91,91,255,0.6)" }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span
                    className={cn(
                      "text-4xl md:text-5xl font-bold heading-display transition-colors duration-200",
                      active === item.id
                        ? "text-[#5b5bff]"
                        : "text-white group-hover:text-[#5b5bff]"
                    )}
                  >
                    {item.label}
                  </span>
                </motion.button>
              ))}
            </div>

            {/* Footer */}
            <div className="px-8 pb-10">
              <p className="text-xs" style={{ color: "#555" }}>
                {profile.availability} · {profile.email}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
