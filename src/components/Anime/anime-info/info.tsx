import { useEffect, useRef } from 'react'
import { cn } from '@/shared/lib/tailwind'
import { useParams } from 'react-router-dom'

import { aniwatchApi } from '@/hooks/api/aniwatch/anime'
import { useFavoriteAnime } from '@/hooks/favorite-toggle/use-favorite-anime'

import Characters from './characters'
import AnimeRelation from './relation'
import AnimeSeasons from './seasons'

// type Props = {}

function AnimeTitleInfo() {
  const { id } = useParams()
  const { isFavorite, handleToggleFavorite } = useFavoriteAnime()

  const { data } = aniwatchApi.useAnimeInfoById({ id: id as string })
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const anime = data?.data.anime
  const relatedAnime = data?.data.relatedAnimes
  const seasons = data?.data.seasons

  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = 0
    }
  }, [id])

  return (
    <section
      ref={scrollContainerRef}
      className="filterBar order-2 flex w-2/5 flex-col gap-y-2 md:mb-2 overflow-hidden overflow-y-scroll text-white md:order-1 md:w-full "
    >
      <div className="flex w-full flex-col items-center justify-center rounded-lg border-1 bg-primary p-2">
        <img
          className="relative z-10 h-[440px] w-[310px]"
          src={anime?.info.poster}
          alt=""
        />
        <div className="flex flex-col space-y-4">
          <div className="center">
            <div
              onClick={handleToggleFavorite}
              className={cn(
                'my-1 cursor-pointer rounded-lg p-3',
                isFavorite ? 'bg-green-400' : 'bg-red-400',
              )}
            >
              {isFavorite ? 'Remove from Favorite' : 'Add to Favorite'}
            </div>
          </div>
          <div className="flex items-center">
            <div className="w-24 font-bold">Title:</div>
            <span>{anime?.info.name}</span>
          </div>

          <div className="ml-2 flex flex-wrap gap-2">
            <div>{anime?.info.stats.type}</div>
            <div>{anime?.info.stats.rating}</div>
            <div>{anime?.info.stats.quality}</div>
            <div>{anime?.info.stats.episodes.sub}</div>
            <div>{anime?.info.stats.duration}</div>
            <div>Mal: {anime?.moreInfo.malscore}</div>
          </div>

          <div className="flex items-center">
            <div className="w-24 font-bold">Episodes:</div>
            <div>
              {anime?.info.stats.episodes.sub} {anime?.info.stats.episodes.dub}
            </div>
          </div>

          <div className="flex items-center">
            <div className="w-24 font-bold">Status:</div>
            <div>{anime?.moreInfo.status}</div>
          </div>

          <div className="flex">
            <div className="w-24 font-bold">Genres:</div>
            <div className="flex flex-wrap gap-2">
              {anime?.moreInfo.genres.map(genre => (
                <div
                  key={genre}
                  className="rounded-4xl mb-1 ml-[2px] inline-block rounded-2xl border-1 bg-transparent px-2 py-1 text-sm text-white"
                >
                  {genre}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Characters id={anime?.info.malId} />
      {seasons && <AnimeSeasons animes={seasons} key={`${id}SeasonAnime`} />}
      {relatedAnime && (
        <AnimeRelation animes={relatedAnime} key={`${id}RelatedAnime`} />
      )}
    </section>
  )
}

export default AnimeTitleInfo
