import Link from 'next/link'

import { Button } from '../ui/button'
import { InputeSearch } from './inpute-search'

export default function Header() {
  return (
    <div className=" z-1000 bg-header shadow-header  w-full ">
      <div className="relative center justify-between  p-2 border-cyan-200 ">
        <div className="flex-[1_1_33%]  center">
          <Link
            className="mr-10 text-6xl  font-logo text-cyan-300 list-none"
            href={'/'}
          >
            <h1 className="text-4xl  hover:underline decoration-cyan-200">
              Manka
            </h1>
          </Link>

          <Link
            className="center ml-10 text-white whitespace-nowrap"
            href={`/search`}
          >
            <Button
              className=" cursor-default hover:underline decoration-green-400 text-green-400"
              variant={'link'}
            >
              Advanced Search
            </Button>
          </Link>
        </div>
        <InputeSearch />
        <div className="flex-[1_2_33%] justify-end flex">USer</div>
      </div>
    </div>
  )
}
