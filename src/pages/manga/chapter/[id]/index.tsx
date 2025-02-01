import { ReactElement, useRef, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { PATH } from '@/shared/constants/path-constants'

import { chapterApi } from '@/hooks/api/mangadex/chapter'
import useAggregateChapter from '@/hooks/use-aggregate-chapter'
import usePageTrack from '@/hooks/use-chapter-tracker'
import ExternalChapter from '@/components/external-chapter'
import ModalChapter from '@/components/Manga/chapters/modal-chapter'

function MangaChapter() {
  const router = useRouter()
  const id = router.query?.id as string
  const lang = router.query?.lang as string
  const manga = router.query?.manga as string
  const name = router.query?.name as string

  const { data: chapters, isFetching } = chapterApi.useMangaChapterByID(
    id as string,
  )
  const { data: chapterData } = chapterApi.useMangaChapters(id as string)
  const { flatAggregate, nextChapter } = useAggregateChapter()

  console.log('CHA{', chapterData)
  const imageRefs = useRef<(HTMLDivElement | null)[]>([])
  const externalUrl = chapterData?.data?.attributes?.externalUrl
  const totalPages = chapters?.chapter?.data?.length || 0

  const { currentPage, setCurrentPage } = usePageTrack(imageRefs, totalPages)

  const [isOpen, setIsOpen] = useState(false)
  const handleModalChap = () => {
    console.log('opne')
    setIsOpen(!isOpen)
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
              {/* {!imageLoaded[index] && (
                <Skeleton className="h-[1100px] w-[1100px]" />
              )} */}
              <img
                onClick={() => handleModalChap()}
                src={`${process.env.NEXT_PUBLIC_VITE_IMG_PROXY!}/img/${encodeURIComponent(
                  `${chapters.baseUrl}/data/${chapters.chapter?.hash}/${chapter}`,
                )}`}
                width={1100}
                height={1100}
                loading="eager"
                alt="Manga page"
                // onLoad={() => handleImageLoad(index)}
                // onClick={isModalOpen ? closeModal : handleOpenModal}
                // onClick={handleOpenModal}
              />
            </div>
          </div>
        ))
      ) : (
        <ExternalChapter key={'ExternalChapter'} externalUrl={externalUrl} />
      )}

      <ModalChapter
        setIsOpen={setIsOpen}
        isOpen={isOpen}
        totalPages={totalPages}
        chapterData={chapterData}
        currentPage={currentPage.page}
        chapters={flatAggregate}
      />

      {chapters?.chapter?.data && chapters.chapter.data.length > 0 && (
        <div className="center mt-4 w-full">
          {!isFetching && nextChapter ? (
            <Link
              className="center flex h-10 w-1/2 rounded-sm border-2 border-blue-950 py-[34px] text-white hover:border-blue-700"
              href={`${PATH.MANGA.getChapterPath(
                nextChapter.id,
              )}?manga=${manga}&lang=${lang}&name=${name}`}
            >
              Next
            </Link>
          ) : (
            <Link
              className="center flex h-10 w-1/2 rounded-sm border-2 border-blue-950 py-[34px] text-white hover:border-blue-700"
              href={`${PATH.MANGA.getTitlePath(manga)}?name=${name}`}
            >
              Return to Manga
            </Link>
          )}
        </div>
      )}
    </div>
  )
}

MangaChapter.getLayout = function getLayout(page: ReactElement) {
  return <>{page}</>
}
export default MangaChapter
