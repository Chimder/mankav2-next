import { ReactNode, useRef, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { ChapterResponse } from '@/shared/api/swagger/generated'
import { Button } from '@radix-ui/themes'
import clsx from 'clsx'

import logo from '../assets/mangaLogo.png'
import s from './modal-capter.module.css'

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
    <div ref={modalRef} className={s.modal}>
      <div className={s.current}>
        {currentPage} / {totalPages}
      </div>

      <img
        className={s.logo}
        src={logo.src}
        width={400}
        height={300}
        alt="Logo"
      />

      <div className={s.select}>
        <Link className={s.link} href={`/title/${mangaId}`}>
          {mangaTitle}
        </Link>
        <Button onClick={toggleDropdown} className={s.selectBtn}>
          {chapterData?.data?.attributes?.chapter}
        </Button>
      </div>

      {isOpenDrop && (
        <ul className={s.list}>
          <div className={s.listWrap}>
            {chapters.toReversed().map(({ chapter, count, id }) => (
              <Link
                className={clsx(s.item, chapterId === id && s.active)}
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
