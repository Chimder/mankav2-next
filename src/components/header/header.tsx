import { useState } from 'react'
import Icons from '@/assets/svg/icons'
import { Link } from 'react-router-dom'

import useIsMobile from '@/hooks/use-is-mobile'
import { PATH } from '@/app/routers/path-constants'

import { Button } from '../ui/button'
import SearchDialog from './search-dialog'

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const isMobile = useIsMobile()

  return (
    <div className="sticky top-0 z-50 h-[64px] w-full bg-black shadow-header">
      <div className="relative flex h-full items-center border-cyan-200">
        <div className="flex w-full">
          {/* */}
          <div className="flex w-1/5 items-center pl-20 lg:pl-8">
            <Link
              className="font-logo list-none text-6xl text-cyan-300"
              to={PATH.HOME}
            >
              <h1 className="text-4xl decoration-cyan-200 hover:underline">
                {isMobile ? 'M' : 'Manka'}
              </h1>
            </Link>
          </div>

          {/*  */}
          <div className="flex w-4/5 items-center justify-end">
            <Link
              className="mr-10 whitespace-nowrap text-white"
              to={PATH.MANGA.SEARCH}
            >
              <Button
                className="cursor-default text-green-400 decoration-green-400 hover:underline sm:text-sm"
                variant={'link'}
              >
                Advanced Search
              </Button>
            </Link>

            <div
              onClick={() => setIsOpen(true)}
              className="mr-10 h-8 w-8 text-blue-400 transition-transform duration-300 hover:scale-125"
            >
              <Icons.Search />
            </div>

            <SearchDialog isOpen={isOpen} setIsOpen={setIsOpen} />

            <Link
              to={PATH.FAVORITES}
              className="mr-10 flex justify-end text-red-500"
            >
              <div className="h-8 w-8 transition-transform duration-300 hover:scale-125 hover:text-red-600">
                <Icons.Heart />
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
