import { GetServerSideProps } from 'next'
import { dehydrate, QueryClient } from '@tanstack/react-query'

import { aniwatchApi, instance } from '@/hooks/api/aniwatch/anime'
import { AnimeByIdType } from '@/hooks/api/aniwatch/types'
import AnimeTitleInfo from '@/components/Anime/anime-info/info'
import AnimeVideo from '@/components/Anime/anime-video/video'

export const getServerSideProps: GetServerSideProps = async ({
  req,
  res,
  params,
}) => {
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
  // res.setHeader(
  //   'Cache-Control',
  //   'public, max-age=900, stale-while-revalidate=59',
  // )
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  }
}

const AnimeTitle = () => {
  return (
    <div className="flex h-[calc(100vh-64px)] w-full bg-black">
      <AnimeTitleInfo />
      <section className="relative flex w-3/5 flex-col border border-green-400 text-white">
        <AnimeVideo />
      </section>
    </div>
  )
}

export default AnimeTitle
