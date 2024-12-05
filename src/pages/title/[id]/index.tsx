import Chapters from '@/components/title-info/chapters'
import Info from '@/components/title-info/info'

function Title() {
  return (
    <div className="flex h-full  w-full  border-green-400 text-white">
      <Info />
      <Chapters />
    </div>
  )
}

export default Title
