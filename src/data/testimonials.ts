export type Testimonial = {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  review: string;
  rating: number;
  projectType: string;
};

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    name: "Sarah Chen",
    role: "Creative Director",
    company: "Pulse Media",
    avatar: "/images/testimonials/1.jpg",
    review:
      "Working with Alex was a game-changer for our brand. The edits weren't just good — they were cinematic masterpieces. Our engagement tripled after we started working together.",
    rating: 5,
    projectType: "Brand Campaign",
  },
  {
    id: "t2",
    name: "Marcus Rivera",
    role: "YouTube Creator",
    company: "8.2M Subscribers",
    avatar: "/images/testimonials/2.jpg",
    review:
      "I've worked with many editors, but Alex operates on a different level. The storytelling instinct is unmatched — every video feels intentional and premium.",
    rating: 5,
    projectType: "YouTube Series",
  },
  {
    id: "t3",
    name: "Priya Kapoor",
    role: "Founder",
    company: "Aesthetic Brands Co.",
    avatar: "/images/testimonials/3.jpg",
    review:
      "Our launch video generated 2M views in the first week. Alex understood the brief immediately and delivered something that exceeded every benchmark we had.",
    rating: 5,
    projectType: "Product Launch",
  },
  {
    id: "t4",
    name: "Jake Williams",
    role: "Music Artist",
    company: "Independent",
    avatar: "/images/testimonials/4.jpg",
    review:
      "The music video Alex created for me was absolutely insane. The 3D environments, the neon effects, the sync — it felt like a major label production on an indie budget.",
    rating: 5,
    projectType: "Music Video",
  },
  {
    id: "t5",
    name: "Luna Park",
    role: "Content Strategist",
    company: "ViralVault Agency",
    avatar: "/images/testimonials/5.jpg",
    review:
      "Fast turnaround, flawless communication, and the quality is consistently premium. Alex is our go-to editor for every major campaign.",
    rating: 5,
    projectType: "Short Form Package",
  },
  {
    id: "t6",
    name: "David Osei",
    role: "Documentary Filmmaker",
    company: "Frontline Films",
    avatar: "/images/testimonials/6.jpg",
    review:
      "Alex brought a unique visual language to our documentary that we didn't expect. The color grading and pacing elevated the entire piece to festival-worthy quality.",
    rating: 5,
    projectType: "Documentary",
  },
];
