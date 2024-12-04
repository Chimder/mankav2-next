import { ReactNode, useRef, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { ChapterResponse } from '@/shared/api/swagger/generated'
import { cn } from '@/shared/lib/tailwind'
import { Separator } from '@radix-ui/themes'

import { Button } from '../ui/button'

type flatAggregate = {
  chapter?: string
  count?: number
  id?: string
  others?: string[]
}

type Props = {
  children?: ReactNode
  chapterData: ChapterResponse | undefined
  chapters: flatAggregate[]
  currentPage: number
  isOpenModal: boolean
  totalPages: number
  closeModal: () => void
}

function ModalChapter({
  isOpenModal,
  closeModal,
  chapters,
  currentPage,
  chapterData,
  totalPages,
}: Props) {
  const router = useRouter()
  const lang = router.query?.lang as string
  const chapterId = router.query?.id as string
  const mangaId = router.query?.manga as string
  const [isOpenDrop, setIsOpen] = useState(false)
  const title = chapterData?.data?.relationships?.find(
    chap => chap.type === 'manga',
  )?.attributes?.title

  const mangaTitle =
    title && typeof title === 'object' && 'en' in title
      ? (title.en as string | undefined)
      : undefined

  const modalRef = useRef<HTMLDivElement>(null)
  console.log('mangaID', mangaId)

  console.log('CHAPTREWE', chapterData)
  const toggleDropdown = () => {
    setIsOpen(prev => !prev)
  }

  if (!isOpenModal) return null

  return (
    <div
      className="px-10px fixed left-0 top-0 z-50 flex h-[80px] w-screen items-center justify-between bg-gradient-to-b from-black to-[rgba(220,9,20,0)] py-0 text-white transition duration-500 ease-in"
      ref={modalRef}
    >
      <div className="flex w-full items-center">
        <Link className="font-logo mr-10 text-6xl text-cyan-300" href={'/'}>
          <h1>ManKA</h1>
        </Link>

        <div className="flex flex-col p-5 text-white">
          <Link href={`/title/${mangaId}`}>{mangaTitle}</Link>
          <Button
            className="rounded-xs w-[80px] border-[1px] bg-black px-0 py-2 text-base text-amber-300 transition-all duration-200"
            onClick={toggleDropdown}
          >
            {chapterData?.data?.attributes?.chapter}
          </Button>
        </div>
      </div>
      <div className="center relative flex-col text-amber-300">
        <p>{currentPage}</p>
        <Separator className="w-full" color="yellow" />
        <p> {totalPages}</p>
      </div>

      {isOpenDrop && (
        <ul className="scrollbar absolute left-0 top-[-18px] z-[-1] flex h-[130vh] w-[400px] flex-col items-center overflow-scroll bg-black p-0">
          <div className="w-full pt-[140px]">
            {chapters.toReversed().map(({ chapter, count, id }) => (
              <Link
                className={cn(
                  'center m-1 w-[98%] rounded-sm border-b-[1px] border-gray-600 bg-transparent p-2.5 text-white hover:text-amber-300',
                  chapterId === id && 'text-amber-300',
                )}
                key={id}
                href={`/chapter/${id}?manga=${mangaId}&lang=${lang}`}
              >
                <option value={`${count}`}>Chapter {chapter}</option>
              </Link>
            ))}
          </div>
        </ul>
      )}
    </div>
  )
}

export default ModalChapter
