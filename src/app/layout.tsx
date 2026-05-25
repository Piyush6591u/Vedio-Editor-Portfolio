import type { Metadata } from "next";
import "./globals.css";
import PageTransition from "@/components/animations/PageTransition";

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
      <body>
        <PageTransition />
        <div id="__app_root">{children}</div>
      </body>
    </html>
  );
}
