import { RefObject, useEffect, useState } from 'react'
import { useRouter } from 'next/router'

interface CurrentPage {
  page: number
  chapterId: string | string[] | undefined
}

function usePageTrack(
  imageRefs: RefObject<(HTMLDivElement | null)[]>,
  totalPages: number,
) {
  // const router = useRouter()
  const router = useRouter()
  const id = router.query.id as string
  const [currentPage, setCurrentPage] = useState<CurrentPage>({
    page: 1,
    chapterId: id,
  })

  useEffect(() => {
    const handleScroll = () => {
      const newChapterId = id
      if (newChapterId !== currentPage.chapterId) {
        setCurrentPage({ page: 1, chapterId: newChapterId })
        return
      }

      if (imageRefs.current) {
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
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [currentPage.chapterId, id, imageRefs])

  return { currentPage, setCurrentPage }
}

export default usePageTrack
