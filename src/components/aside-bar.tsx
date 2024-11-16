import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Icons from '@/assets/svg/icons'
import { Button } from '@radix-ui/themes'
import dayjs from 'dayjs'
import { useDebounce } from 'use-debounce'

import { mangaApi } from '@/hooks/manga'

import s from './aside-bar.module.css'

export default function AsideBar() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [debouncedValue] = useDebounce(searchQuery, 500)
  const [isListVisible, setIsListVisible] = useState(false)
  const listRef = useRef<HTMLUListElement | null>(null)

  const { data: searchResults } = mangaApi.useMangaSeachInput(debouncedValue)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (listRef.current && !listRef.current.contains(event.target as Node)) {
        setIsListVisible(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <div className={s.container}>
      <div className={s.wrapLogo}>
        <Link className={s.logo} href={'/'}>
          <h1>ManKA</h1>
        </Link>

        <Link className={s.search} href={`/search`}>
          <Button>Advanced Search</Button>
        </Link>
      </div>

      <div className={s.input}>
        <div className={s.inputWrap}>
          <input
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
            className={s.closeIcon}
          >
            <Icons.closeInpute />
          </div>
        </div>
        <ul
          ref={listRef}
          className={s.listSearch}
          style={{
            display:
              isListVisible && searchResults?.data?.length ? 'block' : 'none',
          }}
        >
          {searchResults &&
            searchResults.data?.map(manga => (
              <div
                className={s.item}
                onClick={() => {
                  setSearchQuery('')
                  setIsListVisible(false)
                  router.push(`/title/${manga.id}`)
                }}
                key={manga.id}
              >
                <img
                  src={`api/proxy?url=https://mangadex.org/covers/${manga?.id}/${manga?.relationships?.find(obj => obj.type === 'cover_art')?.attributes?.fileName}`}
                  width={60}
                  height={80}
                  alt=""
                />
                <div className={s.itemData}>
                  <div className={s.title}>{manga.attributes?.title?.en}</div>
                  <div className={s.createdAt}>
                    {dayjs(manga.attributes?.createdAt).format('YYYY')}
                  </div>
                  <div className={s.status}>{manga.attributes?.status}</div>
                </div>
              </div>
            ))}
        </ul>
      </div>
      <div className={s.user}>USer</div>
    </div>
  )
}
