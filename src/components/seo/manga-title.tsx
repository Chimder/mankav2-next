import React from 'react'
import Head from 'next/head'
import { Manga, Relationship, Tag } from '@/shared/api/mangadex/generated'
import { getFirstTitle } from '@/shared/utils/get-first-title'

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://manka.vercel.app'
const IMG_PROXY = process.env.NEXT_PUBLIC_VITE_IMG_PROXY
const getCoverImage = (mangaId: string, relationships?: Relationship[]) => {
  if (!relationships) return `${BASE_URL}/favicon.ico`

  const coverArt = relationships.find(rel => rel.type === 'cover_art')
  return coverArt?.attributes?.fileName
    ? `${IMG_PROXY}/img/mangadex.org/covers/${mangaId}/${coverArt.attributes.fileName}.256.jpg`
    : `${BASE_URL}/favicon.ico`
}

const getAuthors = (relationships?: Relationship[]) => {
  if (!relationships) return ''
  return relationships
    .filter(rel => rel.type === 'author')
    .map(author => author.attributes?.name)
    .filter(Boolean)
    .join(', ')
}

const getTags = (tags?: Tag[]) => {
  if (!tags) return ''
  return tags
    .map(tag => tag.attributes?.name?.en)
    .filter(Boolean)
    .join(', ')
}

function SeoMangaTitle({ mangaData }: { mangaData: Manga }) {
  const attributes = mangaData?.attributes

  const title = getFirstTitle(attributes?.title)
  const description = attributes?.description?.en || ''
  const alternativeTitles = attributes?.altTitles
    ?.map(alt => Object.values(alt)[0])
    .join(', ')
  const authors = getAuthors(mangaData?.relationships)
  const tags = getTags(attributes?.tags)
  const status = attributes?.status
  const rating = attributes?.contentRating
  const year = attributes?.year
  const lastUpdated = attributes?.updatedAt
  const coverImage = getCoverImage(mangaData.id, mangaData?.relationships)
  const originalLanguage = attributes?.originalLanguage
  const demographic = attributes?.publicationDemographic
  return (
    <Head>
      <title>{`${title} | Manka`}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={`manga,${tags},${alternativeTitles}`} />
      <meta name="robots" content="index" />
      <meta name="author" content={authors} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.ico" />

      {/* Open Graph */}
      <meta property="og:title" content={`${title} | Manka`} />
      <meta property="og:description" content={description} />
      {/* <meta property="og:image" content={coverImage} /> */}
      <meta
        property="og:url"
        content={`${BASE_URL}/manga/title/${mangaData.id}`}
      />
      <meta property="og:type" content="article" />
      <meta property="og:site_name" content="Manka" />
      <meta property="og:locale" content="en_US" />
      <meta property="article:author" content={authors} />
      <meta property="article:published_time" content={attributes?.createdAt} />
      <meta property="article:modified_time" content={lastUpdated} />
      <meta property="article:section" content="Manga" />
      <meta property="article:tag" content={tags} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={`${title} | Manka`} />
      <meta name="twitter:site" content="Hikka" />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={coverImage} />

      <meta name="manga:status" content={status} />
      <meta name="manga:rating" content={rating} />
      <meta name="manga:year" content={year?.toString()} />
      <meta name="manga:language" content={originalLanguage} />
      <meta name="manga:demographic" content={demographic || ''} />
      <meta name="manga:alternative-titles" content={alternativeTitles} />

      <script type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Book',
          'name': title,
          'author': {
            '@type': 'Person',
            'name': authors,
          },
          'description': description,
          'image': coverImage,
          'datePublished': year,
          'dateModified': lastUpdated,
          'genre': tags,
          'inLanguage': originalLanguage,
          'publisher': 'Manka',
          'contentRating': rating,
        })}
      </script>
    </Head>
  )
}

export default SeoMangaTitle
