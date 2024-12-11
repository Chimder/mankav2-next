import { useRouter } from 'next/router'
import Icons from '@/assets/svg/icons'
import { OffsetFilter } from '@/shared/constants/filters'
import { cn } from '@/shared/lib/tailwind'
import { useCardSwitcherStore } from '@/store/card-switcher'
import { useFilterStore } from '@/store/filter-slice'

import { mangaApi } from '@/hooks/api/manga'

import CardsList from './cards-list'
import { PaginationButtons } from './pagination-cards'

const Cards = () => {
  const router = useRouter()
  const currentPage = Number(router.query.page) || 1
  const input = useFilterStore().input
  const tags = useFilterStore().tags
  const status = useFilterStore().status
  const sortBy = useFilterStore().sortBy

  console.log('SORT', sortBy)
  console.log("RESET")
  const { data: mangas, isFetching } = mangaApi.useMangaSearch({
    status,
    tags,
    name: input,
    offset: (currentPage - 1) * OffsetFilter,
    sortBy: {
      type: sortBy?.type,
      order: sortBy?.order,
    },
  })
  const cardView = useCardSwitcherStore().type
  const setCardView = useCardSwitcherStore().setCardSwitcher

  function selectCardFormat(value: typeof cardView) {
    setCardView(value)
  }

  console.log('MANGAINFO', mangas)
  return (
    <section className="flex-[1_1_0%]">
      <div className="mr-10 flex justify-end pt-2">
        <div
          onClick={() => selectCardFormat('two')}
          className={cn(
            'h-[30px] w-[30px] p-1 text-white',
            cardView === 'two' && 'text-green-300',
          )}
        >
          <Icons.cardTwo />
        </div>
        <div
          onClick={() => selectCardFormat('boxes')}
          className={cn(
            'h-[30px] w-[30px] p-1 text-white',
            cardView === 'boxes' && 'text-green-300',
          )}
        >
          <Icons.cardBoxes />
        </div>
      </div>

      <div>
        <CardsList mangas={mangas} isFetching={isFetching} />
      </div>

      <PaginationButtons
        currentPage={currentPage}
        totalPages={Math.ceil(Number(mangas?.total) / OffsetFilter)}
      />
    </section>
  )
}

export default Cards
