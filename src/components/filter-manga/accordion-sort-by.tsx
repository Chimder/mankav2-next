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

  const handleOptionClick = (type: any, order: string) => {
    console.log('TYPPW', type)
    console.log('RODEW', order)
    setSortBy({ order, type })
  }

  // const handleOptionClick = (type: string, order: string) => {
  //   setSortBy({ order, type })
  // }

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
          {options?.map(({ name, order, type }) => (
            <div key={name}>
              <label>
                <input
                  type={'radio'}
                  checked={sortBy?.type === type && sortBy?.order === order}
                  onChange={() => handleOptionClick(type, order)}
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

export default AccordionSortBy
