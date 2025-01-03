import { mangaApi } from '@/hooks/api/mangadex/manga'
import { tagsApi } from '@/hooks/api/mangadex/tag'
import { filterConstants } from '@/shared/constants/filters'
import { useFilterStore } from '@/store/filter-slice'

import { Separator } from '../../ui/separator'
import AccordionSection from './accordion'
import AccordionSortBy from './accordion-sort-by'
import { queryClient } from '@/pages/_app'

export const FilterMangaBar = () => {
  const reset = useFilterStore().reset

  const { data: tags } = tagsApi.useMangaTags()

  const Search = async (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault()
    console.log('RESERTT')
    await queryClient.resetQueries({
      queryKey: [mangaApi.baseKey],
    })
  }

  const resetSearch = async () => {
    await reset()
    await queryClient.resetQueries({
      queryKey: [mangaApi.baseKey],
    })
  }
  console.log('TESADSa', tags)
  return (
    <div className="flex-col gap-2.5 bg-black p-1 text-white">
      <div className="mb-1 flex w-full">
        <div
          className="center mr-1 w-8/12 cursor-pointer rounded-md border-1 border-green-400 bg-transparent px-3 py-2 text-base text-white decoration-green-400 hover:bg-transparent hover:underline"
          onClick={e => Search(e)}
        >
          Search
        </div>
        <div
          onClick={() => resetSearch()}
          className="w-1/3 cursor-pointer bg-transparent px-3 py-2 text-base text-red-400 decoration-red-400 hover:underline"
        >
          Reset
        </div>
      </div>

      <div className="bg-black">
        <div>
          <AccordionSortBy title="Sort By" options={filterConstants.sortBy} />
        </div>
        <div>
          <Separator className="my-4" />
          <AccordionSection
            title="Tags"
            options={tags}
            singleSelect={false}
            filterKey="tags"
          />

          <Separator className="my-4" />
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
