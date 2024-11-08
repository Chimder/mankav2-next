import { useRouter } from 'next/router'

import { chapterApi } from './chapter'

const useAggregateChapter = () => {
  const router = useRouter()
  const { data: aggregate } = chapterApi.useMangaAggregate(
    router?.query?.manga as string,
    router.query.lang as string,
  )
  const flatAggregate = Object.values(aggregate?.volumes || {})
    .map(volume => Object.values(volume.chapters || {}))
    .reduce((acc, chapters) => acc.concat(chapters), [])

  const currentChapterIndex = flatAggregate.findIndex(
    chap => chap.id === router.query.id,
  )
  console.log(currentChapterIndex)

  const nextChapter =
    currentChapterIndex !== -1 && currentChapterIndex < flatAggregate.length - 1
      ? flatAggregate[currentChapterIndex + 1]
      : undefined
  return { aggregate, nextChapter }
}

export default useAggregateChapter
