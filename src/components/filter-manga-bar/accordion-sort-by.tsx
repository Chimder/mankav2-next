import { useState } from 'react'
import Icons from '@/assets/svg/icons'
import { filterConstants } from '@/shared/constants/filters'
import { useFilterStore } from '@/store/filter-slice'

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
    <div className="flex w-full flex-col items-start justify-center text-base text-black">
      <label className="relative w-full">
        <select
          className="center w-full! text--base cursor-pointer appearance-none border-2 border-white bg-white px-3 py-2 text-black outline-none transition-colors"
          value={`${sortBy?.type}-${sortBy?.order}`}
          onChange={handleSelectChange}
        >
          <option value="">Select an option</option>
          {options?.map(({ name, order, type }) => (
            <option
              className="appearance-none hover:bg-green-400 focus:bg-green-400"
              key={name}
              value={`${type}-${order}`}
            >
              {name}
            </option>
          ))}
        </select>
      </label>
    </div>
  )
}

export default AccordionSortBy
