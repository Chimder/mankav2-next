import { filterConstants } from '@/shared/constants/filters'

import { tagsApi } from '@/hooks/api/tag'

import AccordionSection from './accordion'
import AccordionSortBy from './accordion-sort-by'

export const FilterManga = () => {
  const { data: tags } = tagsApi.useMangaTags()

  console.log('TESADSa', tags)
  return (
    <div className="bg-black">
      {/* <div className={s.sortBy}> */}
      <div>
        <span>Sort By</span>
        <AccordionSortBy title="Sort By" options={filterConstants.sortBy} />
      </div>
      {/* <div className={s.filterContainer}> */}
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
  )
}
