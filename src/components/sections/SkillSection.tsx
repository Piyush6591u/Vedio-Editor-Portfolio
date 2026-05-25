"use client";

import { motion } from "framer-motion";
import { SectionWrapper, SectionHeader } from "@/components/shared/SectionWrapper";
import { services } from "@/data/services";
import { Zap, Film, Image as ImageIcon, Video, Sparkles, Layers, Clapperboard, Star } from "lucide-react";
import { cn } from "@/lib/utils";

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Zap,
  Film,
  Image: ImageIcon,
  Youtube: Video,
  Sparkles,
  Layers,
  Clapperboard,
  Instagram: Star,
};

export function SkillSection() {
  return (
    <SectionWrapper id="skills" ambient={[{ position: "bl", color: "#5b5bff" }]}> 
      <div className="container-site">
        <SectionHeader
          eyebrow="Skills"
          title="Where I Suit"
          titleAccent="Best"
          description="These are the editing specialties I bring the most energy and expertise to. Each skill is built for maximum performance, storytelling, and audience impact."
        />

        <div className="mt-10">
          <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
                {services.map((service, index) => {
                  const Icon = iconMap[service.icon] || Star;

                  return (
                    <motion.article
                      key={service.id}
                      initial={{ opacity: 0, y: 40 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-10%" }}
                      transition={{ delay: index * 0.08, duration: 0.6, ease: "easeOut" }}
                      whileHover={{ y: -6 }}
                      className={cn(
                        "relative overflow-hidden rounded-[32px] border border-white/10 bg-[#071119]/90 p-7",
                        "shadow-[0_18px_60px_rgba(0,0,0,0.25)]"
                      )}
                    >
                      <div className="flex items-center justify-between gap-4 mb-6">
                        <div
                          className="flex h-14 w-14 items-center justify-center rounded-full"
                          style={{
                            background: "rgba(91,91,255,0.12)",
                            border: "1px solid rgba(91,91,255,0.18)",
                          }}
                        >
                          <Icon size={22} className="text-[#5b5bff]" />
                        </div>
                        <span className="text-[11px] tracking-[0.3em] uppercase" style={{ color: "#7c7cff" }}>
                          Skill
                        </span>
                      </div>

                      <h3 className="card-title mb-3" style={{ color: "#f5f5f5" }}>
                        {service.title}
                      </h3>
                      <p className="text-sm leading-relaxed mb-6" style={{ color: "#b8b8b8", lineHeight: 1.8 }}>
                        {service.description}
                      </p>

                      <div className="space-y-3">
                        {service.features.slice(0, 4).map((feature) => (
                          <div key={feature} className="flex items-start gap-3">
                            <span className="mt-1 block h-2 w-2 rounded-full bg-[#5b5bff]" />
                            <p className="text-sm leading-tight" style={{ color: "#d4d4d4" }}>
                              {feature}
                            </p>
                          </div>
                        ))}
                      </div>
                    </motion.article>
                  );
                })}
              </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
