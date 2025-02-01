import { ReactNode, useCallback, useEffect } from 'react'
import { jikanCharacterPeopleApi } from '@/hooks/api/jikan/characters'
import {
  CharacterFull,
  GetCharacterFullById200,
  GetPersonFullById200,
  PersonFull,
} from '@/shared/api/jikan/generated'
import { usePersoneStore } from '@/store/characters-people'

import { Dialog, DialogContent, DialogTitle } from '../ui/dialog'
import Characters from './character'
import Voices from './voices'
import { useParams } from 'react-router-dom'

type Props = {
  children?: ReactNode
  isOpen?: boolean
  setIsOpen: (isOpen: boolean) => void
}

function DialogCharactersPeople({ isOpen = false, setIsOpen }: Props) {
  const { id } = useParams()
  const personeId = usePersoneStore().id
  const personeType = usePersoneStore().type

  const { data } = jikanCharacterPeopleApi.usePersoneById({
    id: personeId,
    type: personeType,
  }) as {
    data: GetCharacterFullById200 | GetPersonFullById200 | undefined
  }

  const handleClose = useCallback(() => {
    setIsOpen(false)
  }, [setIsOpen])

  useEffect(() => {
    handleClose()
  }, [handleClose, id])

  return (
    <Dialog  open={isOpen} onOpenChange={handleClose}>
      <DialogContent
        className="flex chapters-scrollbar h-[90vh] w-[80vw] max-w-[1200px] md:w-[99vw] md:h-[94vh] flex-col items-center bg-black text-white justify-center p-2"
        onPointerDownOutside={handleClose}
        onEscapeKeyDown={handleClose}
      >
        <DialogTitle></DialogTitle>

        {personeType === 'voices' ? (
          <Voices
            handleClose={handleClose}
            key={`voices`}
            voices={data?.data as PersonFull}
          />
        ) : (
          <Characters
            handleClose={handleClose}
            key={`characters`}
            character={data?.data as CharacterFull}
          />
        )}
      </DialogContent>
    </Dialog>
  )
}

export default DialogCharactersPeople
