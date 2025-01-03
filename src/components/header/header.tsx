import Link from 'next/link'
import { PATH } from '@/shared/constants/path-constants'

import { Button } from '../ui/button'
import InputeSearch from './inpute-search'

export default function Header() {
  console.log('HEader')
  // return
  return (
    <div className="sticky top-0 z-50 h-[64px] w-full bg-black shadow-header">
      <div className="center relative justify-between rounded-b-lg border-1 border-cyan-200 p-2">
        <div className="center flex-[1_1_33%]">
          <Link
            className="font-logo mr-10 list-none text-6xl text-cyan-300"
            href={PATH.MANGA.MAIN}
          >
            <h1 className="text-4xl decoration-cyan-200 hover:underline">
              Manka
            </h1>
          </Link>

          <Link
            className="center ml-10 whitespace-nowrap text-white"
            href={PATH.MANGA.SEARCH}
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
