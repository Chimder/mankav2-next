import { useRouter } from 'next/router'

import { chapterApi } from './api/mangadex/chapter'

const useAggregateChapter = () => {
  const router = useRouter()
  const id = router.query.id as string
  const lang = router.query.lang as string
  const manga = router.query.manga as string

  const { data: aggregate } = chapterApi.useMangaAggregate(manga, lang)

  const flatAggregate = Object.values(aggregate?.volumes || {})
    .flatMap(volume => Object.values(volume.chapters || {}))
    .sort((a, b) => parseFloat(a.chapter ?? '0') - parseFloat(b.chapter ?? '0'))

  const currentChapterIndex = flatAggregate.findIndex(chap => chap.id === id)

  // const prewChapter =
  //   currentChapterIndex > 0 ? flatAggregate[currentChapterIndex - 1] : undefined

  const nextChapter =
    currentChapterIndex < flatAggregate.length - 1
      ? flatAggregate[currentChapterIndex + 1]
      : undefined

  return { flatAggregate, nextChapter }
}

export default useAggregateChapter
