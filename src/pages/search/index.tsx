import Link from 'next/link'
import { useRouter } from 'next/router'
import { OffsetFilter } from '@/shared/constants/filters'
import { useFilterStore } from '@/store/filter-slice'
import { Button, Skeleton } from '@radix-ui/themes'

import { mangaApi } from '@/hooks/api/manga'
import CardSwitcher from '@/components/card/card-switcher'
import { FilterManga } from '@/components/filter-bar/filter'
import { PaginationButtons } from '@/components/pagination-button'

import { queryClient } from '../_app'
import s from './search.module.css'

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
    <div className={s.container}>
      <div className={s.content}>
        <CardSwitcher isFetching={isFetching} mangas={mangas} />

        <div className={s.filterBar}>
          <div className={s.wrap}>
            <div className={s.btnWrap}>
              <Button
                className={s.search}
                variant="surface"
                color="green"
                onClick={e => Search(e)}
              >
                Search
              </Button>
              <Button
                variant="surface"
                color="red"
                onClick={() => resetSearch()}
                className={s.reset}
              >
                Reset
              </Button>
            </div>
            <FilterManga />
          </div>
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
