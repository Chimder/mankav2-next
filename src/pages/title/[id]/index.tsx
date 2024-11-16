import { url } from 'inspector'
import Link from 'next/link'
import { useRouter } from 'next/router'
import clsx from 'clsx'
import dayjs from 'dayjs'

import { feedApi } from '@/hooks/feeds'
import { mangaApi } from '@/hooks/manga'
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

  console.log('CHAPTErs', chapters)
  console.log('MNGAGA', manga)
  return (
    <div className={s.container}>
      <section className={s.rightPanel}>
        <div className={s.wrap}>
          <img src={backgroundImageUrl} alt="" width={280} height={310} />
          <div className={s.title}>
            <div className={s.into}>
              <div className={s.titleItem}>
                <span className={s.head}>Title:</span>
                <span className={clsx(s.name, s.nameTitle)}>
                  {manga?.data?.attributes?.title?.en}
                </span>
              </div>
              <div className={s.titleItem}>
                <span className={s.head}>Created:</span>
                <span className={s.name}>
                  {dayjs(manga?.data?.attributes?.createdAt).format('YYYY')}
                </span>
              </div>
              <div className={s.titleItem}>
                <span className={s.head}>Year:</span>
                <span className={s.name}>{manga?.data?.attributes?.year}</span>
              </div>
              <div className={s.titleItem}>
                <span className={s.head}>Chapters:</span>
                <span className={s.name}>{chapters?.data?.length}</span>
              </div>

              <div className={s.titleGenres}>
                <span className={s.head}>Status: </span>
                <div className={s.tag}>{manga?.data?.attributes?.status}</div>
              </div>
              <div className={s.titleGenres}>
                <span className={s.head}>Genres: </span>
                {manga?.data?.attributes?.tags?.slice(0, 5).map(tag => (
                  <div className={s.tag} key={tag.id}>
                    {tag.attributes?.name?.en}
                  </div>
                ))}
              </div>
              <div className={s.titleItem}>
                <span className={s.head}>Author</span>
                <span className={s.name}>
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

      <section className={s.chapterList}>
        <ul className={s.list}>
          {chapters?.data?.map(chapter => (
            <Link
              className={s.item}
              href={
                chapter.attributes?.externalUrl ??
                `/chapter/${chapter.id}?manga=${path.query.id}&lang=${chapter.attributes?.translatedLanguage}`
              }
              key={chapter.id}
            >
              <div className={s.title}>
                Ch.{chapter.attributes?.chapter}{' '}
                {chapter.attributes?.title
                  ? `- ${chapter.attributes.title}`
                  : ''}
              </div>
              <div className={s.publish}>{chapter.attributes?.publishAt}</div>
            </Link>
          ))}
        </ul>
      </section>
    </div>
  )
}

export default Title
