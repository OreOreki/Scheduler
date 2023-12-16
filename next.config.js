/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 's4.anilist.co',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'bestwallpapers.in',
        port: '',
      }
    ],
  },
};

module.exports = nextConfig;
