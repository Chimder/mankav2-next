import type { NextConfig } from 'next'

// const nextConfig: NextConfig = {
module.exports = {
  experimental: {
    reactCompiler: true,
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'Access-Control-Allow-Credentials', value: 'true' },
          { key: 'Access-Control-Allow-Origin', value: '*' },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET,OPTIONS,PATCH,DELETE,POST,PUT',
          },
          {
            key: 'Access-Control-Allow-Headers',
            value: '*',
          },
        ],
      },
    ]
  },
  async rewrites() {
    return {
      // beforeFiles: [
      //   {
      //     source: '/some-page',
      //     destination: '/somewhere-else',
      //     has: [{ type: 'query', key: 'overrideMe' }],
      //   },
      // ],
      fallback: [
        {
          source: '/proxy-api/:path*',
          destination: 'https://api.mangadex.org/:path*',
        },
      ],
    }
  },
}

// export default nextConfig
