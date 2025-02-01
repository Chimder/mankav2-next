import Icons from '@/assets/svg/icons'
import { OffsetFilter } from '@/shared/constants/filters'
import { cn } from '@/shared/lib/tailwind'
import { useCardSwitcherStore } from '@/store/card-switcher'
import { useFilterStore } from '@/store/filter-slice'
import { useSearchParams } from 'react-router-dom'

import { mangaApi } from '@/hooks/api/mangadex/manga'

import CardsList from './cards-list'
import { PaginationButtons } from './pagination-cards'

const Cards = () => {
  const [searchParams] = useSearchParams()
  const currentPage = searchParams.get('page') || 1
  const input = useFilterStore().input
  const tags = useFilterStore().tags
  const status = useFilterStore().status
  const sortBy = useFilterStore().sortBy

  const { data: mangas, isFetching } = mangaApi.useMangaSearch({
    status,
    tags,
    name: input,
    offset: (Number(currentPage) - 1) * OffsetFilter,
    sortBy: {
      type: sortBy?.type,
      order: sortBy?.order,
    },
  })
  const cardView = useCardSwitcherStore().type
  const setCardView = useCardSwitcherStore().setCardSwitcher

  function selectCardFormat(value?: typeof cardView) {
    if (!value) return
    setCardView(value)
  }

  console.log('MANGAINFO', mangas)
  return (
    <section className="lg:mx-1">
      <div className="sticky right-0 top-0 z-40 flex justify-end bg-black pt-2">
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

      <div className="h-h-full sticky bottom-0 left-1/2 z-40 mb-2 bg-black">
        <PaginationButtons
          currentPage={Number(currentPage)}
          totalPages={Math.ceil(Number(mangas?.total) / OffsetFilter)}
        />
      </div>
    </section>
  )
}

export default Cards
