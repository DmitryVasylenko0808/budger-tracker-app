import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3000',
        pathname: '/avatars/**',
        search: '',
      },
      {
        protocol: 'https',
        port: '',
        hostname: 'avatars.githubusercontent.com',
        pathname: '/u/**',
        search: '?v=4',
      },
      {
        protocol: 'https',
        port: '',
        hostname: 'lh3.googleusercontent.com',
        pathname: '/a/**',
        search: '',
      },
    ],
  },
};

export default nextConfig;
