import Link from 'next/link'
import { useRouter } from 'next/router'
import { Chapter } from '@/shared/api/swagger/generated'
import { useChapterStore } from '@/store/chapter-slice'

import { feedApi } from '@/hooks/feeds'
import Button from '@/components/ui/button'

function Title() {
  const path = useRouter()
  const { data: chapters } = feedApi.useMangaFeed(path.query.id as string)
  // const setChapterLang = useChapterStore().setChapterLanguage

  const navigateToChapter = (chapter: Chapter) => {
    // setChapterLang(chapter.attributes?.translatedLanguage)
    path.push(
      `/chapter/${chapter.id}?manga=${path.query.id}&lang=${chapter.attributes?.translatedLanguage}`,
    )
  }

  return (
    <div>
      <div>
        {chapters?.data?.map(chapter => (
          <div onClick={() => navigateToChapter(chapter)} key={chapter.id}>
            <div>chapter :{chapter.id}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Title
