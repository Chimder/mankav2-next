import Link from 'next/link'
import Icons from '@/assets/svg/icons'
import { MangaList } from '@/shared/api/swagger/generated'
import { cn } from '@/shared/lib/tailwind'
import { useCardSwitcherStore } from '@/store/card-switcher'

import { Skeleton } from '../ui/skeleton'
import s from './card-switcher.module.css'

type Props = {
  mangas: MangaList | undefined
  isFetching: boolean
}

const CardSwitcher = ({ mangas, isFetching }: Props) => {
  const cardView = useCardSwitcherStore().type
  const setCardView = useCardSwitcherStore().setCardSwitcher

  function selectCardFormat(value: typeof cardView) {
    setCardView(value)
  }

  console.log('MANGAINFO', mangas)
  return (
    <section className="flex-[1_1_0%]">
      <div className="flex justify-end pt-2 mr-10">
        <div
          onClick={() => selectCardFormat('two')}
          className={cn(
            'w-[30px] h-[30px] p-1 text-white',
            cardView === 'two' && 'text-green-300',
          )}
        >
          <Icons.cardTwo />
        </div>
        <div
          onClick={() => selectCardFormat('boxes')}
          className={cn(
            'w-[30px] h-[30px] p-1 text-white',
            cardView === 'boxes' && 'text-green-300',
          )}
        >
          <Icons.cardBoxes />
        </div>
      </div>

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
                    className="flex flex-col w-[280px] overflow-hidden text-white"
                    href={`title/${manga?.id}`}
                    key={manga?.id}
                  >
                    <img
                      className="w-[280px] h-[310px] object-cover rounded-3xl"
                      // src={`${process.env.NEXT_PUBLIC_IMG_PROXY}/img/mangadex.org/covers/${manga.id}/${manga.relationships?.find(obj => obj.type === 'cover_art')?.attributes?.fileName}`}
                      // src={`${process.env.NEXT_PUBLIC_IMG_PROXY}?url=https://mangadex.org/covers/${manga?.id}/${manga?.relationships?.find(obj => obj.type === 'cover_art')?.attributes?.fileName}`}
                      src={`api/proxy?url=https://mangadex.org/covers/${manga?.id}/${manga?.relationships?.find(obj => obj.type === 'cover_art')?.attributes?.fileName}`}
                      width={280}
                      height={310}
                      loading="lazy"
                      alt=""
                    />
                    <div className="w-full min-h-[40px] mt-1 overflow-hidden leading-[20px] text-ellipsis line-clamp-2">
                      {manga.attributes?.title?.en}
                    </div>
                  </Link>
                ))
              : mangas?.data?.map(manga => (
                  <Link
                    className="flex overflow-hidden text-white border-[1px] border-gray-500"
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
    </section>
  )
}

export default CardSwitcher
