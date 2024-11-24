import { useRef, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Icons from '@/assets/svg/icons'
import { Button } from '@radix-ui/themes'
import dayjs from 'dayjs'
import { useDebounce } from 'use-debounce'

import { mangaApi } from '@/hooks/api/manga'
import useClickOutside from '@/hooks/use-click-outside'


export default function AsideBar() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [debouncedValue] = useDebounce(searchQuery, 500)
  const [isListVisible, setIsListVisible] = useState(false)
  const listRef = useRef<HTMLUListElement | null>(null)

  const { data: searchResults } = mangaApi.useMangaSeachInput(debouncedValue)

  useClickOutside(listRef, () => {
    setIsListVisible(false)
  })

  return (
    <div className="relative center justify-between w-screen h-[80px] py-0 px-10 border-cyan-200 ">
      <div className="flex-[1_1_33%] center">
        <Link className="mr-10 text-6xl font-logo text-cyan-300 list-none" href={'/'}>
          <h1>ManKA</h1>
        </Link>

        <Link
          className="center ml-10 text-white whitespace-nowrap"
          href={`/search`}
        >
          <Button>Advanced Search</Button>
        </Link>
      </div>

      <div className="relative flex justify-center flex-col ">
        <div className="flex">
          <input
            className="w-[clamp(200px,34vw,440px)] p-1.5 text-white bg-gray-600 border-none rounded-2xl outline-none focus:border-2 focus:border-cyan-400 placeholder:text-gray-400"
            value={searchQuery}
            onChange={e => {
              setSearchQuery(e.target.value)
              setIsListVisible(true)
            }}
            onFocus={() => {
              if (searchQuery) setIsListVisible(true)
            }}
            type="text"
            placeholder="Search manga..."
          />
          <div
            onClick={() => {
              setSearchQuery('')
              setIsListVisible(false)
            }}
            className="absolute top-2 right-2 text-cyan-300 cursor-pointer hover:scale-110"
          >
            <Icons.closeInpute />
          </div>
        </div>
        <ul
          ref={listRef}
          className="flex absolute top-[32px] z-[1000] flex-col w-full p-1 bg-black"
          style={{
            display:
              isListVisible && searchResults?.data?.length ? 'block' : 'none',
          }}
        >
          {searchResults &&
            searchResults.data?.map(manga => (
              <div
                className="flex my-1 mx-0 cursor-pointer bg-gray-400"
                onClick={() => {
                  setSearchQuery('')
                  setIsListVisible(false)
                  router.push(`/title/${manga.id}`)
                }}
                key={manga.id}
              >
                <img
                  className="w-[60xp] h-[80px]"
                  src={`api/proxy?url=https://mangadex.org/covers/${manga?.id}/${manga?.relationships?.find(obj => obj.type === 'cover_art')?.attributes?.fileName}`}
                  width={60}
                  height={80}
                  alt=""
                />
                <div className="ml-1.5 ">
                  <div className="w-full">{manga.attributes?.title?.en}</div>
                  <div className="">
                    {dayjs(manga.attributes?.createdAt).format('YYYY')}
                  </div>
                  <div className="inline-block py-1 px-2 mr-[2px] rb-[5px] text-3xl bg-transparent border-[1px] border-gray-400 rounded-4xl">
                    {manga.attributes?.status}
                  </div>
                </div>
              </div>
            ))}
        </ul>
      </div>
      <div className="flex-[1_2_33%] justify-end flex">USer</div>
    </div>
  )
}
