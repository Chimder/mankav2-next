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
  const setFilter = useFilterStore().setFilter
  const currentFilter = useFilterStore(state => state[filterKey])

  const isSingle = (id: string) => {
    return singleSelect
      ? currentFilter === id
      : (currentFilter as string[]).includes(id)
  }

  const handleOptionClick = (name: string) => {
    console.log('IDD', name)
    setFilter(filterKey, name)
  }

  console.log('CURR', currentFilter)
  return (
    <div className="w-full justify-center text-base text-white">
      {/* <span className="">{title}</span> */}
      <ul className="flex flex-wrap">
        {options?.map(({ id, name }) => (
          <div
            key={id}
            className={cn(
              'm-1 p-1 decoration-green-400 hover:underline',
              isSingle(id) && 'text-green-400',
            )}
            onClick={() => handleOptionClick(id)}
          >
            {name}
          </div>
        ))}
      </ul>
    </div>
  )
}

export default AccordionSection
