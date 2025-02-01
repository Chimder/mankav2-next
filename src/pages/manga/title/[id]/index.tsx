import { GetServerSideProps } from 'next'
import { getMangaId } from '@/shared/api/mangadex/generated'
import { dehydrate, QueryClient } from '@tanstack/react-query'

import { mangaApi } from '@/hooks/api/mangadex/manga'
import Chapters from '@/components/Manga/title-info/chapters'
import Info from '@/components/Manga/title-info/info'

// export const headers: HeadersFunction = () => {
//   return {
//     'Cache-Control': 'public, max-age=900',
//   }
// }
// export async function loader({ params }: LoaderFunctionArgs) {
//   const queryClient = new QueryClient()
//   const id = params.id as string

//   return json({ dehydratedState: dehydrate(queryClient) })
// }
// export const getServerSideProps: GetServerSideProps = async ({
//   req,
//   res,
//   params,
// }) => {
//   const queryClient = new QueryClient()
//   const id = params?.id as string

//   await queryClient.prefetchQuery({
//     queryKey: [mangaApi.baseKey, id],
//     queryFn: ({ signal }) =>
//       getMangaId(
//         id,
//         { 'includes[]': ['manga', 'cover_art', 'author'] },
//         { signal },
//       ),
//   })
//   res.setHeader(
//     'Cache-Control',
//     'public, max-age=900, stale-while-revalidate=59',
//   )
//   return {
//     props: {
//       dehydratedState: dehydrate(queryClient),
//     },
//   }
// }

const MangaTitle = () => {
  return (
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
  )
}

export default MangaTitle
