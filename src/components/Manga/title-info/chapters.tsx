// import { Chapter } from '@/shared/api/mangadex/generated'
import { lazy } from 'react'
import { Chapter } from '@/shared/api/mangadex/generated'
import { OffsetFilterTitle } from '@/shared/constants/filters'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { Link, useParams, useSearchParams } from 'react-router-dom'

import { feedApi } from '@/hooks/api/mangadex/feeds'

import { Skeleton } from '../../ui/skeleton'
import { PATH } from '@/app/routers/path-constants'

const PaginationButtons = lazy(() => import('./pagination-title'))

dayjs.extend(relativeTime)

interface ExtendedChapter extends Chapter {
  attributes: Chapter['attributes'] & {
    allTranslatedChapter?: Chapter[]
  }
}

const Chapters = () => {
  const [searchParams] = useSearchParams()
  const { id: mangaId } = useParams()
  const name = searchParams.get('name')
  const currentPage = Number(searchParams.get('page')) || 1
  const { data: chapters, isFetching } = feedApi.useMangaFeed({
    id: mangaId?.toString(),
    offset: (currentPage - 1) * OffsetFilterTitle,
  })
  // console.log('CAHPDWA>>>%$#%#', chapters)

  function filterChapters(chapters: Chapter[] | undefined): ExtendedChapter[] {
    if (!chapters?.length) return []

    const groupedChapters = chapters.reduce(
      (acc, item) => {
        const chapterNumber = item.attributes?.chapter ?? '1'
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

  // console.log('CHA23432243', chapters?.data)
  const filteredChapters = filterChapters(chapters?.data)

  return (
    <div className="flex h-full flex-col">
      <div className="chapters-scrollbar flex-grow overflow-y-auto">
        <h1 className="mt-1 text-center text-xl text-lime-200">Chapters</h1>
        <ul className="w-full px-5">
          {isFetching ? (
            Array.from({ length: 16 }, (_, index) => (
              <div
                key={`skeletonTitle-${index}`}
                className="mx-0 my-1.5 flex h-[54px] border border-gray-600 p-1"
              >
                <Skeleton className="h-full w-full bg-slate-500" />
              </div>
            ))
          ) : filteredChapters.length ? (
            filteredChapters.map(chapter => (
              <div
                className="mx-0 my-1.5 flex min-h-[52px] flex-wrap border border-gray-900 p-1 text-lg hover:border-teal-300"
                key={chapter.id}
              >
                <div className="flex grow flex-wrap items-center">
                  <div>
                    Ch.{chapter.attributes?.chapter}{' '}
                    {chapter.attributes?.title
                      ? `- ${chapter.attributes.title}`
                      : ''}
                  </div>
                  <div className="ml-4 flex flex-wrap">
                    {chapter.attributes?.allTranslatedChapter?.map(chap => (
                      <Link
                        key={chap.id}
                        className="ml-4 cursor-pointer text-teal-300 hover:underline"
                        to={
                          chap.attributes?.externalUrl ??
                          `${PATH.MANGA.getChapterPath(chap.id)}?manga=${mangaId}&lang=${chap.attributes?.translatedLanguage}&name=${name}`
                        }
                      >
                        {chap.attributes?.translatedLanguage}
                      </Link>
                    ))}
                  </div>
                </div>

                <div className="ml-auto self-end text-right">
                  {chapter.attributes?.publishAt
                    ? dayjs(chapter.attributes.publishAt).fromNow()
                    : 'No data'}
                </div>
              </div>
            ))
          ) : (
            <div className="text-white">No chapters</div>
          )}
        </ul>
      </div>

      <div className="sticky bottom-0 left-0 right-0 z-10 backdrop-blur-sm">
        <PaginationButtons
          key="pagin-title"
          currentPage={currentPage}
          totalItems={chapters?.total}
        />
      </div>
    </div>
  )
}

export default Chapters
