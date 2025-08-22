import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    rules: {
      '*.woff2': ['file-loader'],
      '*.woff': ['file-loader'],
      '*.ttf': ['file-loader'],
      '*.eot': ['file-loader'],
    }
  },

  // ✅ Ignore lint & TS errors during build (only for deployment)
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
