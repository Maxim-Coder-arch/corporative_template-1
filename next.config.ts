import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ['cdn.example.com'], // если картинки с внешнего CDN
    // или для всех внешних доменов:
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // разрешает все домены (небезопасно, но для dev ок)
      },
    ],
  },
};

export default nextConfig;
