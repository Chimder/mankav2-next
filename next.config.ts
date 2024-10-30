import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // reactStrictMode: true,
  experimental: {
    reactCompiler: true,
  },
  async rewrites() {
    return [
      {
        source: '/proxy-api/:path*',
        destination: 'https://api.mangadex.org/:path*',
      },
    ]
  },
}

export default nextConfig
