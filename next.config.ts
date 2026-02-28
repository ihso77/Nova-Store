import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: '/Nova-Store',
  assetPrefix: '/Nova-Store',
};

export default nextConfig;
