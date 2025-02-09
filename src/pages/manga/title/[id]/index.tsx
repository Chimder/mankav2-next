/* eslint-disable @tanstack/query/exhaustive-deps */
import { GetStaticProps } from 'next'
import { getMangaId, MangaResponse } from '@/shared/api/mangadex/generated'
import { dehydrate, QueryClient } from '@tanstack/react-query'

import { mangaApi } from '@/hooks/api/mangadex/manga'
import Chapters from '@/components/Manga/title-info/chapters'
import Info from '@/components/Manga/title-info/info'
import SeoMangaTitle from '@/components/seo/manga-title'

export const getStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  }
}
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const queryClient = new QueryClient()
  const id = params?.id as string

  const mangaData = await getMangaId(
    id,
    { 'includes[]': ['manga', 'cover_art', 'author'] },
    { signal: null },
  )
  await queryClient.prefetchQuery({
    queryKey: [mangaApi.baseKey, id],
    queryFn: () => Promise.resolve(mangaData),
    // queryFn: ({ signal }) =>
    //   getMangaId(
    //     id,
    //     { 'includes[]': ['manga', 'cover_art', 'author'] },
    //     { signal },
    //   ),
  })

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      mangaData,
    },
    revalidate: 60 * 60 * 24 * 7,
  }
}

const MangaTitle = ({ mangaData }: { mangaData: MangaResponse }) => {
  return (
    <>
      <SeoMangaTitle mangaData={mangaData.data} />
      <div className="z-10 flex h-[calc(100vh-64px)] border-green-400 bg-black px-[2px] text-white md:h-full md:flex-col">
        <div className="filterBar order-2 flex w-2/5 flex-col overflow-hidden overflow-y-scroll md:order-1 md:w-full">
          <div className="flex w-full flex-col">
            <Info />
          </div>
        </div>
        <div className="relative flex w-3/5 flex-col rounded-lg border border-border bg-primary text-white md:order-2 md:w-full">
          <div className="flex-grow overflow-y-auto">
            <Chapters />
          </div>
        </div>
      </div>
    </>
  )
}

export default MangaTitle
