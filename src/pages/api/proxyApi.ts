import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { url, ...query } = req.query

  // Проверяем наличие URL параметра
  if (!url || typeof url !== 'string') {
    return res.status(400).json({ error: 'URL is required' })
  }

  try {
    const response = await axios({
      url: `https://api.mangadex.org${url}`,
      method: req.method,
      headers: { ...req.headers, host: undefined },
      params: query,
      data: req.body,
    })

    // Object.entries(response.headers).forEach(([key, value]) => {
    //   res.setHeader(key, String(value))
    // })
    res.status(response.status).send(response.data)
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      res.status(error.response.status).json({ error: error.response.data })
    } else {
      res.status(500).json({ error: 'Failed to fetch data' })
    }
  }
}
