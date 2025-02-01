import { ReactNode, useCallback, useEffect } from 'react'
import { useRouter } from 'next/router'
import {
  CharacterFull,
  GetCharacterFullById200,
  GetPersonFullById200,
  PersonFull,
} from '@/shared/api/jikan/generated'
import { usePersoneStore } from '@/store/characters-people'

import { jikanCharacterPeopleApi } from '@/hooks/api/jikan/characters'

import { Dialog, DialogContent, DialogTitle } from '../ui/dialog'
import Characters from './character'
import Voices from './voices'

type Props = {
  children?: ReactNode
  isOpen?: boolean
  setIsOpen: (isOpen: boolean) => void
}

function DialogCharactersPeople({ isOpen = false, setIsOpen }: Props) {
  const router = useRouter()
  const id = router.query.id as string
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
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent
        className="chapters-scrollbar flex h-[90vh] w-[80vw] max-w-[1200px] flex-col items-center justify-center bg-black p-2 text-white md:h-[94vh] md:w-[99vw]"
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
