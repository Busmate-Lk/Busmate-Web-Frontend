import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    rules: {
      '*.woff2': ['file-loader'],
      '*.woff': ['file-loader'],
      '*.ttf': ['file-loader'],
      '*.eot': ['file-loader'],
    }
  }
};

export default nextConfig;
