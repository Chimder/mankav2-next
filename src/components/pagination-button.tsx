import { useRouter } from 'next/router'

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

  return (
    <div>
      {Array.from({ length: totalPages }, (_, index) => (
        <button
          key={index}
          onClick={() => handlePageChange(index + 1)}
          disabled={index + 1 === currentPage}
        >
          {index + 1}
        </button>
      ))}
    </div>
  )
}
