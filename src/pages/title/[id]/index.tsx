import Chapters from '@/components/Manga/title-info/chapters'
import Characters from '@/components/Manga/title-info/characters'
import Info from '@/components/Manga/title-info/info'
import Relation from '@/components/Manga/title-info/relation'

function Title() {
  return (
    <div className="flex h-full w-full border-green-400 px-[2px] text-white">
      <div className="order-2 flex w-2/5 flex-col">
        <div className="flex flex-col">
          <Info />
          <Characters />
          <Relation />
        </div>
      </div>
      <div className="w-3/5 border border-green-400 text-white">
        <Chapters />
      </div>
    </div>
  )
}

export default Title
