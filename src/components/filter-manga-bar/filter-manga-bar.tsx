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

  const Search = async (e: React.MouseEvent<HTMLDivElement>) => {
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
        <div
          className="w-8/12 center hover:underline text-white decoration-green-400 py-2 mr-1 bg-transparent  px-3  text-base cursor-pointer
               border-green-400 border-1 rounded-md  hover:bg-transparent"
          onClick={e => Search(e)}
        >
          Search
        </div>
        <div
          onClick={() => resetSearch()}
          className="w-1/3 py-2  px-3 text-red-400 bg-transparent hover:underline decoration-red-400 text-base cursor-pointer "
        >
          Reset
        </div>
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
