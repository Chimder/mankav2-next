import { GetServerSideProps } from 'next'

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://manka.vercel.app'

const generateRobotsTxt = () => {
  return `User-agent: *
Disallow: /admin/
Disallow: /favorites

Sitemap: ${BASE_URL}/sitemap.xml
`
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const robotsTxt = generateRobotsTxt()

  res.setHeader('Content-Type', 'text/plain')
  res.write(robotsTxt)
  res.end()

  return {
    props: {},
  }
}

export default function Robots() {
  return null
}
