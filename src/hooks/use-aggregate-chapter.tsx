import { useRouter } from 'next/router'

import { chapterApi } from './chapter'

const useAggregateChapter = () => {
  const router = useRouter()
  const lang = router.query?.lang as string
  const manga = router.query?.manga as string

  const { data: aggregate } = chapterApi.useMangaAggregate(manga, lang)

  const flatAggregate = Object.values(aggregate?.volumes || {})
    .map(volume => Object.values(volume.chapters || {}))
    .reduce((acc, chapters) => acc.concat(chapters), [])


  const currentChapterIndex = flatAggregate.findIndex(
    chap => chap.id === router.query.id,
  )

  // const prewChapter =
  //   currentChapterIndex > 0 ? flatAggregate[currentChapterIndex - 1] : undefined

  const nextChapter =
    currentChapterIndex < flatAggregate.length - 1
      ? flatAggregate[currentChapterIndex + 1]
      : undefined

  // console.log('CURChap', currentChapterIndex, 'andNEXT:', nextChapter)
  // console.log('AGGREAG', flatAggregate)
  // console.log('AGGREAG@@@', aggregate)

  return { flatAggregate, nextChapter }
}

export default useAggregateChapter
