import { ReactNode, useEffect, useLayoutEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { ChapterResponse } from '@/shared/api/swagger/generated'
import { cn } from '@/shared/lib/tailwind'

import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '../ui/dialog'
import { Input } from '../ui/input'

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
}

function ModalChapter({ chapters, children, chapterData }: Props) {
  const router = useRouter()
  const lang = router.query?.lang as string
  const chapterId = router.query?.id as string
  const mangaId = router.query?.manga as string

  const [searchPageQuery, setSearchPageQuery] = useState('')
  const [highlightedChapter, setHighlightedChapter] = useState<string | null>(
    null,
  )
  const refs = useRef<Record<string, HTMLAnchorElement | null>>({})
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
  }, [chapterData?.data?.attributes?.chapter, searchPageQuery])
  console.log('SAEDaDad', searchPageQuery)

  const title = chapterData?.data?.relationships?.find(
    chap => chap.type === 'manga',
  )?.attributes?.title

  const mangaTitle =
    title && typeof title === 'object' && 'en' in title
      ? (title.en as string | undefined)
      : undefined

  return (
    <Dialog>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent className="h-[800px] max-w-[1224px] bg-black">
        <DialogTitle></DialogTitle>
        <div className="flex flex-col">
          <Link
            className="font-logo mr-10 cursor-pointer text-6xl text-cyan-300 decoration-cyan-300 hover:underline"
            href={'/'}
          >
            <h1 className="">MankA</h1>
          </Link>

          <Link
            className="mt-4 text-2xl text-white decoration-white hover:underline"
            href={`/title/${mangaId}`}
          >
            {mangaTitle}
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
        <ul className="ml-4 flex w-full flex-col items-center overflow-scroll overflow-x-hidden bg-black">
          <div className="w-full">
            {chapters.toReversed().map(({ chapter, count, id }, index) => (
              <Link
                className={cn(
                  'center m-2 w-[98%] rounded-sm border-[1px] border-gray-600 bg-transparent p-2.5 text-white hover:border-orange-600 hover:text-amber-300',
                  chapterId === id && 'border-orange-600 text-amber-300',
                  highlightedChapter === chapter && 'border-green-400',
                )}
                key={id}
                ref={el => {
                  if (chapter) refs.current[chapter] = el
                }}
                href={`/chapter/${id}?manga=${mangaId}&lang=${lang}`}
              >
                <option value={`${count}`}>Chapter {chapter}</option>
              </Link>
            ))}
          </div>
        </ul>
      </DialogContent>
    </Dialog>
  )
}

export default ModalChapter
