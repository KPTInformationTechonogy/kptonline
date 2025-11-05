import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['www.shutterstock.com', 'drive.google.com','placehold.co'], // ✅ Single array of strings
  },
};

export default nextConfig;

