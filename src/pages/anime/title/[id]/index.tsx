import { GetServerSideProps, GetStaticProps } from 'next'
import { dehydrate, QueryClient } from '@tanstack/react-query'

import { aniwatchApi, instance } from '@/hooks/api/aniwatch/anime'
import { AnimeByIdType } from '@/hooks/api/aniwatch/types'
import AnimeTitleInfo from '@/components/Anime/anime-info/info'
import AnimeVideo from '@/components/Anime/anime-video/video'

export const getStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const queryClient = new QueryClient()

  const id = params?.id as string
  await queryClient.prefetchQuery({
    queryKey: [aniwatchApi.baseKey, 'info', id],
    queryFn: async ({ signal }) => {
      const res = await instance.get<AnimeByIdType>(`/anime/${id}`, {
        signal,
      })
      return res.data
    },
  })
  //  res.setHeader(
  //   'Cache-Control',
  //   's-maxage=0, stale-while-revalidate=604800',
  // )
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
    revalidate: 60 * 60 * 24 * 7,
  }
}

const AnimeTitle = () => {
  return (
    <div className="z-10 flex h-[calc(100vh-64px)] border-green-400 bg-black text-white md:mx-1 md:h-full md:flex-col">
      <AnimeTitleInfo />
      <section className="relative ml-1 flex w-3/5 flex-col rounded-lg border border-border bg-primary text-white md:order-2 md:m-0 md:w-full">
        <AnimeVideo />
      </section>
    </div>
  )
}

export default AnimeTitle
