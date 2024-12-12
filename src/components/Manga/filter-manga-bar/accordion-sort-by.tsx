import { filterConstants } from '@/shared/constants/filters'
import { useFilterStore } from '@/store/filter-slice'

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '../../ui/select'

type AccordionSectionProps = {
  title: string
  options?: typeof filterConstants.sortBy
}

const AccordionSortBy = ({ title, options }: AccordionSectionProps) => {
  // const sortBy = useFilterStore().sortBy
  const setSortBy = useFilterStore().setSortBy

  // const toggleAccordion = () => setIsOpen(prev => !prev)

  const handleSelectChange = (value: string) => {
    const selectedOption = options?.find(
      option => `${option.type}-${option.order}` === value,
    )
    if (selectedOption) {
      setSortBy({ type: selectedOption.type, order: selectedOption.order })
    }
  }

  return (
    <Select onValueChange={handleSelectChange}>
      <SelectTrigger className="border-2 border-cyan-900 bg-black focus:bg-cyan-900">
        <SelectValue placeholder="Select an option" />
      </SelectTrigger>
      <SelectContent className="bg-black">
        <SelectGroup>
          <SelectLabel>Fruits</SelectLabel>
          {options?.map(({ name, order, type }) => (
            <SelectItem
              className="appearance-none text-white hover:bg-green-400 focus:bg-green-400"
              key={name}
              value={`${type}-${order}`}
            >
              {name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

export default AccordionSortBy
