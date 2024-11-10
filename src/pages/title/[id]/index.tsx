import Link from 'next/link'
import { useRouter } from 'next/router'

import { feedApi } from '@/hooks/feeds'
import useAggregateChapter from '@/hooks/use-aggregate-chapter'
import s from "./title.module.css"

function Title() {
  const path = useRouter()
  const { data: chapters } = feedApi.useMangaFeed(path.query.id as string)
  // const setChapterLang = useChapterStore().setChapterLanguage

  console.log('LIAST', chapters)
  return (
    <div className={s.constainer}>
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
