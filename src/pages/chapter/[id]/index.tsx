import { useRouter } from 'next/router'

import { chapterApi } from '@/hooks/chapter'

function Chapter() {
  const path = useRouter()
  const { data: chapters } = chapterApi.useMangaChapterByID(
    path?.query?.id as string,
  )
  console.log(chapters)

  return (
    <div>
      <div>
        {chapters?.chapter?.data?.map(chapter => (
          <div key={chapter}>
            <img
              src={`/api/proxy?url=${encodeURIComponent(`${chapters.baseUrl}/data/${chapters.chapter?.hash}/${chapter}`)}`}
              alt="Manga page"
            />

            {/* <div key={chapter}>chapter :{chapter}</div> */}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Chapter
