/* eslint-disable @tanstack/query/exhaustive-deps */
import { GetStaticProps } from 'next'
import { dehydrate, QueryClient } from '@tanstack/react-query'

import { aniwatchApi, instance } from '@/hooks/api/aniwatch/anime'
import { AnimeByIdType } from '@/hooks/api/aniwatch/types'
import AnimeTitleInfo from '@/components/Anime/anime-info/info'
import AnimeVideo from '@/components/Anime/anime-video/video'
import SeoAnimeTitle from '@/components/seo/anime-title'

export const getStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const queryClient = new QueryClient()
  const id = params?.id as string

  const animeData = (await instance.get<AnimeByIdType>(`/anime/${id}`)).data

  await queryClient.prefetchQuery({
    queryKey: [aniwatchApi.baseKey, 'info', id],
    queryFn: () => Promise.resolve(animeData),
  })
  //  res.setHeader(
  //   'Cache-Control',
  //   's-maxage=0, stale-while-revalidate=604800',
  // )
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      animeData,
    },
    revalidate: 60 * 60 * 24 * 7,
  }
}

const AnimeTitle = ({ animeData }: { animeData: AnimeByIdType }) => {
  return (
    <>
      <SeoAnimeTitle animeData={animeData} />
      <div className="z-10 flex h-[calc(100vh-64px)] border-green-400 bg-black text-white md:mx-1 md:h-full md:flex-col">
        <AnimeTitleInfo />
        <section className="relative ml-1 flex w-3/5 flex-col rounded-lg border border-border bg-primary text-white md:order-2 md:m-0 md:w-full">
          <AnimeVideo />
        </section>
      </div>
    </>
  )
}

export default AnimeTitle
