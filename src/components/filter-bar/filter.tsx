import { filterConstants } from '@/shared/constants/filters'

import { tagsApi } from '@/hooks/api/tag'

import AccordionSection from './accordion'
import AccordionSortBy from './accordion-sort-by'
import s from './filter.module.css'

export const FilterManga = () => {
  const { data: tags } = tagsApi.useMangaTags()

  console.log('TESADSa', tags)
  return (
    <div className={s.container}>
      <div className={s.sortBy}>
        <span>Sort By</span>
        <AccordionSortBy title="Sort By" options={filterConstants.sortBy} />
      </div>
      <div className={s.filterContainer}>
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
