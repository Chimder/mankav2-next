import Cards from '@/components/Manga/cards/cards'
import { FilterMangaBar } from '@/components/Manga/filter-manga-bar/filter-manga-bar'

const MangaSearch = () => {
  return (
    <div className="flex w-screen flex-col items-center overflow-y-hidden bg-black lg:overflow-y-scroll">
      <div className="flex h-[calc(100vh-64px)] w-full lg:h-full lg:flex-col">
        <div className="filterBar h-full flex-[2_1_0%] overflow-y-scroll lg:order-1 lg:flex-[1_1_100%]">
          <Cards />
        </div>
        <section className="filterBar w-[300px] overflow-y-scroll lg:w-full">
          <FilterMangaBar />
        </section>
      </div>
    </div>
  )
}

export default MangaSearch
