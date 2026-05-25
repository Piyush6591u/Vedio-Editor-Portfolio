export type Service = {
  id: string;
  title: string;
  description: string;
  icon: string;
  previewVideo?: string;
  features: string[];
  gradient: string;
};

export const services: Service[] = [
  {
    id: "short-form",
    title: "Short Form Editing",
    description: "Punchy, high-retention edits for TikTok, YouTube Shorts, and Instagram Reels that stop the scroll.",
    icon: "Zap",
    previewVideo: undefined,
    features: ["Hook-optimized opening", "Trend-aware cuts", "Caption animation", "Audio sync"],
    gradient: "from-purple-600/20 to-blue-600/20",
  },
  {
    id: "long-form",
    title: "Long Form Editing",
    description: "Narrative-driven YouTube videos, documentaries, and series episodes with cinematic quality.",
    icon: "Film",
    previewVideo: undefined,
    features: ["Story arc structuring", "Chapter markers", "B-roll integration", "Pacing control"],
    gradient: "from-blue-600/20 to-cyan-600/20",
  },
  {
    id: "reels",
    title: "Reels Editing",
    description: "Fast-paced Instagram Reels with viral-worthy transitions and trending audio integration.",
    icon: "Instagram",
    previewVideo: undefined,
    features: ["Beat-sync transitions", "Trending effects", "Color grading", "Text overlays"],
    gradient: "from-pink-600/20 to-rose-600/20",
  },
  {
    id: "youtube",
    title: "YouTube Videos",
    description: "Fully packaged YouTube content with thumbnails, intros, outros, and engagement optimization.",
    icon: "Youtube",
    previewVideo: undefined,
    features: ["Custom intros/outros", "Chapter cards", "Sound design", "Retention editing"],
    gradient: "from-red-600/20 to-orange-600/20",
  },
  {
    id: "thumbnail",
    title: "Thumbnail Design",
    description: "Click-worthy thumbnails with psychological hooks designed to maximize CTR and views.",
    icon: "Image",
    previewVideo: undefined,
    features: ["CTR optimization", "Face cutouts", "Bold typography", "A/B variants"],
    gradient: "from-amber-600/20 to-yellow-600/20",
  },
  {
    id: "cinematic",
    title: "Cinematic Editing",
    description: "Film-grade color grading, cinematic pacing, and professional sound design for premium productions.",
    icon: "Clapperboard",
    previewVideo: undefined,
    features: ["Color grading", "LUT creation", "Sound design", "Cinematic effects"],
    gradient: "from-slate-600/20 to-zinc-600/20",
  },
];
