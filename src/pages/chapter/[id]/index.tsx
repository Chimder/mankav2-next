import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'

import { chapterApi } from '@/hooks/chapter'
import useAggregateChapter from '@/hooks/use-aggregate-chapter'

import s from './chapter.module.css'

function Chapter() {
  const router = useRouter()
  const { aggregate, nextChapter } = useAggregateChapter()

  console.log('AGggr', aggregate)
  console.log('NEXT', nextChapter)

  const { data: chapters } = chapterApi.useMangaChapterByID(
    router?.query?.id as string,
  )
  const [currentPage, setCurrentPage] = useState(1)
  const totalPages = chapters?.chapter?.data?.length || 0

  const imageRefs = useRef<(HTMLDivElement | null)[]>([])

  const handleScroll = () => {
    for (let i = 0; i < imageRefs.current.length; i++) {
      const imageRef = imageRefs.current[i]
      if (imageRef) {
        const rect = imageRef.getBoundingClientRect()
        if (
          rect.top <= window.innerHeight / 2 &&
          rect.bottom >= window.innerHeight / 2
        ) {
          setCurrentPage(i + 1)
          break
        }
      }
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [totalPages])

  return (
    <div className={s.chap}>
      <p className={s.current}>
        Страница {currentPage} из {totalPages}
      </p>
      {chapters?.chapter?.data?.map((chapter, index) => (
        <div
          className={s.chapImg}
          key={chapter}
          ref={el => {
            imageRefs.current[index] = el
          }}
        >
          <img
            src={`http://localhost:8080/img/${chapters.baseUrl}/data/${chapters.chapter?.hash}/${chapter}`}
            width={1200}
            height={800}
            loading="lazy"
            alt="Manga page"
          />
        </div>
      ))}
    </div>
  )
}

export default Chapter
