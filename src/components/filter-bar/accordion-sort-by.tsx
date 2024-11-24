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
    <div className="flex flex-col items-start justify-center w-full text-base text-black">
      <label className="relative w-full">
        <select
          className="center w-full! py-2 px-3 text--base text-black appearance-none cursor-pointer bg-white border-2 border-white
           transition-colors  outline-none "
          value={`${sortBy?.type}-${sortBy?.order}`}
          onChange={handleSelectChange}
        >
          <option value="">Select an option</option>
          {options?.map(({ name, order, type }) => (
            <option
              className="hover:bg-green-400 focus:bg-green-400 appearance-none"
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
