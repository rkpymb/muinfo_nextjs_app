/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['img.youtube.com', 'localhost','api.magadhuniversityinfo.com',],
    allowFutureImage: true
    
    
  },
  webpack: (config) => {
    config.resolve.fallback = { fs: false, module: false };
    return config;
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
}

module.exports = nextConfig
