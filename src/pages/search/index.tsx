import { useRouter } from 'next/router'
import { OffsetFilter } from '@/shared/constants/filters'
import { useFilterStore } from '@/store/filter-slice'

import { mangaApi } from '@/hooks/api/manga'
import Cards from '@/components/cards/cards'
import { PaginationButtons } from '@/components/cards/pagination-button'
import { FilterMangaBar } from '@/components/filter-manga-bar/filter-manga-bar'

function SearchManga() {
  const router = useRouter()
  const currentPage = Number(router.query.page) || 1
  const input = useFilterStore().input
  const tags = useFilterStore().tags
  const status = useFilterStore().status
  const sortBy = useFilterStore().sortBy

  const { data: mangas, isFetching } = mangaApi.useMangaSearch({
    status,
    tags,
    name: input,
    offset: (currentPage - 1) * OffsetFilter,
    sortBy: { type: sortBy?.type, order: sortBy?.order },
  })

  console.log('mangaTotla', mangas?.total)
  return (
    <div className="flex flex-col items-center w-full py-[100px] bg-black">
      <div className="flex w-full">
        <Cards />
        <FilterMangaBar />
      </div>
    </div>
  )
}

export default SearchManga
