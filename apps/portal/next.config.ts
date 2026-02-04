import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
