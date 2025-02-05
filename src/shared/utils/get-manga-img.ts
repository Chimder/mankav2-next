import { Manga } from '../api/mangadex/generated'

export const getMangaImg = (id?: string, manga?: Manga) => {
  if (!id || !manga?.relationships) return undefined

  return `${process.env.NEXT_PUBLIC_VITE_IMG_PROXY}/img/mangadex.org/covers/${id}/${
    manga.relationships.find(obj => obj.type === 'cover_art')?.attributes
      ?.fileName
  }.512.jpg`
}
