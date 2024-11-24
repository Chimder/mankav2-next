import { ReactNode, useRef, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { ChapterResponse } from '@/shared/api/swagger/generated'
import { cn } from '@/shared/lib/tailwind'
import { Button, Separator } from '@radix-ui/themes'

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
      className="fixed top-0 left-0 z-50 flex items-center justify-between w-screen h-[80px] py-0 px-10px text-white
    bg-gradient-to-b from-black to-[rgba(220,9,20,0)] transition ease-in duration-500"
      ref={modalRef}
    >
      <div className="flex items-center w-full">
        <Link className="mr-10 text-cyan-300 text-6xl font-logo" href={'/'}>
          <h1>ManKA</h1>
        </Link>

        <div className="flex flex-col p-5 text-white">
          <Link href={`/title/${mangaId}`}>{mangaTitle}</Link>
          <Button
            className="w-[80px] py-2 px-0 text-base text-amber-300 bg-black border-[1px] rounded-xs transition-all duration-200"
            onClick={toggleDropdown}
          >
            {chapterData?.data?.attributes?.chapter}
          </Button>
        </div>
      </div>
      <div className="relative center flex-col text-amber-300">
        <p>{currentPage}</p>
        <Separator className="w-full" color="yellow" />
        <p> {totalPages}</p>
      </div>

      {isOpenDrop && (
        <ul
          className="absolute scrollbar top-[-18px] left-0 z-[-1] flex flex-col items-center w-[400px] h-[130vh] p-0 overflow-scroll
          bg-black"
        >
          <div className="w-full pt-[140px]">
            {chapters.toReversed().map(({ chapter, count, id }) => (
              <Link
                className={cn(
                  'center w-[98%] p-2.5 m-1 text-white bg-transparent border-b-[1px] border-gray-600 rounded-sm hover:text-amber-300',
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
