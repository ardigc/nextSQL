/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ardigc.blob.core.windows.net',
        pathname: '/images/**',
      },
    ],
  },
};

module.exports = nextConfig;
