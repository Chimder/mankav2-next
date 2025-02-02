import React from 'react'
import Head from 'next/head'

import { AnimeByIdType } from '@/hooks/api/aniwatch/types'

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://manka.vercel.app'

function SeoAnimeTitle({ animeData }: { animeData: AnimeByIdType }) {
  const anime = animeData?.data.anime
  const info = anime?.info
  const moreInfo = anime?.moreInfo

  const title = info?.name || 'Unknown Anime'
  const description = info?.description || 'No description available.'
  const poster = info?.poster || `${BASE_URL}/favicon.ico`
  const genres = moreInfo?.genres?.join(', ') || ''
  const studios = moreInfo?.studios || ''
  const producers = moreInfo?.producers?.join(', ') || ''
  const aired = moreInfo?.aired || ''
  const malId = info?.malId ? `https://myanimelist.net/anime/${info.malId}` : ''
  const anilistId = info?.anilistId
    ? `https://anilist.co/anime/${info.anilistId}`
    : ''

  return (
    <Head>
      <title>{`${title} | Manka`}</title>
      <meta name="description" content={description} key="description" />
      <meta name="keywords" content={`anime, ${genres}, ${title}`} />
      <meta name="robots" content="index" />
      <meta name="author" content={studios || producers} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.ico" />

      <meta property="og:title" content={`${title} | Manka`} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={poster} />
      <meta property="og:url" content={`${BASE_URL}/anime/title/${info?.id}`} />
      <meta property="og:type" content="article" />
      <meta property="og:site_name" content="Manka" />
      <meta property="og:locale" content="en_US" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={`${title} | Manka`} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={poster} />

      <meta name="anime:aired" content={aired} />
      <meta name="anime:genres" content={genres} />
      <meta name="anime:studios" content={studios} />
      <meta name="anime:producers" content={producers} />
      <meta name="anime:malId" content={malId} />
      <meta name="anime:anilistId" content={anilistId} />

      <script type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'TVSeries',
          'name': title,
          'description': description,
          'image': poster,
          'genre': genres,
          'productionCompany': studios,
          'producer': producers,
          'datePublished': aired,
          'identifier': [
            { '@type': 'PropertyValue', 'propertyID': 'MAL', 'value': malId },
            {
              '@type': 'PropertyValue',
              'propertyID': 'AniList',
              'value': anilistId,
            },
          ],
        })}
      </script>
    </Head>
  )
}

export default SeoAnimeTitle
