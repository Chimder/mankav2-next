import { useRouter } from 'next/router'
import { queryClient } from '@/pages/_app'
import { CharacterImages } from '@/shared/api/jikan/generated'

import { jikanMangaApi } from '@/hooks/api/jikan/manga'

type Props = {}

const Characters = (props: Props) => {
  const route = useRouter()
  const name = route?.query?.name as string
  const { data: manga } = jikanMangaApi.useMangaByName({ name })
  const { data: characters } = jikanMangaApi.useMangaCharacters({
    id: manga?.mal_id,
  })

  // const id = queryClient.getQueriesData([jikanMangaApi.baseKey, name])!

  function getCharacterImg(img?: CharacterImages) {
    if (img?.jpg?.image_url) {
      return img.jpg.image_url
    }
    return undefined
  }
  return (
    <div>
      <div>
        <ul>
          {characters &&
            characters?.data?.slice(0, 5).map(character => (
              <li key={character.character?.name}>
                <img
                  src={getCharacterImg(character.character?.images)}
                  alt=""
                />
              </li>
            ))}
        </ul>
      </div>
    </div>
  )
}

export default Characters
