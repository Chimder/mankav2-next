import { useRouter } from 'next/router'

import { chapterApi } from '@/hooks/chapter'

import s from './chapter.module.css'

function Chapter() {
  const path = useRouter()
  const { data: chapters } = chapterApi.useMangaChapterByID(
    path?.query?.id as string,
  )
  console.log(chapters)

  return (
    <div className={s.chap}>
      {chapters?.chapter?.data?.map(chapter => (
        <div key={chapter}>
          <img
            src={`http://localhost:8080/img/${chapters.baseUrl}/data/${chapters.chapter?.hash}/${chapter}`}
            width={1200}
            height={800}
            loading="lazy"
            alt="Manga page"
          />

          {/* <div key={chapter}>chapter :{chapter}</div> */}
        </div>
      ))}
    </div>
  )
}

export default Chapter
