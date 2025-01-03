import { lazy, useState } from 'react'
import dayjs from 'dayjs'
import { PeopleImages, PersonFull } from '@/shared/api/jikan/generated'
import { usePersoneStore } from '@/store/characters-people'
import DialogAnime from './dialog-anime'

// import DialogAnime from './dialog-anime'
// const DialogAnime = lazy(() => import('./dialog-anime'))

type Props = {
  voices: PersonFull
  handleClose: () => void
}

export function getPersoneImg(img?: PeopleImages) {
  if (img?.jpg?.image_url) return img.jpg.image_url
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
          <dt className="font-bold">Name:</dt>
          <dd>
            {voices.name} / {voices.given_name} / {voices.family_name}
          </dd>
          <dt className="font-bold">Birthday:</dt>
          <dd>{dayjs(voices.birthday).format('DD.MM.YYYY')}</dd>
          {voices.about && (
            <>
              <dt className="font-bold">About:</dt>
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
              className="flex-co group mb-2 flex w-full items-center justify-between rounded-lg border border-border p-4 transition-colors hover:bg-accent/10 md:flex-row"
            >
              <div
                onClick={() => handleAnimeName(anime.anime?.title)}
                className="center"
              >
                <img
                  className="h-24 w-20 rounded object-cover"
                  src={getPersoneImg(anime.anime?.images)}
                  alt=""
                />
                <div className="ml-4">{anime.anime?.title}</div>
              </div>

              <div
                onClick={() => handleSetCharacter(anime.character?.mal_id)}
                className="center cursor-pointer"
              >
                <div className="mr-4 flex flex-col items-end">
                  <div>{anime.character?.name}</div>
                  <div>{anime.role}</div>
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
