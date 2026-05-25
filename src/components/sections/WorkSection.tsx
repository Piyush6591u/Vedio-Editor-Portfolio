"use client";

import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { SectionWrapper, SectionHeader } from "@/components/shared/SectionWrapper";
import { useVideoManager } from "@/contexts/VideoContext";
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
  index = 0,
}: {
  item: VideoItem;
  className?: string;
  showTitle?: boolean;
  index?: number;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { playVideo, registerVideo } = useVideoManager();
  const rafRef = useRef<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // Register this video with the global video manager
  useEffect(() => {
    registerVideo(videoRef);
  }, [registerVideo]);

  // Pause video when it scrolls out of the viewport and smart preload
  useEffect(() => {
    const container = containerRef.current;
    const video = videoRef.current;
    if (!container || !video) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Load metadata when video is near viewport
            if (video.preload === 'none') {
              video.preload = 'metadata';
            }
          } else {
            // Pause and reset preload when out of viewport
            video.pause();
            video.preload = 'none';
          }
        });
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    observer.observe(container);
    return () => {
      observer.disconnect();
      // Cleanup any pending animation frame
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  // Track video play/pause state
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleEnded = () => setIsPlaying(false);

    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);
    video.addEventListener('ended', handleEnded);

    return () => {
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
      video.removeEventListener('ended', handleEnded);
      // Pause video and reset state on unmount
      video.pause();
      setIsPlaying(false);
    };
  }, []);

  // When this video starts playing (user clicks play), pause all others
  const handlePlay = () => {
    if (videoRef.current) {
      playVideo(videoRef);
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    // Disable tilt effect during video playback
    if (isPlaying || !containerRef.current) return;
    
    // Cancel previous animation frame
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
    }
    
    // Use requestAnimationFrame for smooth performance
    rafRef.current = requestAnimationFrame(() => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = ((y - centerY) / centerY) * -5;
      const rotateY = ((x - centerX) / centerX) * 5;
      
      if (containerRef.current) {
        containerRef.current.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
      }
    });
  };

  const handleMouseLeave = () => {
    if (!containerRef.current) return;
    
    // Cancel any pending animation frame
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
    }
    
    containerRef.current.style.transform = `perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8%" }}
      transition={{ duration: 0.55, delay: index * 0.1, ease: "easeOut" }}
      className="tilt-card group"
    >
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={cn(
          "tilt-card-inner relative overflow-hidden rounded-[16px] bg-[#04131f]",
          !isPlaying && "animated-gradient-border",
          "shadow-[0_8px_30px_rgba(0,0,0,0.35)]",
          className
        )}
      >
        <div
          className={cn(
            "relative overflow-hidden bg-black",
            item.orientation === "portrait" ? "aspect-[9/16]" : "aspect-video"
          )}
        >
          <video
            ref={videoRef}
            className="h-full w-full object-cover"
            muted
            loop
            playsInline
            preload="none"
            poster={item.poster}
            controls
            onPlay={handlePlay}
          >
            <source src={item.src} type="video/mp4" />
          </video>

          <div className="video-play-overlay">
            <svg
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#ffffff"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="opacity-80 group-hover:scale-110 transition-transform duration-300"
            >
              <polygon points="5 3 19 12 5 21 5 3" fill="currentColor" />
            </svg>
          </div>
        </div>

        {showTitle && (
          <div className="px-4 py-3">
            <h4 className="text-sm font-medium tracking-wide" style={{ color: "#d9f9ff" }}>
              {item.title}
            </h4>
          </div>
        )}
      </div>
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
              {shortVideos.map((video, idx) => (
                <LoopVideoCard key={video.id} item={video} index={idx} />
              ))}
            </div>
          </div>

          <div className="space-y-5">
            <h3 className="text-2xl md:text-3xl font-semibold heading-display" style={{ color: "#f0f0f0" }}>
              Long Videos
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-7">
              {longVideos.map((video, idx) => (
                <LoopVideoCard key={video.id} item={video} index={idx} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
