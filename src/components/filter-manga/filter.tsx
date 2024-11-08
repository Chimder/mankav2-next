import { filterConstants } from '@/shared/constants/filters'

import { tagsApi } from '@/hooks/tag'

import AccordionSection from './accordion'
import AccordionSortBy from './accordion-sort-by'

export const FilterManga = () => {
  const { data: tags } = tagsApi.useMangaTags()

  console.log('TESADSa', tags)
  return (
    <div>
      <div>
        <div>
          <h2>Tags</h2>
          <AccordionSection
            title="Tags"
            options={tags}
            singleSelect={false}
            filterKey="tags"
          />
        </div>
        <AccordionSortBy title="Sort By" options={filterConstants.sortBy} />
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
