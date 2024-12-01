import Link from 'next/link'
import { useRouter } from 'next/router'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

import { feedApi } from '@/hooks/api/feeds'

import { Skeleton } from '../ui/skeleton'

type Props = {}

const Chapters = (props: Props) => {
  const path = useRouter()
  const mangaId = path?.query?.id as string
  const { data: chapters, isFetching } = feedApi.useMangaFeed(mangaId)

  dayjs.extend(relativeTime)

  return (
    <section className="w-3/5 border-[1px] border-green-400 text-white bg-black">
      <ul className="w-full p-5">
        {isFetching ? (
          Array.from({ length: 12 }, (_, index) => (
            <div
              key={`skeletonTitle-${index}`}
              className="flex p-1 border-[1px]  h-[52px] my-1.5 mx-0  border-gray-600 "
            >
              <Skeleton className="w-full h-full bg-slate-500" />
            </div>
          ))
        ) : chapters?.data?.length ? (
          chapters.data.map(chapter => (
            <Link
              className="flex p-1 border-[1px] justify-between h-[52px] my-1.5 mx-0 text-lg border-gray-600 hover:border-teal-300"
              href={
                chapter.attributes?.externalUrl ??
                `/chapter/${chapter.id}?manga=${path.query.id}&lang=${chapter.attributes?.translatedLanguage}`
              }
              key={chapter.id}
            >
              <div>
                Ch.{chapter.attributes?.chapter}{' '}
                {chapter.attributes?.title
                  ? `- ${chapter.attributes.title}`
                  : ''}
              </div>
              <div>
                {chapter.attributes?.publishAt
                  ? dayjs(chapter.attributes.publishAt).fromNow()
                  : 'No data'}
              </div>
            </Link>
          ))
        ) : (
          <div className="text-white">No chapters</div>
        )}
      </ul>
    </section>
  )
}

export default Chapters
