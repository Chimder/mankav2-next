import { PATH } from '@/app/routers/path-constants'
import { OffsetFilterTitle } from '@/shared/constants/filters'
import { cn } from '@/shared/lib/tailwind'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'

const PaginationButtons = ({
  currentPage = 1,
  itemsPerPage = OffsetFilterTitle,
  totalItems = 0,
}: {
  currentPage?: number
  itemsPerPage?: number
  totalItems?: number
}) => {
  const [searchParams] = useSearchParams()
  const name = searchParams.get('name')
  const { id } = useParams()
  const navigate = useNavigate()
  // const id = router.query.id as string

  const totalPages = Math.ceil(totalItems / itemsPerPage)

  if (totalPages <= 1 || !id) return null

  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
      navigate(`${PATH.MANGA.getTitlePath(id)}?name=${name}&page=${page}`)
    }
  }

  const getPageNumbers = () => {
    const maxButtons = 7
    const pageNumbers: number[] = []

    if (totalPages <= maxButtons) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i)
      }
    } else {
      pageNumbers.push(1)

      const start = Math.max(2, currentPage - 2)
      const end = Math.min(totalPages - 1, currentPage + 2)

      if (start > 2) {
        pageNumbers.push(-1)
      }

      for (let i = start; i <= end; i++) {
        pageNumbers.push(i)
      }

      if (end < totalPages - 1) {
        pageNumbers.push(-1)
      }

      pageNumbers.push(totalPages)
    }

    return pageNumbers
  }

  const pages = getPageNumbers()

  return (
    <div className="center mt-4">
      <div className="border-[1px] border-yellow-800 p-2">
        {pages &&
          pages.map((page, index) =>
            page === -1 ? (
              <span key={`ellipsis-${index}`} className="mx-2 text-gray-500">
                ...
              </span>
            ) : (
              <button
                className={cn(
                  'mx-1 rounded-lg bg-background bg-slate-400 px-4 py-2 text-white hover:bg-orange-700',
                  page == currentPage && '!bg-orange-400',
                )}
                key={page}
                onClick={() => handlePageChange(page)}
              >
                {page}
              </button>
            ),
          )}
      </div>
    </div>
  )
}
export default PaginationButtons
