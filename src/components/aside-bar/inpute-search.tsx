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
    <section className="relative flex flex-col justify-center">
      <div className="flex">
        <input
          className="w-[clamp(200px,34vw,440px)] rounded-2xl border-none bg-gray-600 p-1.5 text-white outline-none placeholder:text-gray-400 focus:border-2 focus:border-cyan-400"
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
          className="absolute right-2 top-2 cursor-pointer text-cyan-300 hover:scale-110"
        >
          <Icons.closeInpute />
        </div>
      </div>
      <ul
        ref={listRef}
        className="absolute top-[58px] z-[1000] flex min-h-80 w-full flex-col rounded-md bg-black p-1 text-white"
        style={{
          display: isListVisible && searchQuery.length !== 0 ? 'block' : 'none',
        }}
      >
        {isFetching ? (
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform items-center">
            {isFetching && <ReloadIcon className="h-6 w-6 animate-spin" />}
          </div>
        ) : searchResults?.data?.length ? (
          searchResults.data.map(manga => (
            <div
              className="mx-2 my-1 flex cursor-pointer rounded-sm border-[1px] border-indigo-400 bg-transparent"
              onClick={() => {
                setSearchQuery('')
                setIsListVisible(false)
                router.push(`/title/${manga.id}`)
              }}
              key={manga.id}
            >
              <div className="min-h-[80px] min-w-[64px]">
                <img
                  className="object-cover object-center"
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
                  className="rb-[5px] mr-[2px] bg-transparent px-0 py-2 text-sm"
                >
                  {manga.attributes?.status}
                </Badge>
              </div>
            </div>
          ))
        ) : searchQuery && !isFetching ? (
          // Показ сообщения, если ничего не найдено
          <div className="py-4 text-center text-gray-400">
            No results found.
          </div>
        ) : null}
      </ul>
    </section>
  )
}
