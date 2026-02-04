import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  turbopack: {
    root: path.join(__dirname, "..", ".."),
  },
  // Optimize for Replit deployment
  output: 'standalone',
  
  // Ensure proper port handling for Replit
  // Replit provides PORT environment variable automatically
  
  // Enable React strict mode
  reactStrictMode: true,
  
  // Optimize images
  images: {
    remotePatterns: [],
  },
};

export default nextConfig;
