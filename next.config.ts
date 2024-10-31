/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production'
const nextConfig = {
  experimental: {
    reactCompiler: true,
  },
  async rewrites() {
    if (!isProd) {
      return [
        {
          source: '/proxy-api/:path*',
          destination: 'https://api.mangadex.org/:path*',
        },
      ]
    }
    return []
  },
}

module.exports = nextConfig
