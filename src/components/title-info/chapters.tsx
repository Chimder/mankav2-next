import Link from 'next/link'
import { useRouter } from 'next/router'
import { Chapter } from '@/shared/api/swagger/generated'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

import { feedApi } from '@/hooks/api/feeds'
import { mangaApi } from '@/hooks/api/manga'

import { Skeleton } from '../ui/skeleton'

interface ExtendedChapter extends Chapter {
  attributes: Chapter['attributes'] & {
    allTranslatedChapter?: Chapter[]
  }
}
type Props = {}

const Chapters = (props: Props) => {
  const path = useRouter()
  const mangaId = path?.query?.id as string
  // const { data: manga } = mangaApi.useMangaByID(mangaId)
  const { data: chapters, isFetching } = feedApi.useMangaFeed(mangaId)
  // const currentLang = manga?.data?.attributes?.availableTranslatedLanguages

  // function Filter(chapters: Chapter[] | undefined) {
  function Filter(chapters: Chapter[] | undefined): ExtendedChapter[] {
    if (!chapters) return []

    const groupedChapters = chapters.reduce(
      (acc, item) => {
        const chapterNumber = item.attributes?.chapter

        if (!chapterNumber) return acc

        if (!acc[chapterNumber]) {
          acc[chapterNumber] = {
            ...item,
            attributes: {
              ...item.attributes,
              allTranslatedChapter: [],
            },
          }
        }

        acc[chapterNumber].attributes?.allTranslatedChapter?.push(item)

        return acc
      },
      {} as Record<string, ExtendedChapter>,
    )

    return Object.values(groupedChapters).sort((a, b) => {
      const chapterA = parseFloat(a.attributes.chapter || '0')
      const chapterB = parseFloat(b.attributes.chapter || '0')
      return chapterB - chapterA
    })
  }
  const filteredChapters = Filter(chapters?.data)
  console.log('FILTE??????', filteredChapters)

  dayjs.extend(relativeTime)

  return (
    <section className="w-3/5 border-[1px] border-green-400 bg-black text-white">
      <ul className="w-full p-5">
        {isFetching ? (
          Array.from({ length: 12 }, (_, index) => (
            <div
              key={`skeletonTitle-${index}`}
              className="mx-0 my-1.5 flex h-[52px] border-[1px] border-gray-600 p-1"
            >
              <Skeleton className="h-full w-full bg-slate-500" />
            </div>
          ))
        ) : filteredChapters?.length ? (
          filteredChapters.map(chapter => (
            <Link
              className="mx-0 my-1.5 flex h-[52px] justify-between border-[1px] border-gray-600 p-1 text-lg hover:border-teal-300"
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
              {chapter.attributes?.allTranslatedChapter?.map(chap => (
                <div key={chap.id}>
                  <div>{chap.attributes?.translatedLanguage}</div>
                </div>
              ))}
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
