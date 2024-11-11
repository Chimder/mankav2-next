import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { chapterApi } from '@/hooks/chapter'
import useAggregateChapter from '@/hooks/use-aggregate-chapter'
import Skeleton from '@/components/ui/skeleton'

import s from './chapter.module.css'

function Chapter() {
  const router = useRouter()
  const lang = router.query?.lang as string
  const manga = router.query?.manga as string
  const { aggregate, nextChapter } = useAggregateChapter()

  const { data: chapters, isFetching } = chapterApi.useMangaChapterByID(
    router?.query?.id as string,
  )
  const [currentPage, setCurrentPage] = useState(() => ({
    page: 1,
    chapterId: router.query.id,
  }))
  const totalPages = chapters?.chapter?.data?.length || 0

  const imageRefs = useRef<(HTMLDivElement | null)[]>([])

  const [imageLoaded, setImageLoaded] = useState<boolean[]>([])
  console.log('ImGLOAd', imageLoaded)

  useEffect(() => {
    if (chapters?.chapter?.data) {
      setImageLoaded(new Array(chapters.chapter.data.length).fill(false))
      // setImageLoaded([false])
    }
  }, [chapters?.chapter?.data, router.query.id])

  const handleImageLoad = (index: number) => {
    setImageLoaded(prev => {
      const newImageLoaded = [...prev]
      newImageLoaded[index] = true
      return newImageLoaded
    })
  }

  useEffect(() => {
    const handleScroll = () => {
      const newChapterId = router.query.id
      if (newChapterId !== currentPage.chapterId) {
        setCurrentPage({ page: 1, chapterId: newChapterId })
        return
      }

      for (let i = 0; i < imageRefs.current.length; i++) {
        const imageRef = imageRefs.current[i]
        if (imageRef) {
          const rect = imageRef.getBoundingClientRect()
          if (
            rect.top <= window.innerHeight / 2 &&
            rect.bottom >= window.innerHeight / 2
          ) {
            setCurrentPage(prev => ({ ...prev, page: i + 1 }))
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [currentPage.chapterId, router.query.id, totalPages])
  console.log('NEXT chap', nextChapter)

  return (
    <div className={s.chap}>
      <p className={s.current}>
        Img {currentPage.page} / {totalPages}
      </p>
      {chapters?.chapter?.data?.map((chapter, index) => (
        <div
          className={s.chapImg}
          key={chapter}
          ref={el => {
            imageRefs.current[index] = el
          }}
        >
          {!imageLoaded[index] && (
            <Skeleton width={1200} height={1100} speed={'slow'} />
          )}
          <img
            // src={`${process.env.NEXT_PUBLIC_IMG_PROXY}/img/${chapters.baseUrl}/data/${chapters.chapter?.hash}/${chapter}`}
            // src={`${process.env.NEXT_PUBLIC_IMG_PROXY}?url=${encodeURIComponent(`${chapters.baseUrl}/data/${chapters.chapter?.hash}/${chapter}`)}`}
            src={`/api/proxy?url=${encodeURIComponent(`${chapters.baseUrl}/data/${chapters.chapter?.hash}/${chapter}`)}`}
            loading="lazy"
            alt="Manga page"
            onLoad={() => handleImageLoad(index)}
          />
        </div>
      ))}
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

export default Chapter
