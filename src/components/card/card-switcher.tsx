import Link from 'next/link'
import Icons from '@/assets/svg/icons'
import { MangaList } from '@/shared/api/swagger/generated'
import { useCardSwitcherStore } from '@/store/card-switcher'
import clsx from 'clsx'

import Skeleton from '../ui/skeleton'
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
    <section className={s.wrap}>
      <div className={s.select}>
        <div
          onClick={() => selectCardFormat('two')}
          className={clsx(s.svg, cardView === 'two' && s.active)}
        >
          <Icons.cardTwo />
        </div>
        <div
          onClick={() => selectCardFormat('boxes')}
          className={clsx(s.svg, cardView === 'boxes' && s.active)}
        >
          <Icons.cardBoxes />
        </div>
      </div>

      <div className={s.cardView}>
        <ul className={clsx(s[cardView])}>
          {isFetching
            ? Array.from({ length: 10 }).map((_, index) => (
                <Skeleton
                  speed={'medium'}
                  width={cardView == 'boxes' ? 280 : 760}
                  height={cardView == 'boxes' ? 330 : 180}
                  key={index}
                ></Skeleton>
              ))
            : cardView == 'boxes'
              ? mangas?.data?.map(manga => (
                  <Link
                    className={s.items}
                    href={`title/${manga?.id}`}
                    key={manga?.id}
                  >
                    <img
                      // src={`${process.env.NEXT_PUBLIC_IMG_PROXY}/img/mangadex.org/covers/${manga.id}/${manga.relationships?.find(obj => obj.type === 'cover_art')?.attributes?.fileName}`}
                      // src={`${process.env.NEXT_PUBLIC_IMG_PROXY}?url=https://mangadex.org/covers/${manga?.id}/${manga?.relationships?.find(obj => obj.type === 'cover_art')?.attributes?.fileName}`}
                      src={`api/proxy?url=https://mangadex.org/covers/${manga?.id}/${manga?.relationships?.find(obj => obj.type === 'cover_art')?.attributes?.fileName}`}
                      width={280}
                      height={310}
                      loading="lazy"
                      alt=""
                    />
                    <div className={s.title}>{manga.attributes?.title?.en}</div>
                  </Link>
                ))
              : mangas?.data?.map(manga => (
                  <Link
                    className={s.itemsTwo}
                    href={`title/${manga?.id}`}
                    key={manga?.id}
                  >
                    <img
                      // src={`${process.env.NEXT_PUBLIC_IMG_PROXY}/img/mangadex.org/covers/${manga.id}/${manga.relationships?.find(obj => obj.type === 'cover_art')?.attributes?.fileName}`}
                      // src={`${process.env.NEXT_PUBLIC_IMG_PROXY}?url=https://mangadex.org/covers/${manga?.id}/${manga?.relationships?.find(obj => obj.type === 'cover_art')?.attributes?.fileName}`}
                      src={`api/proxy?url=https://mangadex.org/covers/${manga?.id}/${manga?.relationships?.find(obj => obj.type === 'cover_art')?.attributes?.fileName}`}
                      width={140}
                      height={180}
                      loading="lazy"
                      alt=""
                    />

                    <div className={s.itemInfo}>
                      {/* <img src="" alt="" /> */}
                      <div className={s.title}>
                        {manga.attributes?.title?.en}
                      </div>
                      <div>{/* <div>{manga.attributes.}</div> */}</div>
                      <div className={s.tags}>
                        {manga.attributes?.tags?.slice(0, 4)?.map(tag => (
                          <div className={s.tag} key={tag.id}>
                            {tag.attributes?.name?.en}
                          </div>
                        ))}
                        <div className={clsx(s.tag, s.status)}>
                          {manga.attributes?.status}
                        </div>
                      </div>
                      <div className={s.description}>
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
