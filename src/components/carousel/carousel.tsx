/* eslint-disable react-compiler/react-compiler */
import * as React from 'react'
import { Manga } from '@/shared/api/mangadex/generated'
import { getFirstTitle } from '@/shared/utils/get-first-title'
import Autoplay from 'embla-carousel-autoplay'
import { Link } from 'react-router-dom'

import {
  Carousel,
  CarouselContent,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { PATH } from '@/app/routers/path-constants'

type Props = {
  manga: Manga[]
}
export function CarouselMain({ manga }: Props) {
  const plugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: true }),
  )

  return (
    <div className="pl-16 pr-20 lg:pr-16">
      <Carousel
        plugins={[plugin.current]}
        className="w-full"
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
      >
        <CarouselContent className="">
          {manga.slice(0, 9).map(mangaItem => (
            <Link
              key={mangaItem.id}
              className="flex-[0_0_33%]"
              to={`${PATH.MANGA.getTitlePath(mangaItem.id)}?name=${getFirstTitle(mangaItem.attributes?.title)}`}
            >
              <div className="px-2">
                <img
                  src={`${import.meta.env.VITE_IMG_PROXY}/img/mangadex.org/covers/${mangaItem.id}/${
                    mangaItem.relationships?.find(
                      obj => obj.type === 'cover_art',
                    )?.attributes?.fileName
                  }.512.jpg`}
                  alt={getFirstTitle(mangaItem.attributes?.title)}
                  className="h-80 w-full rounded-lg object-cover lg:h-56 sm:h-40"
                />
                <div className="mt-2 text-ellipsis text-center text-white md:line-clamp-3 md:text-xs">
                  {getFirstTitle(mangaItem.attributes?.title)}
                </div>
              </div>
            </Link>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  )
}
