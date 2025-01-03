import { useEffect, useState } from 'react'
import { useSearchParams } from '@remix-run/react'
import DialogCharactersPeople from '@/components/characters-voices/dialog'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { jikanMangaApi } from '@/hooks/api/jikan/manga'
import { CharacterImages } from '@/shared/api/jikan/generated'
import { usePersoneStore } from '@/store/characters-people'
import { useRouter } from 'next/router'

export function getCharacterImg(img?: CharacterImages) {
  return img?.jpg?.image_url ?? undefined
}
const Characters = () => {
  const router = useRouter()
  const name = router.query?.name as string
  // const [searchParams] = useSearchParams()
  // const name = searchParams.get('name')
  const {
    data: manga,
    isFetching: isFetchingManga,
    isLoading: isLoadingManga,
  } = jikanMangaApi.useMangaByName({ name })
  const {
    data: characters,
    isFetching: isFetchingCharacters,
    isLoading: isLoadingCharacters,
  } = jikanMangaApi.useMangaCharacters({ id: manga?.mal_id })

  const setPersone = usePersoneStore().setPersone

  const [isOpen, setIsOpen] = useState(false)

  function handlePerson(id: number) {
    setPersone(id, 'character')
    setIsOpen(true)
  }
  // async function handlePerson(id: number) {
  //   await setPersone(id, 'character')
  //   setIsOpen(true)
  // }

  const firstSixCharacters = characters?.data?.slice(0, 6) || []
  const restCharacters = characters?.data?.slice(6) || []

  const isLoading = isLoadingManga || isLoadingCharacters
  const isFetching = isFetchingManga || isFetchingCharacters
  if (isFetching || isLoading || !characters?.data?.length) {
    return null
  }

  return (
    <div className="center m-2 flex-col rounded-lg border-1 bg-primary">
      <h1 className="text-lg text-yellow-700">Characters</h1>
      <div className="">
        <ul className="center flex flex-wrap gap-2">
          {firstSixCharacters.map(character => (
            <div
              className="flex w-28 flex-col items-center"
              key={`${character.character?.name} six`}
              onClick={() =>
                handlePerson(character.character?.mal_id as number)
              }
            >
              <div className="h-38 mb-2 flex w-28 items-center justify-center overflow-hidden">
                <img
                  className="h-full w-full object-cover"
                  src={getCharacterImg(character.character?.images)}
                  alt={character.character?.name}
                />
              </div>
              <p className="line-clamp-2 h-10 text-center text-sm">
                {character.character?.name}
              </p>
            </div>
          ))}
        </ul>

        <DialogCharactersPeople setIsOpen={setIsOpen} isOpen={isOpen} />

        {restCharacters.length > 0 && (
          <Accordion
            type="single"
            collapsible
            className="mb-1 mt-4 w-full border-0"
          >
            <AccordionItem value="all-characters border-0">
              <AccordionTrigger className="flex h-6 w-6 justify-center border-0"></AccordionTrigger>
              <AccordionContent className="border-0">
                <ul className="center flex flex-wrap gap-2">
                  {restCharacters.map(character => (
                    <div
                      className="flex w-28 flex-col items-center"
                      key={`${character.character?.name}rest`}
                      onClick={() =>
                        handlePerson(character.character?.mal_id as number)
                      }
                    >
                      <div className="h-38 mb-2 flex w-28 items-center justify-center overflow-hidden">
                        <img
                          className="h-full w-full object-cover"
                          src={getCharacterImg(character.character?.images)}
                          alt={character.character?.name}
                        />
                      </div>
                      <p className="line-clamp-2 h-10 text-center text-sm">
                        {character.character?.name}
                      </p>
                    </div>
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
