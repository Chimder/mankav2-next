import { useState } from 'react'
import Icons from '@/assets/svg/icons'
import { filterConstants } from '@/shared/constants/filters'
import { useFilterStore } from '@/store/filter-slice'

import s from './filter.module.css'

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
    toggleAccordion()
    const selectedOption = options?.find(
      option => `${option.type}-${option.order}` === event.target.value,
    )
    if (selectedOption) {
      setSortBy({ type: selectedOption.type, order: selectedOption.order })
    }
  }

  return (
    <div className={s.accordionSortBy}>
      <label>
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
