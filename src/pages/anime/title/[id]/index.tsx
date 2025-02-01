import { GetServerSideProps } from 'next'
import { dehydrate, QueryClient } from '@tanstack/react-query'

import { aniwatchApi, instance } from '@/hooks/api/aniwatch/anime'
import { AnimeByIdType } from '@/hooks/api/aniwatch/types'
import AnimeTitleInfo from '@/components/Anime/anime-info/info'
import AnimeVideo from '@/components/Anime/anime-video/video'

// export const getServerSideProps: GetServerSideProps = async ({
//   req,
//   res,
//   params,
// }) => {
//   const queryClient = new QueryClient()

//   const id = params?.id as string
//   await queryClient.prefetchQuery({
//     queryKey: [aniwatchApi.baseKey, 'info', id],
//     queryFn: async ({ signal }) => {
//       const res = await instance.get<AnimeByIdType>(`/anime/${id}`, {
//         signal,
//       })
//       return res.data
//     },
//   })
//   // res.setHeader(
//   //   'Cache-Control',
//   //   'public, max-age=900, stale-while-revalidate=59',
//   // )
//   return {
//     props: {
//       dehydratedState: dehydrate(queryClient),
//     },
//   }
// }

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
