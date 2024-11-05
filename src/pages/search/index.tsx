import Link from 'next/link'
import { useRouter } from 'next/router'

import { mangaApi } from '@/hooks/manga'
import { PaginationButtons } from '@/components/pagination-button'

import s from './search.module.css'
import { FilterManga } from '@/components/filter-manga/filter'

function SearchManga() {
  const router = useRouter()
  const currentPage = Number(router.query.page) || 1

  const { data: mangas } = mangaApi.useMangaSearch({
    offset: (currentPage - 1) * 8,
  })

  console.log(mangas)
  // const mangas2 = mangas?.pages.flatMap(page => page.data)
  return (
    <div className={s.searchContainer}>
      <ul className={s.list}>
        {mangas?.data?.map(manga => (
          <Link className={s.item} href={`title/${manga?.id}`} key={manga?.id}>
            <img
              src={`http://localhost:8080/img/mangadex.org/covers/${manga?.id}/${manga?.relationships?.find(obj => obj.type === 'cover_art')?.attributes?.fileName}`}
              width={280}
              height={310}
              loading="lazy"
              alt=""
            />
          </Link>
        ))}
      </ul>
      <FilterManga />
      <PaginationButtons
        currentPage={currentPage}
        totalPages={Math.ceil(Number(mangas?.total) / 8)}
      />
    </div>
  )
}

export default SearchManga
