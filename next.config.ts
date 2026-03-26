import type { NextConfig } from 'next';
import path from 'path';

const nextConfig: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  // Exclude nested esummit-nextjs project from parent's compilation
  webpack: (config) => {
    config.watchOptions = {
      ...config.watchOptions,
      ignored: [
        ...(Array.isArray(config.watchOptions?.ignored) ? config.watchOptions.ignored : []),
        path.join(__dirname, 'esummit-nextjs/**'),
      ],
    };
    return config;
  },
};

export default nextConfig;
