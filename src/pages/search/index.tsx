import { useRouter } from 'next/router'
import { OffsetFilter } from '@/shared/constants/filters'
import { useFilterStore } from '@/store/filter-slice'

import { mangaApi } from '@/hooks/api/manga'
import CardSwitcher from '@/components/card/card-switcher'
import { FilterManga } from '@/components/filter-bar/filter'
import { PaginationButtons } from '@/components/pagination-button'

import { queryClient } from '../_app'
import { Button } from '@/components/ui/button'

function SearchManga() {
  const router = useRouter()
  const currentPage = Number(router.query.page) || 1
  const input = useFilterStore().input
  const tags = useFilterStore().tags
  const status = useFilterStore().status
  const sortBy = useFilterStore().sortBy
  const reset = useFilterStore().reset

  const { data: mangas, isFetching } = mangaApi.useMangaSearch({
    status,
    tags,
    name: input,
    offset: (currentPage - 1) * OffsetFilter,
    sortBy: { type: sortBy?.type, order: sortBy?.order },
  })

  const Search = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    await queryClient.resetQueries({
      queryKey: [mangaApi.baseKey],
    })
  }

  const resetSearch = async () => {
    reset()
    await queryClient.resetQueries({
      queryKey: [mangaApi.baseKey],
    })
  }

  return (
    <div className="flex flex-col items-center w-full py-[100px] bg-black">
      <div className="flex w-full">
        <CardSwitcher isFetching={isFetching} mangas={mangas} />

        <div className="sticky filterBar top-0 right-1 flex flex-col gap-2.5 self-start w-[300px] h-screen p-2.5 overflow-y-scroll text-white bg-black">
            <div className="w-full flex">
              <Button
                className="w-8/12 py-2 mr-1  px-3  text-base cursor-pointer
                bg-green-400"
                onClick={e => Search(e)}
              >
                Search
              </Button>
              <Button
                onClick={() => resetSearch()}
                className="w-1/3 py-2  px-3 bg-red-500 text-base cursor-pointer "
              >
                Reset
              </Button>
            </div>
            <FilterManga />
        </div>
      </div>

      <PaginationButtons
        currentPage={currentPage}
        totalPages={Math.ceil(Number(mangas?.total) / OffsetFilter)}
      />
    </div>
  )
}

export default SearchManga
