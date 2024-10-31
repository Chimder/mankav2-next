import type { NextApiRequest, NextApiResponse } from 'next'
import { createProxyMiddleware } from 'http-proxy-middleware'

export const config = {
  api: {
    bodyParser: false,
  },
}

const proxy = createProxyMiddleware({
  target: 'https://api.mangadex.org',
  changeOrigin: true,
  pathRewrite: { '^/api/proxyApi': '' },
})

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  proxy(req, res, err => {
    if (err) {
      res.status(500).send('Proxy error')
    }
  })
}
