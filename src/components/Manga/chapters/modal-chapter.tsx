import { ReactNode, useLayoutEffect, useRef, useState } from 'react'
import {
  ChapterResponse,
  LocalizedString,
} from '@/shared/api/mangadex/generated'
import { cn } from '@/shared/lib/tailwind'
import { getFirstTitle } from '@/shared/utils/get-first-title'
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom'

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from '../../ui/dialog'
import { Input } from '../../ui/input'
import { PATH } from '@/app/routers/path-constants'

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
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { id: chapterId } = useParams()
  const lang = searchParams.get('lang')
  const mangaId = searchParams.get('manga')

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
    navigate(
      `${PATH.MANGA.getChapterPath(id)}?manga=${mangaId}&lang=${lang}&name=${title}`,
    )
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent className="h-[800px] max-w-[1224px] bg-black">
        <DialogTitle></DialogTitle>
        <div className="flex flex-col">
          <Link
            className="font-logo mr-10 cursor-pointer text-6xl text-cyan-300 decoration-cyan-300 hover:underline"
            to={PATH.HOME}
          >
            <h1 className="">MankA</h1>
          </Link>

          <Link
            className="mt-4 text-2xl text-white decoration-white hover:underline"
            to={`${PATH.MANGA.getTitlePath(mangaId)}?name=${title}`}
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
        <ul className="ml-2 flex w-full flex-col items-center overflow-scroll md:ml-0 overflow-x-hidden bg-black">
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
                <option value={`${count}`}>Chapter {chapter}</option>
              </div>
            ))}
          </div>
        </ul>
      </DialogContent>
    </Dialog>
  )
}

export default ModalChapter
