"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Play, Clock, Monitor, Star, ChevronRight } from "lucide-react";
import { Project } from "@/data/projects";

function getYouTubeId(url: string): string | null {
  const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s]+)/);
  return match ? match[1] : null;
}

function VideoPlayer({ url }: { url: string }) {
  const youtubeId = getYouTubeId(url);
  if (youtubeId) {
    return (
      <iframe
        src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&modestbranding=1`}
        className="w-full h-full"
        allow="autoplay; fullscreen; picture-in-picture"
        allowFullScreen
      />
    );
  }
  return (
    <video src={url} controls className="w-full h-full" autoPlay />
  );
}

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  return (
    <AnimatePresence>
      {project && (
        <motion.div
          key="modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[800] flex items-center justify-center p-4 md:p-8"
          style={{ background: "rgba(0,0,0,0.92)", backdropFilter: "blur(20px)" }}
          onClick={(e) => e.target === e.currentTarget && onClose()}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 40 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl"
            style={{
              background: "#0d0d0d",
              border: "1px solid rgba(255,255,255,0.08)",
              boxShadow: "0 40px 80px rgba(0,0,0,0.6)",
            }}
          >
            {/* Close */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full flex items-center justify-center transition-colors"
              style={{ background: "rgba(255,255,255,0.08)", color: "#f5f5f5" }}
            >
              <X size={18} />
            </button>

            {/* Video Player */}
            <div className="relative aspect-video bg-black rounded-t-3xl overflow-hidden">
              <VideoPlayer url={project.videoUrl} />
            </div>

            {/* Content */}
            <div className="p-6 md:p-8 space-y-6">
              {/* Title row */}
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                <div>
                  <span
                    className="text-xs font-medium tracking-[0.2em] uppercase mb-2 inline-block"
                    style={{ color: "#5b5bff" }}
                  >
                    {project.category}
                  </span>
                  <h2 className="heading-display text-2xl md:text-3xl" style={{ color: "#f5f5f5" }}>
                    {project.title}
                  </h2>
                </div>
                {project.views && (
                  <div
                    className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium self-start"
                    style={{
                      background: "rgba(91,91,255,0.1)",
                      border: "1px solid rgba(91,91,255,0.3)",
                      color: "#5b5bff",
                    }}
                  >
                    <Play size={14} />
                    {project.views} views
                  </div>
                )}
              </div>

              {/* Meta */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { icon: Monitor, label: "Client", value: project.client },
                  { icon: Clock, label: "Duration", value: project.duration },
                  { icon: Star, label: "Year", value: project.year },
                  { icon: ChevronRight, label: "Category", value: project.category },
                ].map(({ icon: Icon, label, value }) => (
                  <div
                    key={label}
                    className="p-3 rounded-xl"
                    style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <Icon size={12} style={{ color: "#5b5bff" }} />
                      <span className="text-xs" style={{ color: "#b3b3b3" }}>{label}</span>
                    </div>
                    <p className="text-sm font-medium" style={{ color: "#f5f5f5" }}>{value}</p>
                  </div>
                ))}
              </div>

              {/* Description */}
              <div>
                <h3 className="text-sm font-semibold mb-2 uppercase tracking-wider" style={{ color: "#5b5bff" }}>
                  Overview
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "#b3b3b3" }}>
                  {project.description}
                </p>
              </div>

              {/* Breakdown */}
              <div>
                <h3 className="text-sm font-semibold mb-2 uppercase tracking-wider" style={{ color: "#5b5bff" }}>
                  Editing Breakdown
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "#b3b3b3" }}>
                  {project.breakdown}
                </p>
              </div>

              {/* Software */}
              <div>
                <h3 className="text-sm font-semibold mb-3 uppercase tracking-wider" style={{ color: "#5b5bff" }}>
                  Tools Used
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.software.map((s) => (
                    <span
                      key={s}
                      className="px-3 py-1 rounded-full text-xs font-medium"
                      style={{
                        background: "rgba(91,91,255,0.1)",
                        border: "1px solid rgba(91,91,255,0.2)",
                        color: "#b3b3b3",
                      }}
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              {/* Client Feedback */}
              <div
                className="p-5 rounded-2xl"
                style={{
                  background: "rgba(91,91,255,0.06)",
                  border: "1px solid rgba(91,91,255,0.15)",
                }}
              >
                <h3 className="text-sm font-semibold mb-3 uppercase tracking-wider" style={{ color: "#5b5bff" }}>
                  Client Feedback
                </h3>
                <p className="text-sm leading-relaxed italic" style={{ color: "#f5f5f5" }}>
                  &ldquo;{project.clientFeedback}&rdquo;
                </p>
                <p className="text-xs mt-3" style={{ color: "#b3b3b3" }}>— {project.client}</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
