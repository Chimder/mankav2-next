import Link from 'next/link'
import { useRouter } from 'next/router'
import { MangaList } from '@/shared/api/swagger/generated'
import { OffsetFilter } from '@/shared/constants/filters'
import { cn } from '@/shared/lib/tailwind'
import { useCardSwitcherStore } from '@/store/card-switcher'

import { Skeleton } from '../ui/skeleton'
import { PaginationButtons } from './pagination-button'

type Props = {
  mangas: MangaList | undefined
  isFetching: boolean
}

const CardsList = ({ mangas, isFetching }: Props) => {
  const router = useRouter()
  const currentPage = Number(router?.query?.page) || 1
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
                  className="flex flex-col w-[280px] border-1 border-red-200 hover:border-red-400 rounded-xl pb-1 overflow-hidden text-white"
                  href={`title/${manga?.id}`}
                  key={manga?.id}
                >
                  <img
                    className="w-[280px] h-[310px] object-cover rounded-xl"
                    // src={`${process.env.NEXT_PUBLIC_IMG_PROXY}/img/mangadex.org/covers/${manga.id}/${manga.relationships?.find(obj => obj.type === 'cover_art')?.attributes?.fileName}`}
                    // src={`${process.env.NEXT_PUBLIC_IMG_PROXY}?url=https://mangadex.org/covers/${manga?.id}/${manga?.relationships?.find(obj => obj.type === 'cover_art')?.attributes?.fileName}`}
                    src={`api/proxy?url=https://mangadex.org/covers/${manga?.id}/${manga?.relationships?.find(obj => obj.type === 'cover_art')?.attributes?.fileName}`}
                    width={280}
                    height={310}
                    loading="lazy"
                    alt=""
                  />
                  <div className="w-full ml-1 min-h-[40px] mt-1 overflow-hidden leading-[20px] text-ellipsis line-clamp-2">
                    {manga.attributes?.title?.en}
                  </div>
                </Link>
              ))
            : mangas?.data?.map(manga => (
                <Link
                  className="flex overflow-hidden border-1 text-white border-gray-500"
                  href={`title/${manga?.id}`}
                  key={manga?.id}
                >
                  <img
                    className="w-[140px] h-[180px] object-cover"
                    // src={`${process.env.NEXT_PUBLIC_IMG_PROXY}/img/mangadex.org/covers/${manga.id}/${manga.relationships?.find(obj => obj.type === 'cover_art')?.attributes?.fileName}`}
                    // src={`${process.env.NEXT_PUBLIC_IMG_PROXY}?url=https://mangadex.org/covers/${manga?.id}/${manga?.relationships?.find(obj => obj.type === 'cover_art')?.attributes?.fileName}`}
                    src={`api/proxy?url=https://mangadex.org/covers/${manga?.id}/${manga?.relationships?.find(obj => obj.type === 'cover_art')?.attributes?.fileName}`}
                    width={140}
                    height={180}
                    loading="lazy"
                    alt=""
                  />

                  <div className="flex flex-col">
                    <div className="text-lg m-1">
                      {manga.attributes?.title?.en}
                    </div>
                    <div className="flex flex-wrap  mr-[2px] pb-[5px]">
                      {manga.attributes?.tags?.slice(0, 4)?.map(tag => (
                        <div
                          className="p-1 text-sm bg-transparent border-2 border-gray-400 rounded-4xl"
                          key={tag.id}
                        >
                          {tag.attributes?.name?.en}
                        </div>
                      ))}
                      <div className="text-sm p-1 bg-transparent border-2 border-gray-400 rounded-4xl">
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
