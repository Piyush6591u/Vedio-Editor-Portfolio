import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["192.168.1.45", "192.168.1.55"],
  
  // Optimization for video delivery
  compress: true,
  poweredByHeader: false,
  productionBrowserSourceMaps: false,
  
  // Image and media optimization
  images: {
    formats: ["image/webp"],
  },

  // Headers for caching media files
  async headers() {
    return [
      {
        source: "/videos/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/images/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
