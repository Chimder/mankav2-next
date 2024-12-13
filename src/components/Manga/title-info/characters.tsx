import { useRouter } from 'next/router'
import Link from 'next/link'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion'
import { jikanMangaApi } from '@/hooks/api/jikan/manga'
import { CharacterImages } from '@/shared/api/jikan/generated'
import { Separator } from '@/components/ui/separator'

const Characters = () => {
  const route = useRouter()
  const name = route?.query?.name as string
  const { data: manga } = jikanMangaApi.useMangaByName({ name })
  const { data: characters } = jikanMangaApi.useMangaCharacters({
    id: manga?.mal_id,
  })

  function getCharacterImg(img?: CharacterImages) {
    return img?.jpg?.image_url ?? undefined
  }

  const firstSixCharacters = characters?.data?.slice(0, 6) || []
  const restCharacters = characters?.data?.slice(6) || []

  return (
    <div className='border-1  border-yellow-800 m-1 center flex-col'>
      {characters &&
      <h1 className='text-lg text-yellow-700'>Characters</h1>
      }
      <div className=''>
        <ul className='flex center flex-wrap gap-2'>
          {firstSixCharacters.map(character => (
            <Link
              className='w-32 flex flex-col items-center'
              href={"/"}
              key={character.character?.name}
            >
              <div className='w-32 h-40 mb-2 overflow-hidden flex items-center justify-center'>
                <img
                  className='w-full h-full object-cover'
                  src={getCharacterImg(character.character?.images)}
                  alt={character.character?.name}
                />
              </div>
              <p className='text-center text-sm line-clamp-2 h-10'>
                {character.character?.name}
              </p>
            </Link>
          ))}
        </ul>

        {restCharacters.length > 0 && (
          <Accordion type="single" collapsible className="w-full border-0 mb-1 mt-4">
            <AccordionItem value="all-characters border-0">
              <AccordionTrigger className='flex border-0 justify-center w-6 h-6'>
              </AccordionTrigger>
              <AccordionContent className='border-0'>
                <ul className='flex center flex-wrap gap-2'>
                  {restCharacters.map(character => (
                    <Link
                      className='w-32 flex flex-col items-center'
                      href={"/"}
                      key={character.character?.name}
                    >
                      <div className='w-32 h-40 mb-2 overflow-hidden flex items-center justify-center'>
                        <img
                          className='w-full h-full object-cover'
                          src={getCharacterImg(character.character?.images)}
                          alt={character.character?.name}
                        />
                      </div>
                      <p className='text-center text-sm line-clamp-2 h-10'>
                        {character.character?.name}
                      </p>
                    </Link>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        )}
      </div>
    </div>
  )
}

export default Characters