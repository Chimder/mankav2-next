import { useRouter } from 'next/router'
import clsx from 'clsx'

import s from './ui/button.module.css'

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
    <div>
      {pages.map((page, index) => (
        <button
          className={clsx(s.paginationBtn, page === currentPage && s.active)}
          key={index}
          onClick={() => handlePageChange(page)}
          disabled={page === currentPage}
        >
          {page}
        </button>
      ))}
    </div>
  )
}
