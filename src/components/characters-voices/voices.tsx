import { lazy, useState } from 'react'
import { PersonFull } from '@/shared/api/jikan/generated'
import { getPersoneImg } from '@/shared/utils/get-persone-img'
import { usePersoneStore } from '@/store/characters-people'
import dayjs from 'dayjs'

import DialogAnime from './dialog-anime'

// import DialogAnime from './dialog-anime'
// const DialogAnime = lazy(() => import('./dialog-anime'))

type Props = {
  voices: PersonFull
  handleClose: () => void
}

function Voices({ voices, handleClose }: Props) {
  const setPersone = usePersoneStore().setPersone

  const [animeName, setAnimeName] = useState('')
  const [isOpen, setIsOpen] = useState(false)

  function handleAnimeName(name?: string) {
    if (!name) return null
    setAnimeName(name)
    setIsOpen(true)
  }

  function handleSetCharacter(characterId?: number) {
    if (!characterId) return null
    setPersone(characterId, 'character')
  }

  if (!voices) return null
  return (
    <section className="filterBar h-full w-full overflow-y-scroll">
      <div className="mb-6 flex flex-col space-y-4 md:flex-row md:space-x-6 md:space-y-0">
        <img
          className="mx-auto h-72 w-56 object-cover md:mx-0"
          src={getPersoneImg(voices.images)}
          alt=""
        />
        <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-2">
          <dt className="font-bold transition-colors sm:ml-1 sm:text-xs sm:font-medium">
            Name:
          </dt>
          <dd>
            {voices.name} / {voices.given_name} / {voices.family_name}
          </dd>
          <dt className="font-bold transition-colors sm:ml-1 sm:text-xs sm:font-medium">Birthday:</dt>
          <dd>{dayjs(voices.birthday).format('DD.MM.YYYY')}</dd>
          {voices.about && (
            <>
              <dt className="font-bold transition-colors sm:ml-1 sm:text-xs sm:font-medium">About:</dt>
              <dd>{voices.about}</dd>
            </>
          )}
        </dl>
      </div>
      <div>
        {voices.voices &&
          voices.voices.map(anime => (
            <div
              key={`${anime.character?.name} ${anime.anime?.title} ${anime.character?.mal_id} voicesAnime`}
              className="grid w-full grid-cols-2 items-center justify-between rounded-lg border border-border p-4 transition-colors hover:bg-accent/10"
              // className="flex-col group mb-2 flex w-full items-center justify-between rounded-lg border border-border p-4 transition-colors hover:bg-accent/10 md:flex-row"
            >
              <div
                onClick={() => handleAnimeName(anime.anime?.title)}
                className="flex items-center justify-start"
              >
                <img
                  className="h-24 w-20 rounded object-cover"
                  src={getPersoneImg(anime.anime?.images)}
                  alt=""
                />

                <div className="ml-2 font-medium transition-colors sm:ml-1 sm:text-xs">
                  {anime.anime?.title}
                </div>
              </div>

              <div
                onClick={() => handleSetCharacter(anime.character?.mal_id)}
                className="center cursor-pointer justify-end"
              >
                <div className="mr-4 flex flex-col items-end">
                  <div className="ml-2 font-medium transition-colors sm:ml-1 sm:text-xs">
                    {anime.character?.name}
                  </div>
                  <div className="ml-2 font-medium transition-colors sm:ml-1 sm:text-xs">
                    {anime.role}
                  </div>
                </div>
                <img
                  className="h-24 w-20 rounded object-cover"
                  src={getPersoneImg(anime.character?.images)}
                  alt=""
                />
              </div>
            </div>
          ))}
      </div>
      <DialogAnime
        name={animeName}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        handleClose={handleClose}
        key={'dialogAnimeVoice'}
      />
    </section>
  )
}

export default Voices
