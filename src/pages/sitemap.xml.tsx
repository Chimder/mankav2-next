import { GetServerSideProps } from 'next'

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://manka.vercel.app'

const generateSiteMap = () => {
  return `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
      <loc>${BASE_URL}</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
      <changefreq>weekly</changefreq>
      <priority>1.0</priority>
    <url>
      <loc>${BASE_URL}/favorites/lol</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
      <changefreq>weekly</changefreq>
      <priority>1.0</priority>
    </url>
    </url>
    <url>
      <loc>${BASE_URL}/manga/search</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
      <changefreq>weekly</changefreq>
      <priority>1.0</priority>
    </url>
    <url>
      <loc>${BASE_URL}/robots.txt</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
      <changefreq>weekly</changefreq>
      <priority>1.0</priority>
    </url>
    </urlset>`
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {

  const sitemap = generateSiteMap()

  res.setHeader('Content-Type', 'text/xml')
  res.write(sitemap)
  res.end()

  return {
    props: {},
  }
}

export default function Sitemap() {
  return null
}
