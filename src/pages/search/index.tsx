import Link from 'next/link'
import { useRouter } from 'next/router'
import { useFilterStore } from '@/store/filter-slice'

import { mangaApi } from '@/hooks/manga'
import Button from '@/components/ui/button'
import { FilterManga } from '@/components/filter-manga/filter'
import { PaginationButtons } from '@/components/pagination-button'

import { queryClient } from '../_app'
import s from './search.module.css'

function SearchManga() {
  const router = useRouter()
  const currentPage = Number(router.query.page) || 1

  const input = useFilterStore().input
  const languages = useFilterStore().languages
  const tags = useFilterStore().tags
  const status = useFilterStore().status

  const { data: mangas } = mangaApi.useMangaSearch({
    status,
    tags,
    name: input,
    offset: (currentPage - 1) * 8,
  })

  const Search = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    queryClient.refetchQueries({ queryKey: [mangaApi.baseKey] })
  }

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
      <Button onClick={e => Search(e)}> Search</Button>
      <FilterManga />
      <PaginationButtons
        currentPage={currentPage}
        totalPages={Math.ceil(Number(mangas?.total) / 8)}
      />
    </div>
  )
}

export default SearchManga
