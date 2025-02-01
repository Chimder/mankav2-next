import { getFirstTitle } from '@/shared/utils/get-first-title'
import { Link, useParams } from 'react-router-dom'

import { mangaApi } from '@/hooks/api/mangadex/manga'
import { PATH } from '@/app/routers/path-constants'

const Relation = () => {
  const { id: mangaId } = useParams()
  const {
    data: manga,
    isFetching,
    isLoading,
  } = mangaApi.useMangaByID(mangaId)
  const mangasIds = manga?.data?.relationships
    ?.map(id => id.id)
    .filter((id): id is string => id !== undefined)

  const { data: relations, isFetching: isRelationsFetching } =
    mangaApi.useMangaSearchMany({
      ids: mangasIds,
    })

  // function backgroundImageUrl(manga: Manga) {
  //   return `/api/proxy?url=https://mangadex.org/covers/${manga.id}/${manga?.relationships?.find(obj => obj.type === 'cover_art')?.attributes?.fileName}`
  // }

  if (
    !relations?.data?.length ||
    isFetching ||
    isRelationsFetching ||
    isLoading
  )
    return null
  return (
    <div className="m-2 flex flex-col items-center rounded-lg border-1 bg-primary md:hidden sm:mx-0">
      <h1 className="text-lg text-green-200">Relation Manga</h1>
      <ul className="flex flex-row flex-wrap justify-center gap-3 sm:justify-evenly sm:gap-1">
        {relations?.data?.map(manga => (
          <Link
            className="flex w-32 flex-col items-center sm:w-28"
            to={`${PATH.MANGA.getTitlePath(manga.id)}?name=${getFirstTitle(manga.attributes?.title)}`}
            key={manga.id}
          >
            <div className="mb-2 h-40 w-32 overflow-hidden sm:h-32 sm:w-28">
              <img
                className="h-full w-full rounded-md object-cover"
                src={`${import.meta.env.VITE_IMG_PROXY!}/img/mangadex.org/covers/${manga.id}/${manga?.relationships?.find(obj => obj.type === 'cover_art')?.attributes?.fileName}.256.jpg`}
                loading="lazy"
                alt={getFirstTitle(manga.attributes?.title)}
              />
            </div>
            <div className="line-clamp-2 text-center text-sm">
              {getFirstTitle(manga.attributes?.title)}
            </div>
          </Link>
        ))}
      </ul>
    </div>
  )
}

export default Relation
