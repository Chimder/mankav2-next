import { LocalizedString, MangaList } from '@/shared/api/mangadex/generated'
import { cn } from '@/shared/lib/tailwind'
import { getFirstTitle } from '@/shared/utils/get-first-title'
import { useCardSwitcherStore } from '@/store/card-switcher'
import { Link } from 'react-router-dom'

import { Skeleton } from '../../ui/skeleton'
import { PATH } from '@/app/routers/path-constants'

type Props = {
  mangas: MangaList | undefined
  isFetching: boolean
}

const CardsList = ({ mangas, isFetching }: Props) => {
  const cardView = useCardSwitcherStore().type

  return (
    <div className="h-full">
      <ul className={cn(cardView)}>
        {isFetching && cardView
          ? Array.from({ length: 20 }).map((_, index) => (
              <Skeleton
                className={
                  cardView == 'boxes' ? 'skeletonBoxes' : 'skeletonTwo'
                }
                key={index}
              ></Skeleton>
            ))
          : cardView == 'boxes'
            ? mangas?.data?.map(manga => (
                <Link
                  className="flex w-[260px] flex-col overflow-hidden rounded-xl pb-1 text-white hover:outline hover:outline-1 hover:outline-red-400 lg:w-[200px] xsm:h-[200px] xsm:w-[150px]"
                  to={`${PATH.MANGA.getTitlePath(manga?.id)}?name=${getFirstTitle(manga.attributes?.title)}`}
                  key={manga?.id}
                >
                  <img
                    className="h-[280px] w-[260px] rounded-xl object-cover"
                    src={`${import.meta.env.VITE_IMG_PROXY}/img/mangadex.org/covers/${manga.id}/${manga.relationships?.find(obj => obj.type === 'cover_art')?.attributes?.fileName}.256.jpg`}
                    width={260}
                    height={280}
                    loading="lazy"
                    alt=""
                  />
                  <div className="ml-1 mt-1 line-clamp-2 min-h-[40px] w-full overflow-hidden text-ellipsis leading-[20px] sm:hidden">
                    {getFirstTitle(manga.attributes?.title)}
                  </div>
                </Link>
              ))
            : mangas?.data?.map(manga => (
                <Link
                  className="mt-1 flex w-full  rounded-lg border-gray-500 text-white hover:outline hover:outline-1 hover:outline-red-400"
                  to={`${PATH.MANGA.getTitlePath(manga.id)}?name=${getFirstTitle(manga.attributes?.title)}`}
                  key={manga?.id}
                >
                  <img
                    className=" object-cover lg:pr-2 sm:w-[150px]"
                    src={`${import.meta.env.VITE_IMG_PROXY}/img/mangadex.org/covers/${manga.id}/${manga.relationships?.find(obj => obj.type === 'cover_art')?.attributes?.fileName}.256.jpg`}
                    width={140}
                    height={180}
                    loading="lazy"
                    alt=""
                  />

                  <div className="flex flex-col w-full">
                    <div className="m-1 text-lg md:text-sm">
                      {manga.attributes?.title?.en}
                    </div>
                    <div className="mr-[2px] flex flex-wrap pb-[5px]">
                      {manga.attributes?.tags?.slice(0, 4)?.map(tag => (
                        <div
                          className="rounded-4xl m-1 rounded-xl border-gray-400 bg-transparent text-sm text-pink-400 md:text-xs"
                          key={tag.id}
                        >
                          {tag.attributes?.name?.en}
                        </div>
                      ))}
                      <div className="rounded-4xl rounded-xl bg-transparent p-1 text-sm text-green-800 md:text-xs">
                        {manga.attributes?.status}
                      </div>
                    </div>
                    <div className="line-clamp-3 text-ellipsis md:text-sm">
                      {manga.attributes?.description?.en}
                    </div>
                  </div>
                </Link>
              ))}
      </ul>
    </div>
  )
}

export default CardsList
