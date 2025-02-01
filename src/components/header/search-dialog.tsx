// VideoDialog.tsx
import { useState } from 'react'
import { cn } from '@/shared/lib/tailwind'
import { getFirstTitle } from '@/shared/utils/get-first-title'
import { ReloadIcon } from '@radix-ui/react-icons'
import dayjs from 'dayjs'
import { useNavigate } from 'react-router-dom'
import { useDebounce } from 'use-debounce'

import { mangaApi } from '@/hooks/api/mangadex/manga'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import { PATH } from '@/app/routers/path-constants'

type Props = {
  episodeId?: string
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}

function SearchDialog({ isOpen, setIsOpen }: Props) {
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [debouncedValue] = useDebounce(searchQuery, 500)
  const { data: searchResults, isFetching } =
    mangaApi.useMangaSeachInput(debouncedValue)

  function handleClose() {
    setIsOpen(false)
  }
  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="flex h-[70vh] max-w-[700px] flex-col items-center justify-center rounded-lg bg-black p-2">
        <section className="relative flex h-full w-full flex-col justify-center pt-10">
          <div className="flex">
            <input
              className="w-full rounded-2xl border-none bg-gray-600 p-1.5 text-center text-white outline-none placeholder:text-gray-400 focus:border-2 focus:border-cyan-400"
              value={searchQuery}
              onChange={e => {
                setSearchQuery(e.target.value)
              }}
              type="text"
              placeholder="Search manga..."
            />
          </div>
          <ul
            className={cn(
              'filterBar mt-2 flex h-full w-full flex-col items-center overflow-y-scroll rounded-md bg-black p-1 text-white',
            )}
          >
            {isFetching ? (
              <div className="center flex h-full items-center">
                {isFetching && <ReloadIcon className="h-6 w-6 animate-spin" />}
              </div>
            ) : searchResults?.data?.length ? (
              searchResults.data.map(manga => (
                <div
                  className="my-1 flex h-full w-full cursor-pointer rounded-sm border-[1px] bg-transparent hover:bg-slate-800"
                  onClick={() => {
                    navigate(
                      `${PATH.MANGA.getTitlePath(manga.id)}?name=${getFirstTitle(manga.attributes?.title)}`,
                    )
                    handleClose()
                    setSearchQuery('')
                  }}
                  key={manga.id}
                >
                  <div className="min-h-[80px] min-w-[64px]">
                    <img
                      className="object-cover object-center"
                      src={`${import.meta.env.VITE_IMG_PROXY!}/img/https://mangadex.org/covers/${manga?.id}/${manga?.relationships?.find(obj => obj.type === 'cover_art')?.attributes?.fileName}.256.jpg`}
                      width={60}
                      height={80}
                      alt=""
                    />
                  </div>
                  <div className="ml-1.5">
                    <div className="w-full text-base">
                      {manga.attributes?.title?.en}
                    </div>
                    <div>
                      {dayjs(manga.attributes?.createdAt).format('YYYY')}
                    </div>
                    <div className="text-sm">{manga.attributes?.status}</div>
                  </div>
                </div>
              ))
            ) : (
              searchQuery &&
              !isFetching &&
              !searchResults?.data?.length && (
                <div className="center h-full text-gray-400">
                  No results found.
                </div>
              )
            )}
          </ul>
        </section>
        <DialogTitle></DialogTitle>
      </DialogContent>
    </Dialog>
  )
}

export default SearchDialog
