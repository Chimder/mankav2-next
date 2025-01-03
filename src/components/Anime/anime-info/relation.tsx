import { RelatedAnime } from '@/hooks/api/aniwatch/types'
import { PATH } from '@/shared/constants/path-constants'
import Link from 'next/link'

type Props = {
  animes: RelatedAnime[]
}

function AnimeRelation({ animes }: Props) {
  if (!animes || !animes.length) return null

  return (
    <div className="m-2 rounded-lg border bg-primary">
      <div className="flex- flex-col">
        <h1 className="center mt-4">Relation</h1>
        <div className="flex flex-row flex-wrap justify-center gap-3">
          {animes.map(anime => (
            <Link
              key={anime.id}
              href={PATH.ANIME.getTitlePath(anime.id)}
              className="flex w-28 flex-col items-center"
            >
              <div className="mb-2 h-40 w-28 overflow-hidden rounded-lg">
                <div className="text-white" key={anime.name}></div>
                <img
                  src={anime.poster}
                  alt=""
                  className="h-40 w-28 object-cover object-center"
                />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default AnimeRelation
