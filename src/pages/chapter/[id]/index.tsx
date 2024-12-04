import { ReactElement, useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { chapterApi } from '@/hooks/api/chapter'
import useAggregateChapter from '@/hooks/use-aggregate-chapter'
import usePageTrack from '@/hooks/use-chapter-tracker'
import { Skeleton } from '@/components/ui/skeleton'
import ExternalChapter from '@/components/external-chapter'
import ModalChapter from '@/components/modal/modal-chapter'

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
    <div className="center relative w-full flex-col bg-black">
      {/* <div className={s.current}>
        {currentPage.page} / {totalPages}
      </div> */}
      {!externalUrl ? (
        chapters?.chapter?.data?.map((chapter, index) => (
          <div key={chapter}>
            <div
              className="flex max-w-[1200px] flex-col items-center px-0 py-[14px]"
              ref={el => {
                imageRefs.current[index] = el
              }}
            >
              {!imageLoaded[index] && (
                <Skeleton className="h-[1100px] w-[1100px]" />
              )}
              <img
                src={`/api/proxy?url=${encodeURIComponent(`${chapters.baseUrl}/data/${chapters.chapter?.hash}/${chapter}`)}`}
                width={1100}
                height={1100}
                // loading="lazy"
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
          className="center flex h-10 w-full rounded-sm border-1 border-black bg-white py-[34px] text-black"
          href={`/chapter/${nextChapter?.id}?manga=${manga}&lang=${lang}`}
        >
          Next
        </Link>
      ) : (
        <Link
          className="center flex h-10 w-full rounded-sm border-1 border-black bg-white py-[34px] text-black"
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
