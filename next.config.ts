import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // reactStrictMode: true,
  experimental: {
    reactCompiler: true,
  },
  async headers() {
    return [
      {
        source: 'https://api.mangadex.org:path*',
        headers: [
          { key: 'Access-Control-Allow-Credentials', value: 'true' },
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET,OPTIONS,POST' },
          {
            key: 'Access-Control-Allow-Headers',
            value: 'Content-Type, Authorization',
          },
        ],
      },
    ]
  },
  // async rewrites() {
  //   return [
  //     {
  //       source: '/proxy-api/:path*',
  //       destination: 'https://api.mangadex.org/:path*',
  //     },
  //   ]
  // },
}

export default nextConfig
