import Link from 'next/link'
import { useRouter } from 'next/router'
import { cn } from '@/shared/lib/tailwind'
import clsx from 'clsx'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

import { feedApi } from '@/hooks/api/feeds'
import { mangaApi } from '@/hooks/api/manga'
import useAggregateChapter from '@/hooks/use-aggregate-chapter'

import s from './title.module.css'

function Title() {
  const path = useRouter()
  const mangaId = path?.query?.id as string
  const { data: chapters } = feedApi.useMangaFeed(mangaId)
  const { data: manga } = mangaApi.useMangaByID(mangaId)

  const backgroundImageUrl = `/api/proxy?url=https://mangadex.org/covers/${mangaId}/${
    manga?.data?.relationships?.find(obj => obj.type === 'cover_art')
      ?.attributes?.fileName
  }`
  //   const coverArt = manga?.data?.relationships?.find(obj => obj.type === 'cover_art')?.attributes?.fileName;
  // const backgroundImageUrl = coverArt ? `/api/proxy?url=https://mangadex.org/covers/${mangaId}/${coverArt}` : null;

  // const setChapterLang = useChapterStore().setChapterLanguage
  dayjs.extend(relativeTime)

  console.log('CHAPTErs', chapters)
  console.log('MNGAGA', manga)
  return (
    <div className="flex text-white bg-transparent">
      <section className="flex flex-col order-2 w-1/4">
        <div className="fixed">
          <img
            className="relative z-10"
            src={backgroundImageUrl}
            alt=""
            width={280}
            height={310}
          />
          <div className="">
            <div className="py-12 pl-12">
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

      <section className="w-3/5 text-white">
        <ul className="w-full p-5">
          {chapters?.data?.map(chapter => (
            <Link
              className="flex justify-between h-[52px] my-1.5 mx-0 text-lg border-1 border-gray-600 hover:bg-avocado-200 hover:text-black"
              href={
                chapter.attributes?.externalUrl ??
                `/chapter/${chapter.id}?manga=${path.query.id}&lang=${chapter.attributes?.translatedLanguage}`
              }
              key={chapter.id}
            >
              <div className="">
                Ch.{chapter.attributes?.chapter}{' '}
                {chapter.attributes?.title
                  ? `- ${chapter.attributes.title}`
                  : ''}
              </div>
              {chapter.attributes?.publishAt
                ? dayjs(chapter.attributes.publishAt).fromNow()
                : 'Дата неизвестна'}
              {/* <div className={s.publish}>{chapter.attributes?.publishAt}</div> */}
            </Link>
          ))}
        </ul>
      </section>
    </div>
  )
}

export default Title
