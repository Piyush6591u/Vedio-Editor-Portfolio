export type Project = {
  id: string;
  title: string;
  category: string;
  client: string;
  duration: string;
  software: string[];
  thumbnail: string;
  videoUrl: string;
  previewUrl?: string;
  description: string;
  breakdown: string;
  clientFeedback: string;
  tags: string[];
  featured: boolean;
  year: string;
  views?: string;
};

export const projects: Project[] = [
  {
    id: "cinematic-travel",
    title: "Wanderlust: A Cinematic Journey",
    category: "Cinematic",
    client: "TravelVibe Studios",
    duration: "4:32",
    software: ["Premiere Pro", "After Effects", "DaVinci Resolve"],
    thumbnail: "/images/projects/thumb1.jpg",
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    previewUrl: undefined,
    description:
      "A sweeping cinematic travel reel through Southeast Asia, blending drone footage with ground-level storytelling.",
    breakdown:
      "Assembled 8 hours of raw footage into a 4-minute narrative. Used DaVinci Resolve for color grading with custom LUTs, After Effects for title sequences and transitions, and Premiere Pro for the master timeline.",
    clientFeedback:
      "Alex transformed our raw travel footage into something that literally made me tear up. The pacing, the music sync, everything felt intentional.",
    tags: ["Travel", "Cinematic", "Drone", "Color Grading"],
    featured: true,
    year: "2024",
    views: "2.4M",
  },
  {
    id: "brand-reel",
    title: "HYPEBEAST Brand Campaign",
    category: "Commercial",
    client: "HYPEBEAST",
    duration: "1:15",
    software: ["After Effects", "Premiere Pro"],
    thumbnail: "/images/projects/thumb2.jpg",
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    previewUrl: undefined,
    description:
      "High-energy brand campaign video for a luxury streetwear launch, featuring rapid cuts and motion graphics.",
    breakdown:
      "Designed custom motion graphics in After Effects matching the brand identity. Beat-synced cuts to the track create a visceral energy that mirrors the brand's attitude.",
    clientFeedback:
      "The video got 500K views in 24 hours. Alex understood our brand better than anyone we've worked with.",
    tags: ["Commercial", "Fashion", "Motion Graphics"],
    featured: true,
    year: "2024",
    views: "1.1M",
  },
  {
    id: "anime-amv",
    title: "Hollow Resonance AMV",
    category: "Anime Edit",
    client: "Personal Project",
    duration: "3:45",
    software: ["After Effects", "Premiere Pro"],
    thumbnail: "/images/projects/thumb3.jpg",
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    previewUrl: undefined,
    description:
      "An emotionally charged AMV blending clips from multiple anime series with precise beat-sync masking.",
    breakdown:
      "Over 200 individual clips layered with masking techniques. Every cut lands on a drum hit or musical phrase. Custom glow and particle effects in After Effects.",
    clientFeedback: "Community loved this — 50K views in the first week organically.",
    tags: ["AMV", "Anime", "Beat Sync"],
    featured: true,
    year: "2023",
    views: "847K",
  },
  {
    id: "youtube-doc",
    title: "The Algorithm Documentary",
    category: "YouTube",
    client: "TechTube Channel",
    duration: "22:14",
    software: ["Premiere Pro", "After Effects", "DaVinci Resolve"],
    thumbnail: "/images/projects/thumb4.jpg",
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    previewUrl: undefined,
    description:
      "A 22-minute deep-dive documentary on social media algorithms, blending interviews with infographic animation.",
    breakdown:
      "Structured a complex multi-interview narrative. Designed custom infographic animations in After Effects. Color graded for a professional broadcast look.",
    clientFeedback: "Best performing video on our channel ever. 85% audience retention — insane for 22 minutes.",
    tags: ["Documentary", "YouTube", "Infographics"],
    featured: false,
    year: "2024",
    views: "3.2M",
  },
  {
    id: "music-video",
    title: "Neon Nights Music Video",
    category: "Music Video",
    client: "Indie Artist",
    duration: "3:28",
    software: ["After Effects", "Premiere Pro", "Blender"],
    thumbnail: "/images/projects/thumb5.jpg",
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    previewUrl: undefined,
    description:
      "Synthwave-inspired music video with custom 3D environments, neon aesthetics, and cinematic lighting.",
    breakdown:
      "3D environments built in Blender, composited in After Effects. Custom VFX and lens flares. Color graded to match the synthwave aesthetic.",
    clientFeedback: "This exceeded every expectation. The 3D scenes looked like a big-budget production.",
    tags: ["Music Video", "3D", "VFX"],
    featured: true,
    year: "2023",
    views: "620K",
  },
  {
    id: "short-form-pack",
    title: "Viral Shorts Series",
    category: "Short Form",
    client: "LifestyleCreator",
    duration: "0:45 avg",
    software: ["Premiere Pro", "After Effects"],
    thumbnail: "/images/projects/thumb6.jpg",
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    previewUrl: undefined,
    description:
      "A 30-video short-form content series achieving consistent 100K+ views per video through hook optimization.",
    breakdown:
      "Developed a template system for rapid production without sacrificing quality. Each video opens with a proven hook structure. Caption animations designed for silent viewing.",
    clientFeedback: "Our channel grew from 10K to 250K subscribers in 3 months. Alex is the real MVP.",
    tags: ["Short Form", "TikTok", "Viral"],
    featured: false,
    year: "2024",
    views: "12M total",
  },
];

export const categories = ["All", "Cinematic", "Commercial", "Anime Edit", "YouTube", "Music Video", "Short Form"];
