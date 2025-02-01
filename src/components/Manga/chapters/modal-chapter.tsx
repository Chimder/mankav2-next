import { ReactNode, useLayoutEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import {
  ChapterResponse,
  LocalizedString,
} from '@/shared/api/mangadex/generated'
import { PATH } from '@/shared/constants/path-constants'
import { cn } from '@/shared/lib/tailwind'
import { getFirstTitle } from '@/shared/utils/get-first-title'

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from '../../ui/dialog'
import { Input } from '../../ui/input'

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
  totalPages: number
  isOpen?: boolean
  setIsOpen: (isOpen: boolean) => void
}

function ModalChapter({
  chapters,
  children,
  chapterData,
  setIsOpen,
  isOpen,
}: Props) {
  const router = useRouter()
  const chapterId = router.query.id as string
  const lang = router.query.lang as string
  const mangaId = router.query.manga as string

  const [searchPageQuery, setSearchPageQuery] = useState('')
  const [highlightedChapter, setHighlightedChapter] = useState<string | null>(
    null,
  )
  const refs = useRef<Record<string, HTMLDivElement | null>>({})
  useLayoutEffect(() => {
    const scrollToChapter = (chapter: string) => {
      const ref = refs.current[chapter]
      if (ref) {
        ref.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        })
        setHighlightedChapter(chapter)
      }
    }

    if (searchPageQuery && searchPageQuery !== '') {
      scrollToChapter(searchPageQuery)
    } else if (chapterData?.data?.attributes?.chapter) {
      scrollToChapter(chapterData.data.attributes.chapter)
    }

    return () => {
      setHighlightedChapter(null)
    }
  }, [chapterData?.data?.attributes?.chapter, searchPageQuery])

  if (!isOpen) return null
  const title = getFirstTitle(
    chapterData?.data?.relationships?.find(chap => chap.type === 'manga')
      ?.attributes?.title as LocalizedString,
  )
  const handleChapterClick = (id: string) => {
    setIsOpen(false)
    setSearchPageQuery('')
    router.push(
      `${PATH.MANGA.getChapterPath(id)}?manga=${mangaId}&lang=${lang}&name=${title}`,
    )
  }

  console.log('CHAP', chapterData)
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent className="h-[800px] max-w-[1224px] bg-black">
        <DialogTitle></DialogTitle>
        <div className="flex flex-col">
          <Link
            className="font-logo mr-10 cursor-pointer text-6xl text-cyan-300 decoration-cyan-300 hover:underline"
            href={PATH.HOME}
          >
            <h1 className="">MankA</h1>
          </Link>

          <Link
            className="mt-4 text-2xl text-white decoration-white hover:underline"
            href={`${PATH.MANGA.getTitlePath(mangaId)}?name=${title}`}
          >
            {title}
          </Link>
          <div className="center flex flex-col p-5 text-white">
            {chapterData?.data?.attributes?.chapter && (
              <Input
                value={searchPageQuery}
                onChange={e => setSearchPageQuery(e.target.value)}
                className="center w-36 bg-black text-center text-lg text-white"
              />
            )}
          </div>
        </div>
        <ul className="ml-2 flex w-full flex-col items-center overflow-scroll overflow-x-hidden bg-black md:ml-0">
          <div className="w-full">
            {chapters?.toReversed()?.map(({ chapter, count, id }) => (
              <div
                className={cn(
                  'center m-2 w-[98%] cursor-pointer rounded-sm border-[1px] border-gray-600 bg-transparent p-2.5 text-white hover:border-orange-600 hover:text-amber-300',
                  chapterId === id && 'border-orange-600 text-amber-300',
                  highlightedChapter === chapter && 'border-green-400',
                )}
                key={id}
                ref={el => {
                  if (chapter) refs.current[chapter] = el
                }}
                onClick={() => handleChapterClick(id!)}
              >
                <option value={`${count}`}>
                  Chapter {chapter == 'none' ? 1 : chapter}
                </option>
              </div>
            ))}
          </div>
        </ul>
      </DialogContent>
    </Dialog>
  )
}

export default ModalChapter
