import { useRouter } from 'next/router'
import { cn } from '@/shared/lib/tailwind'

import { Button } from '../ui/button'

export const PaginationButtons = ({
  currentPage,
  totalPages,
}: {
  currentPage: number
  totalPages: number
}) => {
  const router = useRouter()

  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
      router.push(`/search?page=${page}`)
    }
  }

  const getPageNumbers = () => {
    const pageNumbers = []
    const maxButtons = 7

    pageNumbers.push(1)

    if (currentPage <= 4) {
      for (let i = 2; i < Math.min(totalPages, maxButtons); i++) {
        pageNumbers.push(i)
      }
    } else {
      pageNumbers.push(currentPage - 2, currentPage - 1, currentPage)
      if (currentPage + 1 < totalPages) pageNumbers.push(currentPage + 1)
      if (currentPage + 2 < totalPages) pageNumbers.push(currentPage + 2)
    }

    if (totalPages > 1) {
      pageNumbers.push(totalPages)
    }

    return pageNumbers
  }

  const pages = getPageNumbers()

  return (
    <div className="center mt-4 ">
      <div className="border-[1px] border-yellow-800 p-2">
        {pages.map((page, index) => (
          <Button
            // className={clsx(s.paginationBtn, page === currentPage && s.active)}
            className={cn(
              'hover:border-yellow-300 border-1 cursor-default mx-1', page===currentPage && "border-[1px] border-slate-400"
            )}
            key={index}
            onClick={() => handlePageChange(page)}
            disabled={page === currentPage}
          >
            {page}
          </Button>
        ))}
      </div>
    </div>
  )
}
