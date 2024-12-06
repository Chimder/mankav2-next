import Link from 'next/link'
import { useRouter } from 'next/router'
import { MangaList } from '@/shared/api/swagger/generated'
import { OffsetFilter } from '@/shared/constants/filters'
import { cn } from '@/shared/lib/tailwind'
import { useCardSwitcherStore } from '@/store/card-switcher'

import { Skeleton } from '../ui/skeleton'
import { PaginationButtons } from './pagination-cards'

type Props = {
  mangas: MangaList | undefined
  isFetching: boolean
}

const CardsList = ({ mangas, isFetching }: Props) => {
  // const router = useRouter()
  // const currentPage = Number(router?.query?.page) || 1
  const cardView = useCardSwitcherStore().type

  return (
    <div>
      <ul className={cn(cardView)}>
        {isFetching
          ? Array.from({ length: 10 }).map((_, index) => (
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
                  className="flex w-[280px] flex-col overflow-hidden rounded-xl border-1 border-red-200 pb-1 text-white hover:border-red-400"
                  href={`title/${manga?.id}`}
                  key={manga?.id}
                >
                  <img
                    className="h-[310px] w-[280px] rounded-xl object-cover"
                    // src={`${process.env.NEXT_PUBLIC_IMG_PROXY}/img/mangadex.org/covers/${manga.id}/${manga.relationships?.find(obj => obj.type === 'cover_art')?.attributes?.fileName}`}
                    // src={`${process.env.NEXT_PUBLIC_IMG_PROXY}?url=https://mangadex.org/covers/${manga?.id}/${manga?.relationships?.find(obj => obj.type === 'cover_art')?.attributes?.fileName}`}
                    src={`api/proxy?url=https://mangadex.org/covers/${manga?.id}/${manga?.relationships?.find(obj => obj.type === 'cover_art')?.attributes?.fileName}`}
                    width={280}
                    height={310}
                    loading="lazy"
                    alt=""
                  />
                  <div className="ml-1 mt-1 line-clamp-2 min-h-[40px] w-full overflow-hidden text-ellipsis leading-[20px]">
                    {manga.attributes?.title?.en}
                  </div>
                </Link>
              ))
            : mangas?.data?.map(manga => (
                <Link
                  className="flex overflow-hidden border-1 border-gray-500 text-white"
                  href={`title/${manga?.id}`}
                  key={manga?.id}
                >
                  <img
                    className="h-[180px] w-[140px] object-cover"
                    // src={`${process.env.NEXT_PUBLIC_IMG_PROXY}/img/mangadex.org/covers/${manga.id}/${manga.relationships?.find(obj => obj.type === 'cover_art')?.attributes?.fileName}`}
                    // src={`${process.env.NEXT_PUBLIC_IMG_PROXY}?url=https://mangadex.org/covers/${manga?.id}/${manga?.relationships?.find(obj => obj.type === 'cover_art')?.attributes?.fileName}`}
                    src={`api/proxy?url=https://mangadex.org/covers/${manga?.id}/${manga?.relationships?.find(obj => obj.type === 'cover_art')?.attributes?.fileName}`}
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
                          className="rounded-4xl border-2 border-gray-400 bg-transparent p-1 text-sm"
                          key={tag.id}
                        >
                          {tag.attributes?.name?.en}
                        </div>
                      ))}
                      <div className="rounded-4xl border-2 border-gray-400 bg-transparent p-1 text-sm">
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
