import { useEffect, useLayoutEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/router'
import { OffsetFilterTitle } from '@/shared/constants/filters'
import { cn } from '@/shared/lib/tailwind'

import { Button } from '../ui/button'

export const PaginationButtons = ({
  currentPage = 1,
  itemsPerPage = OffsetFilterTitle,
  totalItems = 0,
}: {
  currentPage?: number
  itemsPerPage?: number
  totalItems?: number
}) => {
  const router = useRouter()
  const computedTotalPages = Math.ceil(totalItems / itemsPerPage)
  const id = router.query.id as string

  if (computedTotalPages <= 1) return null

  const handlePageChange = (page: number) => {
    if (page > 0 && page <= computedTotalPages) {
      router.push(`/title/${id}?page=${page}`)
    }
  }

  const getPageNumbers = () => {
    const maxButtons = 7
    const pageNumbers: number[] = []

    if (computedTotalPages <= maxButtons) {
      for (let i = 1; i <= computedTotalPages; i++) {
        pageNumbers.push(i)
      }
    } else {
      pageNumbers.push(1)

      const start = Math.max(2, currentPage - 2)
      const end = Math.min(computedTotalPages - 1, currentPage + 2)

      if (start > 2) {
        pageNumbers.push(-1)
      }

      for (let i = start; i <= end; i++) {
        pageNumbers.push(i)
      }

      if (end < computedTotalPages - 1) {
        pageNumbers.push(-1)
      }

      pageNumbers.push(computedTotalPages)
    }

    return pageNumbers
  }

  const pages = getPageNumbers()

  return (
    <div className="center mt-4">
      <div className="border-[1px] border-yellow-800 p-2">
        {pages.map((page, index) =>
          page === -1 ? (
            <span key={`ellipsis-${index}`} className="mx-2 text-gray-500">
              ...
            </span>
          ) : (
            <Button
              className={cn(
                'mx-1 border text-white hover:border-yellow-300',
                page === currentPage &&
                  'border-[1px] border-slate-400 bg-yellow-500',
              )}
              key={page}
              onClick={() => handlePageChange(page)}
              disabled={page === currentPage}
            >
              {page}
            </Button>
          ),
        )}
      </div>
    </div>
  )
}
