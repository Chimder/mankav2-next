import { useRef, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Icons from '@/assets/svg/icons'
import { ReloadIcon } from '@radix-ui/react-icons'
import dayjs from 'dayjs'
import { useDebounce } from 'use-debounce'

import { mangaApi } from '@/hooks/api/manga'
import useClickOutside from '@/hooks/use-click-outside'

import { Badge } from '../ui/badge'

export const InputeSearch = () => {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [debouncedValue] = useDebounce(searchQuery, 500)
  const [isListVisible, setIsListVisible] = useState(false)
  const listRef = useRef<HTMLUListElement | null>(null)

  const { data: searchResults, isFetching } =
    mangaApi.useMangaSeachInput(debouncedValue)

  useClickOutside(listRef, () => {
    setIsListVisible(false)
  })
  return (
    <section className="relative flex justify-center flex-col ">
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
        className="flex absolute w-full min-h-80 top-[58px] text-white rounded-md z-[1000] flex-col p-1 bg-black"
        style={{
          display: isListVisible && searchQuery.length !== 0 ? 'block' : 'none',
        }}
      >
        {isFetching ? (
          <div className="absolute items-center top-1/2 left-1/2 -translate-x-1/2  -translate-y-1/2 transform">
            {isFetching && <ReloadIcon className="h-6 w-6 animate-spin" />}
          </div>
        ) : searchResults?.data?.length ? (
          searchResults.data.map(manga => (
            <div
              className="flex my-1 mx-2 border-[1px] rounded-sm border-indigo-400 cursor-pointer bg-transparent"
              onClick={() => {
                setSearchQuery('')
                setIsListVisible(false)
                router.push(`/title/${manga.id}`)
              }}
              key={manga.id}
            >
              <div className="min-w-[64px] min-h-[80px]">
                <img
                  className="object-center object-cover"
                  src={`/api/proxy?url=https://mangadex.org/covers/${manga?.id}/${manga?.relationships?.find(obj => obj.type === 'cover_art')?.attributes?.fileName}`}
                  width={60}
                  height={80}
                  alt=""
                />
              </div>
              <div className="ml-1.5">
                <div className="w-full text-base">
                  {manga.attributes?.title?.en}
                </div>
                <div>{dayjs(manga.attributes?.createdAt).format('YYYY')}</div>
                <Badge
                  variant={'default'}
                  className=" py-2 px-0 mr-[2px] rb-[5px] text-sm bg-transparent"
                >
                  {manga.attributes?.status}
                </Badge>
              </div>
            </div>
          ))
        ) : searchQuery && !isFetching ? (
          // Показ сообщения, если ничего не найдено
          <div className="text-center py-4 text-gray-400">
            No results found.
          </div>
        ) : null}
      </ul>
    </section>
  )
}
