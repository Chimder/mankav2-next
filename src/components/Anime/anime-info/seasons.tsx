import { Season } from '@/hooks/api/aniwatch/types'
import { PATH } from '@/shared/constants/path-constants'
import Link from 'next/link'

type Props = {
  animes: Season[]
}

function AnimeSeasons({ animes }: Props) {
  if (!animes || !animes.length) return null
  return (
    <div className="center m-2 flex-col rounded-lg border-1 bg-primary">
      <div className="flex- flex-col">
        <h1 className="center mt-4">Seasons</h1>
        <div className="flex flex-row flex-wrap justify-center gap-3">
          {animes.map(anime => (
            <Link
              key={anime.id}
              href={PATH.ANIME.getTitlePath(anime.id)}
              className="flex w-32 flex-col items-center"
            >
              <div className="mb-2 h-40 w-32 overflow-hidden rounded-lg">
                {/* <div className="text-white" key={anime.name}></div> */}
                <img src={anime.poster} alt="" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default AnimeSeasons