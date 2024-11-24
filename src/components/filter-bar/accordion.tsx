import { useState } from 'react'
import Icons from '@/assets/svg/icons'
import { cn } from '@/shared/lib/tailwind'
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
    <div className="justify-center w-full text-base text-black bg-white ">
      <button
        className="center w-full py-2 px-[30px] text-lg cursor-pointer bg-white border-2 border-black rounded-none"
        onClick={toggleAccordion}
        style={{ display: 'flex', alignItems: 'center' }}
      >
        <span className="">{title}</span>
        <div
          className={
            isOpen
              ? 'ml-1.5 text-green-500 transition-transform duration-300 transform scale-y-[-1]'
              : 'ml-1.5 text-green-500 transition-transform duration-300 transform'
          }
        >
          <Icons.DownToggle />
        </div>
      </button>
      {isOpen && (
        <ul className="">
          {options?.map(({ id, name }) => (
            <label key={id}>
              <div className="flex items-center w-full p-1.5 hover:underline decoration-green-400">
                <input
                  className={cn(
                    'w-5 h-5 my-[2px] mx-[6px] appearance-none cursor-pointer border-2 border-gray-300 rounded-none transition-colors duration-300 checked:bg-green-500 checked:border-green-500',
                    // singleSelect ? s.radio : s.checkbox,
                  )}
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
