import Link from 'next/link'

import { mangaApi } from '@/hooks/manga'

function SearchManga() {
  const { data: mangas } = mangaApi.useMangaSearch({})

  console.log(mangas)
  return (
    <div>
      <div>
        {mangas?.data?.map(manga => (
          <Link href={`title/${manga.id}`} key={manga.id}>
            <img
              src={`http://localhost:8080/img/mangadex.org/covers/${manga.id}/${manga.relationships?.find(obj => obj.type === 'cover_art')?.attributes?.fileName}`}
              width={330}
              height={210}
              loading="lazy"
              alt=""
            />
          </Link>
        ))}
      </div>
    </div>
  )
}

export default SearchManga
