import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable React strict mode for better development safety
  reactStrictMode: true,

  // Experimental features
  experimental: {
    // Optimize package imports to reduce bundle size for large libraries
    optimizePackageImports: [
      "lucide-react",
      "framer-motion",
      "@radix-ui/react-slot",
    ],
  },
  turbopack: {},

  // Image optimization
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "ik.imagekit.io" },
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "i.pinimg.com" },
      // Django backend media files (local dev)
      { protocol: "http", hostname: "127.0.0.1", port: "8000" },
      { protocol: "http", hostname: "localhost", port: "8000" },
    ],
  },

  // Webpack customization for Three.js and performance
  webpack: (config, { isServer }) => {
    // Exclude Three.js from server-side rendering bundle
    if (isServer) {
      config.externals = [
        ...(Array.isArray(config.externals) ? config.externals : []),
        "three",
        "@react-three/fiber",
        "@react-three/drei",
      ];
    }

    // Optimize Three.js chunking strategy
    config.optimization = {
      ...config.optimization,
      splitChunks: {
        ...(config.optimization?.splitChunks || {}),
        chunks: "all",
        cacheGroups: {
          ...(
            typeof config.optimization?.splitChunks === "object"
              ? config.optimization.splitChunks?.cacheGroups
              : {}
          ),
          three: {
            name: "three",
            test: /[\\/]node_modules[\\/](three|@react-three)[\\/]/,
            chunks: "all",
            priority: 30,
          },
          framerMotion: {
            name: "framer-motion",
            test: /[\\/]node_modules[\\/]framer-motion[\\/]/,
            chunks: "all",
            priority: 20,
          },
        },
      },
    };

    return config;
  },

  // Headers for security and performance
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
      {
        // Cache static assets aggressively
        source: "/static/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
