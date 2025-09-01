import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/shifts",
  assetPrefix: "/shifts/",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
