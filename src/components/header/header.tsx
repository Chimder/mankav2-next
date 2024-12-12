import Link from 'next/link'

import { Button } from '../ui/button'
import { InputeSearch } from './inpute-search'

export default function Header() {
  return (
    <div className="z-1000 w-full bg-header shadow-header">
      <div className="center relative justify-between border-cyan-200 p-2">
        <div className="center flex-[1_1_33%]">
          <Link
            className="font-logo mr-10 list-none text-6xl text-cyan-300"
            href={'/'}
          >
            <h1 className="text-4xl decoration-cyan-200 hover:underline">
              Manka
            </h1>
          </Link>

          <Link
            className="center ml-10 whitespace-nowrap text-white"
            href={`/search`}
          >
            <Button
              className="cursor-default text-green-400 decoration-green-400 hover:underline"
              variant={'link'}
            >
              Advanced Search
            </Button>
          </Link>
        </div>
        <InputeSearch />
        <div className="flex flex-[1_2_33%] justify-end">USer</div>
      </div>
    </div>
  )
}
