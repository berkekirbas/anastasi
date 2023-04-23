/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ["localhost", "anastasiabeautylab.com"],
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "8000",
        pathname: "/uploads/**",
      },
      {
        protocol: "https",
        hostname: "anastasiabeautylab.com",
        port: "443",
        pathname: "/system/public/uploads/**",
      },
    ],
    unoptimized: true,
  },
};

module.exports = nextConfig;
