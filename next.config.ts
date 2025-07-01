import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    turbo: {
      rules: {
        // Disable turbopack for font imports to avoid the resolution error
        '*.woff2': ['file-loader'],
        '*.woff': ['file-loader'],
        '*.ttf': ['file-loader'],
        '*.eot': ['file-loader'],
      }
    }
  }
};

export default nextConfig;
