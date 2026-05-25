"use client";

import React, { createContext, useContext, useRef, useCallback } from "react";

interface VideoContextType {
  currentlyPlayingRef: React.MutableRefObject<HTMLVideoElement | null>;
  registerVideo: (videoRef: React.RefObject<HTMLVideoElement | null>) => void;
  playVideo: (videoRef: React.RefObject<HTMLVideoElement | null>) => void;
  pauseAllVideos: () => void;
}

const VideoContext = createContext<VideoContextType | undefined>(undefined);

export function VideoProvider({ children }: { children: React.ReactNode }) {
  const allVideoRefsRef = useRef<Set<React.RefObject<HTMLVideoElement | null>>>(new Set());
  const currentlyPlayingRef = useRef<HTMLVideoElement | null>(null);

  const registerVideo = useCallback((videoRef: React.RefObject<HTMLVideoElement | null>) => {
    allVideoRefsRef.current.add(videoRef);
  }, []);

  const pauseAllVideos = useCallback(() => {
    allVideoRefsRef.current.forEach((videoRef) => {
      if (videoRef.current) {
        videoRef.current.pause();
      }
    });
    currentlyPlayingRef.current = null;
  }, []);

  const playVideo = useCallback((videoRef: React.RefObject<HTMLVideoElement | null>) => {
    if (!videoRef.current) return;

    // Pause all OTHER videos (not the target) to ensure only one plays at a time
    allVideoRefsRef.current.forEach((ref) => {
      if (ref.current && ref.current !== videoRef.current) {
        ref.current.pause();
      }
    });

    // Play the selected video
    videoRef.current.play().catch((err) => {
      console.warn("Video playback failed:", err);
    });

    currentlyPlayingRef.current = videoRef.current;
  }, []);

  const value: VideoContextType = {
    currentlyPlayingRef,
    registerVideo,
    playVideo,
    pauseAllVideos,
  };

  return <VideoContext.Provider value={value}>{children}</VideoContext.Provider>;
}

export function useVideoManager() {
  const context = useContext(VideoContext);
  if (!context) {
    throw new Error("useVideoManager must be used within VideoProvider");
  }
  return context;
}
