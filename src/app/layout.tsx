import type { Metadata } from "next";
import "./globals.css";
import PageTransition from "@/components/animations/PageTransition";
import { VideoProvider } from "@/contexts/VideoContext";

export const metadata: Metadata = {
  title: "Piyush Kumar Upadhyay | Video Editor",
  description:
    "Award-worthy cinematic video editing. Short form, long form, motion graphics, and immersive storytelling. Based in LA, working worldwide.",
  keywords: ["video editor", "cinematic editing", "motion graphics", "YouTube editor", "reel editor", "freelance video editor"],
  openGraph: {
    title: "Piyush Kumar Upadhyay | Video Editor",
    description: "Crafting cinematic stories through motion. Premium video editing services.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap" rel="stylesheet" />
        <link href="https://api.fontshare.com/v2/css?f[]=clash-display@400,500,600,700&display=swap" rel="stylesheet" />
      </head>
      <body>
        <VideoProvider>
          <PageTransition />
          <div id="__app_root">{children}</div>
        </VideoProvider>
      </body>
    </html>
  );
}
