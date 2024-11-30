import Link from 'next/link'
import { useRouter } from 'next/router'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

import { feedApi } from '@/hooks/api/feeds'
import { mangaApi } from '@/hooks/api/manga'
import { Skeleton } from '@/components/ui/skeleton'

function Title() {
  const path = useRouter()
  const mangaId = path?.query?.id as string
  const { data: chapters, isFetching } = feedApi.useMangaFeed(mangaId)
  const { data: manga } = mangaApi.useMangaByID(mangaId)

  const backgroundImageUrl = `/api/proxy?url=https://mangadex.org/covers/${mangaId}/${
    manga?.data?.relationships?.find(obj => obj.type === 'cover_art')
      ?.attributes?.fileName
  }`

  // const setChapterLang = useChapterStore().setChapterLanguage

  dayjs.extend(relativeTime)
  console.log('TITITEL', chapters?.data)

  return (
    <div className="flex h-full border-green-400 w-full text-white ">
      <section className="flex flex-col order-2 w-1/3">
        <div className="fixed border-[1px] border-green-400 flex flex-col justify-center items-center">
          {/* <div className=''> */}
          <img
            className="relative w-[310px] h-[440px] z-10"
            src={backgroundImageUrl}
            alt=""
            // width={300}
            // height={340}
          />
          {/* </div> */}
          <div className="h-full flex">
            <div className="py-4 ">
              <div className="my-3 mx-0 text-sm">
                <span className="mr-1 mb-2.5 text-sm">Title:</span>
                <span className="text-base">
                  {manga?.data?.attributes?.title?.en}
                </span>
              </div>
              <div className="title">
                <span className="head">Created:</span>
                <span className="text-sm">
                  {dayjs(manga?.data?.attributes?.createdAt).format('YYYY')}
                </span>
              </div>
              <div className="title">
                <span className="head">Year:</span>
                <span className="text-sm">{manga?.data?.attributes?.year}</span>
              </div>
              <div className="title">
                <span className="head">Chapters:</span>
                <span className="text-sm">{chapters?.data?.length}</span>
              </div>

              <div className="titleGenres">
                <span className="head">Status: </span>
                <div className=" inline-block py-1 px-2 ml-[2px] mb-1 text-sm bg-transparent border-1 rounded-4xl">
                  {manga?.data?.attributes?.status}
                </div>
              </div>
              <div className="titleGenres">
                <span className="head">Genres: </span>
                {manga?.data?.attributes?.tags?.slice(0, 5).map(tag => (
                  <div
                    className="inline-block py-1 px-2 ml-[2px] mb-1 text-sm bg-transparent border-1 rounded-4xl"
                    key={tag.id}
                  >
                    {tag.attributes?.name?.en}
                  </div>
                ))}
              </div>
              <div className="title">
                <span className="head">Author</span>
                <span className="text-sm">
                  {
                    manga?.data?.relationships?.find(
                      obj => obj.type == 'author',
                    )?.attributes?.name as string
                  }
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

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
          ) : // <Skeleton />
          chapters?.data?.length ? (
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
    </div>
  )
}

export default Title
