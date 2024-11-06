import { useState } from 'react'
import { Filter, useFilterStore } from '@/store/filter-slice'

type TagOption = {
  id: string
  name: string
}

type AccordionSectionProps = {
  title: string
  options?: string[] | TagOption[]
  singleSelect: boolean
  filterKey: keyof Filter
}

const AccordionSection = ({
  title,
  options,
  singleSelect,
  filterKey,
}: AccordionSectionProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const setFilter = useFilterStore(state => state.setFilter)
  const currentFilter = useFilterStore(state => state[filterKey])

  const toggleAccordion = () => setIsOpen(prev => !prev)

  const isTagOption = (option: any): option is TagOption => {
    return typeof option === 'object' && 'id' in option && 'name' in option
  }
  const normalizedOptions = options?.map(option =>
    isTagOption(option)
      ? { id: option.id, name: option.name }
      : { id: option, name: option },
  )

  const handleOptionClick = (optionValue: string) => {
    console.log('FILTERKEYT', filterKey)
    console.log('OPVAL', optionValue)
    setFilter(filterKey, optionValue)
  }

  return (
    <div>
      <button
        onClick={toggleAccordion}
        style={{ display: 'flex', alignItems: 'center' }}
      >
        <span>{title}</span>
        <span>{isOpen ? '-' : '+'}</span>
      </button>
      {isOpen && (
        <div>
          {normalizedOptions?.map(({ id, name }) => (
            <div key={id}>
              <label>
                <input
                  type={singleSelect ? 'radio' : 'checkbox'}
                  checked={
                    singleSelect
                      ? currentFilter === id
                      : (currentFilter as string[]).includes(id)
                  }
                  onChange={() => handleOptionClick(id)}
                />
                {name}
              </label>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default AccordionSection
