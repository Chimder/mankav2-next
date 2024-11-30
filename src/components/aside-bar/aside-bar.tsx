import Link from 'next/link'

import { InputeSearch } from './inpute-search'
import { Button } from '../ui/button'

export default function AsideBar() {
  return (
    <div className="relative  center justify-between w-screen h-[80px] py-0 px-10 border-cyan-200 ">
      <div className="flex-[1_1_33%]  center">
        <Link
          className="mr-10 text-6xl font-logo text-cyan-300 list-none"
          href={'/'}
        >
          <h1>ManKA</h1>
        </Link>

        <Link
          className="center ml-10 text-white whitespace-nowrap"
          href={`/search`}
        >
          <Button>Advanced Search</Button>
        </Link>
      </div>
      <InputeSearch />
      <div className="flex-[1_2_33%] justify-end flex">USer</div>
    </div>
  )
}
