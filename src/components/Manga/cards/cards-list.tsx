import { LocalizedString, MangaList } from '@/shared/api/mangadex/generated'
import { PATH } from '@/shared/constants/path-constants'
import { cn } from '@/shared/lib/tailwind'
import { useCardSwitcherStore } from '@/store/card-switcher'

import { Skeleton } from '../../ui/skeleton'
import Link from 'next/link'

type Props = {
  mangas: MangaList | undefined
  isFetching: boolean
}

export function getFirstTitle(title?: LocalizedString) {
  if (title?.en) {
    return title.en
  }
  if (title && title['ja-ro']) {
    return title['ja-ro']
  }
  if (title && typeof title === 'object') {
    const val = Object.values(title)
    return val.length > 0 ? val[0] : undefined
  }
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
                  className="flex w-[260px] flex-col overflow-hidden rounded-xl pb-1 text-white hover:outline hover:outline-1 hover:outline-red-400"
                  href={`${PATH.MANGA.getTitlePath(manga?.id)}?name=${getFirstTitle(manga.attributes?.title)}`}
                  key={manga?.id}
                >
                  <img
                    className="h-[280px] w-[260px] rounded-xl object-cover"
                    src={`${process.env.NEXT_PUBLIC_VITE_IMG_PROXY}/img/mangadex.org/covers/${manga.id}/${manga.relationships?.find(obj => obj.type === 'cover_art')?.attributes?.fileName}.256.jpg`}
                    width={260}
                    height={280}
                    loading="lazy"
                    alt=""
                  />
                  <div className="ml-1 mt-1 line-clamp-2 min-h-[40px] w-full overflow-hidden text-ellipsis leading-[20px]">
                    {getFirstTitle(manga.attributes?.title)}
                  </div>
                </Link>
              ))
            : mangas?.data?.map(manga => (
                <Link
                  className="mt-1 flex overflow-hidden rounded-lg border-gray-500 text-white hover:outline hover:outline-1 hover:outline-red-400"
                  href={`${PATH.MANGA.getTitlePath(manga.id)}?name=${getFirstTitle(manga.attributes?.title)}`}
                  key={manga?.id}
                >
                  <img
                    className="h-[180px] w-[140px] object-cover"
                    src={`${process.env.NEXT_PUBLIC_VITE_IMG_PROXY}/img/mangadex.org/covers/${manga.id}/${manga.relationships?.find(obj => obj.type === 'cover_art')?.attributes?.fileName}.256.jpg`}
                    width={140}
                    height={180}
                    loading="lazy"
                    alt=""
                  />

                  <div className="flex flex-col">
                    <div className="m-1 text-lg">
                      {manga.attributes?.title?.en}
                    </div>
                    <div className="mr-[2px] flex flex-wrap pb-[5px]">
                      {manga.attributes?.tags?.slice(0, 4)?.map(tag => (
                        <div
                          className="rounded-4xl rounded-xl border border-gray-400 bg-transparent p-1 text-sm"
                          key={tag.id}
                        >
                          {tag.attributes?.name?.en}
                        </div>
                      ))}
                      <div className="rounded-4xl rounded-xl border-2 border-gray-400 bg-transparent p-1 text-sm">
                        {manga.attributes?.status}
                      </div>
                    </div>
                    <div className="line-clamp-3 text-ellipsis">
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
