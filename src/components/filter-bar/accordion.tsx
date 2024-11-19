import { useState } from 'react'
import Icons from '@/assets/svg/icons'
import { filterConstants } from '@/shared/constants/filters'
import { Filter, useFilterStore } from '@/store/filter-slice'

import s from './filter.module.css'

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
    <div className={s.accordion}>
      <button
        className={s.toggleBtn}
        onClick={toggleAccordion}
        style={{ display: 'flex', alignItems: 'center' }}
      >
        <span className={s.title}>{title}</span>
        <div className={isOpen ? s.iconDown : s.iconUp}>
          <Icons.DownToggle />
        </div>
      </button>
      {isOpen && (
        <ul className={s.list}>
          {options?.map(({ id, name }) => (
            <label key={id}>
              <div className={s.item}>
                <input
                  className={singleSelect ? s.radio : s.checkbox}
                  type={singleSelect ? 'radio' : 'checkbox'}
                  checked={
                    singleSelect
                      ? currentFilter === id
                      : (currentFilter as string[]).includes(id)
                  }
                  onChange={() => handleOptionClick(id)}
                />
                {name}
              </div>
            </label>
          ))}
        </ul>
      )}
    </div>
  )
}

export default AccordionSection
