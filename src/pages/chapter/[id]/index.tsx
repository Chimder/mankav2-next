import { ReactElement, useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { chapterApi } from '@/hooks/chapter'
import useAggregateChapter from '@/hooks/use-aggregate-chapter'
import usePageTrack from '@/hooks/use-chapter-tracker'
import Skeleton from '@/components/ui/skeleton'
import ExternalChapter from '@/components/external-chapter'
import ModalChapter from '@/components/modal-chapter'

import s from './chapter.module.css'

function Chapter() {
  const router = useRouter()
  const lang = router.query?.lang as string
  const manga = router.query?.manga as string
  const id = router.query?.id as string
  const { flatAggregate, nextChapter } = useAggregateChapter()

  const { data: chapters, isFetching } = chapterApi.useMangaChapterByID(
    router.query?.id as string,
  )

  const { data: chapterData } = chapterApi.useMangaChapters(id)
  console.log('CHApterewsd', chapterData)
  const totalPages = chapters?.chapter?.data?.length || 0
  const externalUrl = chapterData?.data?.attributes?.externalUrl

  const imageRefs = useRef<(HTMLDivElement | null)[]>([])
  const [imageLoaded, setImageLoaded] = useState<boolean[]>([])

  const { currentPage, setCurrentPage } = usePageTrack(imageRefs, totalPages)

  useEffect(() => {
    if (chapters?.chapter?.data) {
      setImageLoaded(new Array(chapters.chapter.data.length).fill(false))
    }
  }, [chapters?.chapter?.data, router.query.id])

  const handleImageLoad = (index: number) => {
    setImageLoaded(prev => {
      const newImageLoaded = [...prev]
      newImageLoaded[index] = true
      return newImageLoaded
    })
  }

  const [isModalOpen, setIsModalOpen] = useState(false)
  const handleOpenModal = (e: React.MouseEvent<HTMLImageElement>) => {
    e.preventDefault()
    setIsModalOpen(true)
  }
  const closeModal = () => {
    setIsModalOpen(false)
  }

  return (
    <div className={s.chap}>
      {!externalUrl ? (
        chapters?.chapter?.data?.map((chapter, index) => (
          <div key={chapter}>
            <div
              className={s.chapImg}
              ref={el => {
                imageRefs.current[index] = el
              }}
            >
              {!imageLoaded[index] && (
                <Skeleton width={1100} height={1100} speed={'slow'} />
              )}
              <img
                src={`/api/proxy?url=${encodeURIComponent(`${chapters.baseUrl}/data/${chapters.chapter?.hash}/${chapter}`)}`}
                width={1100}
                height={1100}
                loading="lazy"
                alt="Manga page"
                onLoad={() => handleImageLoad(index)}
                onClick={isModalOpen ? closeModal : handleOpenModal}
                // onClick={handleOpenModal}
              />
            </div>
          </div>
        ))
      ) : (
        <ExternalChapter key={1} externalUrl={''} />
      )}

      <ModalChapter
        closeModal={closeModal}
        isOpenModal={isModalOpen}
        totalPages={totalPages}
        chapterData={chapterData}
        currentPage={currentPage.page}
        chapters={flatAggregate}
      />

      {!isFetching && nextChapter ? (
        <Link
          className={s.navigateChapterBtn}
          href={`/chapter/${nextChapter?.id}?manga=${manga}&lang=${lang}`}
          style={{
            display: imageLoaded.some(loaded => loaded) ? 'flex' : 'none',
          }}
        >
          Next
        </Link>
      ) : (
        <Link
          className={s.navigateChapterBtn}
          style={{
            display: imageLoaded.some(loaded => loaded) ? 'flex' : 'none',
          }}
          href={`/title/${manga}`}
        >
          Return to Manga
        </Link>
      )}
    </div>
  )
}

Chapter.getLayout = function getLayout(page: ReactElement) {
  return <>{page}</>
}
export default Chapter
