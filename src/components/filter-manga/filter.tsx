import { tagsApi } from '@/hooks/tag'

import AccordionSection from './accordion'
import { filterConstants } from '@/shared/constants/filters'

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
        <h2>Фильтры</h2>
        <AccordionSection
          title="Content"
          options={filterConstants.content}
          singleSelect
          filterKey="content"
        />
        {/* <AccordionSection
          title="Languages"
          options={['English', 'Japanese']}
          singleSelect
          filterKey="languages"
        /> */}
        <AccordionSection
          title="Sort By"
          options={['Rating', 'Date']}
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

      <div>
        <h2>Теги</h2>
        <AccordionSection
          title="Tags"
          options={tags}
          singleSelect={false}
          filterKey="tags"
        />
      </div>
    </div>
  )
}
