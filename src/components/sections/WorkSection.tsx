"use client";

import { motion } from "framer-motion";
import { SectionWrapper, SectionHeader } from "@/components/shared/SectionWrapper";
import { cn } from "@/lib/utils";

type VideoItem = {
  id: string;
  title: string;
  src: string;
  poster?: string;
  orientation?: "portrait" | "landscape";
};

// Update video paths here.
// Place your files inside: /public/videos
const recentWorkVideo: VideoItem = {
  id: "recent-work-main",
  title: "Recent Work",
  src: "/videos/fea.mp4",
  poster: "/images/profile.jpg",
  orientation: "landscape",
};

const shortVideos: VideoItem[] = [
  { id: "short-1", title: "Short Video 1", src: "/videos/1.mp4", orientation: "portrait" },
  { id: "short-2", title: "Short Video 2", src: "/videos/2.mp4", orientation: "portrait" },
  { id: "short-3", title: "Short Video 3", src: "/videos/3.mp4", orientation: "portrait" },
  { id: "short-4", title: "Short Video 4", src: "/videos/4.mp4", orientation: "portrait" },
  { id: "short-5", title: "Short Video 5", src: "/videos/5.mp4", orientation: "portrait" },
  { id: "short-6", title: "Short Video 6", src: "/videos/6.mp4", orientation: "portrait" },
];

const longVideos: VideoItem[] = [
  { id: "long-1", title: "Long Video 1", src: "/videos/h1.mp4", orientation: "landscape" },
  { id: "long-2", title: "Long Video 2", src: "/videos/h2.mp4", orientation: "landscape" },
  { id: "long-3", title: "Long Video 3", src: "/videos/h3.mp4", orientation: "landscape" },
  { id: "long-4", title: "Long Video 4", src: "/videos/h4.mp4", orientation: "landscape" },
];

function LoopVideoCard({
  item,
  className,
  showTitle = false,
}: {
  item: VideoItem;
  className?: string;
  showTitle?: boolean;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8%" }}
      transition={{ duration: 0.55, ease: "easeOut" }}
      className={cn(
        "relative overflow-hidden rounded-[16px] border border-[#00eaff66] bg-[#04131f]",
        "shadow-[0_8px_30px_rgba(0,0,0,0.35)]",
        className
      )}
    >
      <div
        className={cn(
          "relative overflow-hidden",
          item.orientation === "portrait" ? "aspect-[9/16]" : "aspect-video"
        )}
      >
        <video
          className="h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={item.poster}
          controls
        >
          <source src={item.src} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {showTitle && (
        <div className="px-4 py-3">
          <h4 className="text-sm font-medium tracking-wide" style={{ color: "#d9f9ff" }}>
            {item.title}
          </h4>
        </div>
      )}
    </motion.article>
  );
}

export function WorkSection() {
  return (
    <SectionWrapper id="work" ambient={[{ position: "tr", color: "#5b5bff" }]}>
      <div className="container-site">
        <SectionHeader eyebrow="Portfolio" title="Featured" titleAccent="Videos" />

        <div className="mt-10 space-y-16">
          <div className="space-y-5">
            <h3 className="text-3xl md:text-3xl font-semibold heading-display" style={{ color: "#f0f0f0" }}>
              Recent Work
            </h3>
            <LoopVideoCard item={recentWorkVideo} className="rounded-[20px]" />
          </div>

          <div className="space-y-5">
            <h3 className="text-3xl md:text-3xl font-semibold heading-display" style={{ color: "#f0f0f0" }}>
              Short Videos
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
              {shortVideos.map((video) => (
                <LoopVideoCard key={video.id} item={video} />
              ))}
            </div>
          </div>

          <div className="space-y-5">
            <h3 className="text-2xl md:text-3xl font-semibold heading-display" style={{ color: "#f0f0f0" }}>
              Long Videos
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-7">
              {longVideos.map((video) => (
                <LoopVideoCard key={video.id} item={video} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
