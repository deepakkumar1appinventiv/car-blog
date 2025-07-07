/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  eslint: {
    ignoreDuringBuilds: false,
  },
  images: { 
    unoptimized: true,
    domains: ['images.unsplash.com']
  },
  experimental: {
    optimizePackageImports: ['lucide-react']
  }
};

module.exports = nextConfig;