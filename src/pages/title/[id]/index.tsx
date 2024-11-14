import { url } from 'inspector'
import Link from 'next/link'
import { useRouter } from 'next/router'

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

  console.log('LIAST', chapters)
  console.log('MNGAGA', manga)
  return (
    <div className={s.constainer}>
      <section className={s.rightPanel}>
        <img
          className={s.titleImg}
          src={backgroundImageUrl}
          alt=""
          width={280}
          height={310}
        />
        <div className={s.titleInfo}>
          <div className={s.into}>
            <div className={s.titleItem}>
              <span className={s.head}>Japanese:</span>
              <span className={s.name}>name</span>
            </div>
            <div className={s.titleItem}>
              <span className={s.head}>Created:</span>
              <span className={s.name}>00000</span>
            </div>
            <div className={s.titleItem}>
              <span className={s.head}>Premiered</span>
              <span className={s.name}>Fall 2024</span>
            </div>
            <div className={s.titleItem}>
              <span className={s.head}>Chapters</span>
              <span className={s.name}>130</span>
            </div>
            <div className={s.titleGenres}>
              <span className={s.head}>Genres</span>
              {manga?.data?.attributes?.tags?.slice(0, 5).map(tag => (
                <div className={s.tag} key={tag.id}>
                  {tag.attributes?.name?.en}
                </div>
              ))}
            </div>
            <div className={s.titleItem}>
              <span className={s.head}>Authore</span>
              <span className={s.name}>Ito</span>
            </div>
          </div>
        </div>
      </section>
      <div className={s.list}>
        {chapters?.data?.map(chapter => (
          <Link
            href={
              chapter.attributes?.externalUrl ??
              `/chapter/${chapter.id}?manga=${path.query.id}&lang=${chapter.attributes?.translatedLanguage}`
            }
            key={chapter.id}
          >
            <div>chapter :{chapter.id}</div>
            <div>& :{chapter.attributes?.chapter}</div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Title
