import { filterConstants } from '@/shared/constants/filters'

import { tagsApi } from '@/hooks/tag'

import AccordionSection from './accordion'

export const FilterManga = () => {
  const { data: tags } = tagsApi.useMangaTags()

  // const tagOptions = tags?.data?.map(tag => ({
  //   id: tag.id || '',
  //   name: tag.attributes?.name?.en || ''
  // })) || []

  console.log('TESADSa', tags)
  return (
    <div>
      <div>
        {/* <h2>Фильтры</h2> */}
        <div>
          <h2>Tags</h2>
          <AccordionSection
            title="Tags"
            options={tags}
            singleSelect={false}
            filterKey="tags"
          />
        </div>
        <AccordionSection
          title="Sort By"
          options={filterConstants.sortBy}
          singleSelect
          filterKey="sortBy"
        />
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
