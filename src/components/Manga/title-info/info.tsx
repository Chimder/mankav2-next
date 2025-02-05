import { useRouter } from 'next/router'
import { cn } from '@/shared/lib/tailwind'
import { getFirstTitle } from '@/shared/utils/get-first-title'
import dayjs from 'dayjs'

import { mangaApi } from '@/hooks/api/mangadex/manga'
import { useFavoriteManga } from '@/hooks/favorite-toggle/use-favorite-manga'

import CharactersList from './characters-list'
import Relation from './relation'
import { getMangaImg } from '@/shared/utils/get-manga-img'



const Info = () => {
  const router = useRouter()
  const mangaId = router.query.id as string
  const { data: manga } = mangaApi.useMangaByID(mangaId)

  const { isFavorite, handleToggleFavorite } = useFavoriteManga()

  return (
    <section className="w-full text-white">
      <div className="mx-1 flex flex-col items-center justify-center rounded-lg border-1 bg-primary">
        <img
          className="relative z-10 h-[440px] w-[310px] lg:h-[360px] lg:w-[260px]"
          src={getMangaImg(mangaId, manga?.data)}
          alt=""
        />
        <div className="flex h-full">
          <div className="py-4">
            <div className="mx-0 my-3 text-sm">
              <span className="center text-lg text-blue-300">
                {getFirstTitle(manga?.data?.attributes?.title)}
              </span>
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
            </div>
            <div className="title">
              <span className="head">Created:</span>
              <span className="text-sm">
                {dayjs(manga?.data?.attributes?.createdAt).format('YYYY')}
              </span>
            </div>
            <div className="title">
              <span className="head">Year:</span>
              <span className="text-sm">{manga?.data?.attributes?.year}</span>
            </div>
            <div className="title">
              <span className="head">Chapters:</span>
            </div>
            <div className="titleGenres">
              <span className="head">Status: </span>
              <div className="rounded-4xl mb-1 ml-[2px] inline-block rounded-2xl border-1 bg-transparent px-2 py-1 text-sm">
                {manga?.data?.attributes?.status}
              </div>
            </div>
            <div className="titleGenres">
              <span className="head">Genres: </span>
              {manga?.data?.attributes?.tags?.slice(0, 5).map(tag => (
                <div
                  className="rounded-4xl mb-1 ml-[2px] inline-block rounded-2xl border-1 bg-transparent px-2 py-1 text-sm text-white"
                  key={tag.id}
                >
                  {tag.attributes?.name?.en}
                </div>
              ))}
            </div>
            <div className="title">
              <span className="head">Author</span>
              <span className="text-sm">
                {
                  manga?.data?.relationships?.find(obj => obj.type == 'author')
                    ?.attributes?.name as string
                }
              </span>
            </div>
          </div>
        </div>
      </div>

      <CharactersList />
      <Relation />
    </section>
  )
}

export default Info
