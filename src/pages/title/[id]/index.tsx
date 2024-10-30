import Link from 'next/link'
import { useRouter } from 'next/router'

import { feedApi } from '@/hooks/feeds'

function Title() {
  const path = useRouter()
  const { data: chapters } = feedApi.useMangaFeed(path.query.id as string)

  return (
    <div>
      <div>
        {chapters?.data?.map(chapter => (
          <Link href={`/chapter/${chapter.id}`} key={chapter.id}>
            <div>chapter :{chapter.id}</div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Title
