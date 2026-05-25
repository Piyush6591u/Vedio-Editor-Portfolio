"use client";

import { useState } from "react";
import { useLenis } from "@/hooks/useLenis";
import { Preloader } from "@/components/layout/Preloader";
import { Navbar } from "@/components/layout/Navbar";
import { ScrollProgress } from "@/components/animations/ScrollProgress";
import { HeroSection } from "@/components/sections/HeroSection";
import { WorkSection } from "@/components/sections/WorkSection";
import { SkillSection } from "@/components/sections/SkillSection";

export default function HomePage() {
  const [loaded, setLoaded] = useState(false);
  useLenis();

  return (
    <>
      <Preloader onComplete={() => setLoaded(true)} />

      {/* Global chrome */}
      <ScrollProgress />
      <Navbar visible={loaded} />

      {/* Grain overlay */}
      <div className="grain fixed inset-0 z-[9990] pointer-events-none" />

      {/* Main content */}
      <main>
        <HeroSection />
        <WorkSection />
        <SkillSection />
      </main>
    </>
  );
}
