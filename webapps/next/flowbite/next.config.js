/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ["flowbite.com"],
  },
  reactStrictMode: true,
  swcMinify: true,
};

module.exports = nextConfig;
