import { lazy, useState } from 'react'
import { CharacterFull } from '@/shared/api/jikan/generated'
import { getCharacterImg } from '@/shared/utils/get-character-img'
import { usePersoneStore } from '@/store/characters-people'

import DialogAnime from './dialog-anime'
import DialogManga from './dialog-manga'

type Props = {
  character?: CharacterFull
  handleClose: () => void
}
function Character({ character, handleClose }: Props) {
  const setPersone = usePersoneStore().setPersone

  const [animeName, setAnimeName] = useState('')
  const [isOpenAnime, setIsOpenAnime] = useState(false)

  function handleAnimeName(name?: string) {
    if (!name) return null
    setAnimeName(name)
    setIsOpenAnime(true)
  }

  const [mangaName, setMangaName] = useState('')
  const [isOpen, setIsOpen] = useState(false)

  function handleMangaName(name?: string) {
    if (!name) return null
    setMangaName(name)
    setIsOpen(true)
  }

  function handleSetPersone() {
    setPersone(getPeople()?.mal_id as number, 'voices')
  }
  function getPeople() {
    return character?.voices?.find(per => per.language === 'Japanese')?.person
  }

  if (!character) return null
  return (
    <section className="filterBar h-full w-full overflow-y-scroll">
      <div className="mb-6 flex space-y-4 md:flex-col md:items-center md:space-x-6 md:space-y-0">
        <img
          className="mr-8 h-72 w-56 object-cover md:mx-0"
          src={getCharacterImg(character.images)}
          alt=""
        />
        <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 md:!m-0">
          <dt className="font-bold">Name:</dt>
          <dd>
            {character.name} {`(${character.name_kanji})`}
          </dd>

          {character.about && (
            <>
              <dt className="font-bold">About:</dt>
              <dd className="">
                {character.about?.length > 500
                  ? `${character.about.substring(0, 500)}...`
                  : character.about}
              </dd>
            </>
          )}

          {character.nicknames && character.nicknames.length > 0 && (
            <>
              <dt className="font-bold">Nicknames:</dt>
              <dd>{character.nicknames.join(', ')}</dd>
            </>
          )}
        </dl>
      </div>

      <DialogAnime
        key={'DIALOG_ANIME'}
        isOpen={isOpenAnime}
        name={animeName}
        setIsOpen={setIsOpenAnime}
        handleClose={handleClose}
      />
      <div className="w-full">
        <h1 className="mb-4 text-xl font-semibold">Anime Roles</h1>
        <div className="space-y-4">
          {character.anime?.map(manga => (
            <div
              key={manga.anime?.title}
              className="grid w-full grid-cols-2 items-center justify-between rounded-lg border border-border p-4 transition-colors hover:bg-accent/10"
              onClick={() => handleAnimeName(manga.anime?.title)}
            >
              <label className="mb-2 flex cursor-pointer items-center space-x-4 md:mb-0">
                <img
                  className="h-24 w-20 rounded-sm object-cover"
                  src={getCharacterImg(manga.anime?.images)}
                  alt={manga.role}
                />
                <div className="!m-1">
                  <div className="font-medium transition-colors sm:text-xs">
                    {manga.anime?.title}
                  </div>
                  <div className="text-muted-foreground sm:text-xs">
                    {manga.role}
                  </div>
                </div>
              </label>

              <div
                onClick={() => handleSetPersone()}
                className="flex w-full items-center justify-end"
              >
                <div className="center mr-4 cursor-pointer md:mr-2 sm:text-sm">
                  {getPeople()?.name}
                </div>
                {getPeople()?.images?.jpg?.image_url && (
                  <img
                    className="h-24 w-20 cursor-pointer rounded-sm object-cover"
                    src={getPeople()?.images?.jpg?.image_url!}
                    alt="Voice Actor"
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <DialogManga
        name={mangaName}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        handleClose={handleClose}
        key={'DIALOG manga'}
      />
      <div className="mt-6 w-full text-white">
        <h1 className="mb-4 text-xl font-semibold">Manga Roles</h1>
        <div className="space-y-4">
          {character.manga?.map(manga => (
            <div
              key={`${manga.manga?.title}mangaa`}
              className="grid w-full grid-cols-2 items-center justify-between rounded-lg border border-border p-4 transition-colors hover:bg-accent/10"
            >
              <div
                onClick={() => handleMangaName(manga.manga?.title)}
                className="mb-2 flex cursor-pointer items-center space-x-4 md:mb-0"
              >
                <img
                  className="h-24 w-20 cursor-pointer rounded-sm object-cover"
                  src={getCharacterImg(manga.manga?.images)}
                  alt={manga.manga?.title}
                />
                <div className="!ml-1">
                  <div className="font-medium transition-colors sm:text-xs">
                    {manga.manga?.title}
                  </div>
                  <div className="text-muted-foreground sm:text-xs">
                    {manga.role}
                  </div>
                </div>
              </div>
              <div
                onClick={() => handleSetPersone()}
                className="flex w-full items-center justify-end"
              >
                <div className="center mr-4 cursor-pointer md:mr-2 sm:text-sm">
                  {getPeople()?.name}
                </div>
                {getPeople()?.images?.jpg?.image_url && (
                  <img
                    className="h-24 w-20 cursor-pointer rounded-sm object-cover"
                    src={getPeople()?.images?.jpg?.image_url!}
                    alt="Voice Actor"
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
export default Character
