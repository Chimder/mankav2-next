import { useRouter } from 'next/router'

import { jikanMangaApi } from '@/hooks/api/jikan/manga'
import { mangaApi } from '@/hooks/api/mangadex/manga'

type Props = {}

const Relation = (props: Props) => {
  const router = useRouter()
  const mangaId = router?.query?.id as string
  const name = router?.query?.name as string
  // const { data: manga } = jikanMangaApi.useMangaByName({ name })
  const { data: manga } = mangaApi.useMangaByID(mangaId)
  const mangasIds = manga?.data?.relationships
    ?.map(id => id.id)
    .filter((id): id is string => id !== undefined)

  const { data: relations } = mangaApi.useMangaSearchMany({
    ids: mangasIds,
  })
 
  console.log('RELATION', relations)
  // console.log('RELATI22222ON', relations2)
  return (
    <div>
      <div>
        {/* <ul>
          {data?.data?.map(value => (
            <div key={value.id}>
            </div>
          ))}
        </ul> */}
      </div>
    </div>
  )
}

export default Relation
