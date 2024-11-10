import { useState } from 'react'
import { filterConstants } from '@/shared/constants/filters'
import {
  Filter,
  GetSearchMangaOrderParams,
  useFilterStore,
} from '@/store/filter-slice'

type AccordionSectionProps = {
  title: string
  options?: typeof filterConstants.sortBy
}

const AccordionSortBy = ({ title, options }: AccordionSectionProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const sortBy = useFilterStore().sortBy
  const setSortBy = useFilterStore().setSortBy

  const toggleAccordion = () => setIsOpen(prev => !prev)

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOption = options?.find(
      option => `${option.type}-${option.order}` === event.target.value,
    )
    if (selectedOption) {
      setSortBy({ type: selectedOption.type, order: selectedOption.order })
    }
  }

  return (
    <div>
      <label>
        {/* <span>{title}</span> */}
        <select
          value={`${sortBy?.type}-${sortBy?.order}`}
          onChange={handleSelectChange}
        >
          <option value="">Select an option</option>
          {options?.map(({ name, order, type }) => (
            <option key={name} value={`${type}-${order}`}>
              {name}
            </option>
          ))}
        </select>
      </label>
    </div>
  )
}

export default AccordionSortBy
