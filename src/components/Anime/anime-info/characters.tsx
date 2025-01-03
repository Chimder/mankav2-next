import { useState } from 'react'
import DialogCharactersPeople from '@/components/characters-voices/dialog'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { jikanAnimeApi } from '@/hooks/api/jikan/anime'
import { CharacterImages } from '@/shared/api/jikan/generated'
import { usePersoneStore } from '@/store/characters-people'

export function getCharacterImg(img?: CharacterImages) {
  return img?.jpg?.image_url ?? undefined
}
type Props = {
  id?: number
}
const Characters = ({ id }: Props) => {
  const {
    data: characters,
    isFetching,
    isLoading,
  } = jikanAnimeApi.useAnimeCharactersById({ id: Number(id) })

  const setPersone = usePersoneStore().setPersone

  const [isOpen, setIsOpen] = useState(false)
  function handlePerson(id: number) {
    setPersone(id, 'character')
    setIsOpen(true)
  }

  const firstSixCharacters = characters?.data?.slice(0, 6) || []
  const restCharacters = characters?.data?.slice(6) || []

  // const isLoading = isLoadingManga || isLoadingCharacters
  // const isFetching = isFetchingManga || isFetchingCharacters
  if (isFetching || isLoading || !characters?.data?.length) {
    return null
  }

  return (
    <div className="center m-2 flex-col rounded-lg border-1 bg-primary shadow-red-950 shadow-header">
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
