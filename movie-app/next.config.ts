import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "image.tmdb.org",
        pathname: "/t/p/**",
      }
    ],
    qualities: [75, 90],
  }
  /* config options here */
};

export default nextConfig;
