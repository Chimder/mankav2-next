import Cards from '@/components/Manga/cards/cards'
import { FilterMangaBar } from '@/components/Manga/filter-manga-bar/filter-manga-bar'

const MangaSearch = () => {
  return (
    <div className="flex w-full flex-col items-center overflow-y-hidden bg-black">
      <div className="flex h-[calc(100vh-64px)] w-full">
        <section className="filterBar flex-[2_1_0%] overflow-y-scroll">
          <Cards />
        </section>
        <section className="filterBar w-[300px] overflow-y-scroll">
          <FilterMangaBar />
        </section>
      </div>
    </div>
  )
}

export default MangaSearch
