import { queryClient } from '@/pages/_app'
import { filterConstants } from '@/shared/constants/filters'
import { useFilterStore } from '@/store/filter-slice'

import { mangaApi } from '@/hooks/api/manga'
import { tagsApi } from '@/hooks/api/tag'

import { Button } from '../ui/button'
import AccordionSection from './accordion'
import AccordionSortBy from './accordion-sort-by'

export const FilterMangaBar = () => {
  const reset = useFilterStore().reset

  const { data: tags } = tagsApi.useMangaTags()

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
  console.log('TESADSa', tags)
  return (
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

      <div className="bg-black">
        <div>
          <span>Sort By</span>
          <AccordionSortBy title="Sort By" options={filterConstants.sortBy} />
        </div>
        <div>
          <span>Filter by</span>
          <div>----------------------</div>
          <AccordionSection
            title="Tags"
            options={tags}
            singleSelect={false}
            filterKey="tags"
          />
          <div>----------------------</div>
          <AccordionSection
            title="Status"
            options={filterConstants.status}
            singleSelect
            filterKey="status"
          />
        </div>
      </div>
    </div>
  )
}
