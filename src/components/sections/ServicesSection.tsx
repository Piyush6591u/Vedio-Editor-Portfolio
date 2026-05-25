"use client";

import { motion } from "framer-motion";
import { services } from "@/data/services";
import { SectionWrapper, SectionHeader } from "@/components/shared/SectionWrapper";

export function ServicesSection() {
  return (
    <SectionWrapper id="services" ambient={[{ position: "center" }]}> 
      <div className="container-site">
        <SectionHeader
          eyebrow="What I Can Do for You"
          title="Creative editing that elevates your story"
          titleAccent="delivered"
          description="From viral short-form hooks to cinematic long-form storytelling, I craft polished videos that connect, convert, and keep audiences watching."
        />

        <div className="mt-10 rounded-[2rem] border border-white/10 bg-[#06101a] p-10 shadow-[0_20px_80px_rgba(0,0,0,0.3)] relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#5b5bff]/20 via-transparent to-[#a78bfa]/10 opacity-80 pointer-events-none" />
          <div className="relative grid gap-8 lg:grid-cols-[1.25fr_0.75fr] items-center">
            <div className="space-y-6">
              <p className="eyebrow-text" style={{ color: "#5b5bff" }}>
                What I Can Do
              </p>
              <h2 className="section-title max-w-3xl" style={{ color: "#f5f5f5" }}>
                Video editing built for attention, emotion, and growth.
              </h2>
              <p className="body-text max-w-2xl" style={{ color: "#c7c7c7" }}>
                I combine cinematic pacing, sharp story structure, and platform-first strategy so your content looks premium and performs better every time.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {services.slice(0, 4).map((service) => (
                <div
                  key={service.id}
                  className="rounded-[20px] border border-white/10 bg-white/5 p-5"
                >
                  <h3 className="font-semibold" style={{ color: "#f5f5f5" }}>
                    {service.title}
                  </h3>
                  <p className="text-sm leading-relaxed mt-3" style={{ color: "#c0c0c0", lineHeight: 1.75 }}>
                    {service.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
