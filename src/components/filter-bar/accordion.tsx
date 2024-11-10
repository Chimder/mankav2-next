import { useState } from 'react'
import { filterConstants } from '@/shared/constants/filters'
import { Filter, useFilterStore } from '@/store/filter-slice'

type TagOption = {
  id: string
  name: string
}

type AccordionSectionProps = {
  title: string
  options?: TagOption[]
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
  const setFilter = useFilterStore().setFilter
  const currentFilter = useFilterStore(state => state[filterKey])

  const toggleAccordion = () => setIsOpen(prev => !prev)

  const handleOptionClick = (name: string) => {
    console.log('IDD', name)
    setFilter(filterKey, name)
  }

  console.log('CURR', currentFilter)
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
          {options?.map(({ id, name }) => {
            console.log((currentFilter as string[]).includes(id))

            return (
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
            )
          })}
        </div>
      )}
    </div>
  )
}

export default AccordionSection
