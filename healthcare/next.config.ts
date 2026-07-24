import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Doctor photos, article covers, and specialty icons are stored as
    // user-provided URLs (e.g. image hosts / CDNs), so allow the optimizer to
    // fetch any https image. Local /public images are always allowed.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

export default nextConfig;
