import { ReactNode, useState } from 'react'
import { ChapterResponse } from '@/shared/api/swagger/generated'

import Modal from './ui/modal'
import s from './modal-capter.module.css'

type flatAggregate = {
  chapter?: string
  count?: number
  id?: string
  others?: string[]
}

type Props = {
  children: ReactNode
  chapterData: ChapterResponse | undefined
  chapters: flatAggregate[]
}
function ModalChapter({ children, chapters, chapterData }: Props) {
  const [isOpen, setIsOpen] = useState(false)
  const toggleDropdown = () => setIsOpen(!isOpen)

  return (
    <div>
      <Modal className={s.modal}>
        <Modal.Trigger className={s.trigger}>{children}</Modal.Trigger>
        <Modal.Content className={s.content}>
          <div>
            <button onClick={toggleDropdown}>
              {chapterData?.data?.attributes?.chapter}
            </button>
          </div>

          {isOpen && (
            <ul className={s.list}>
              {chapters?.map(({ chapter, count, id }) => (
                <option className={s.item} key={id} value={`${count}`}>
                  {chapter}
                </option>
              ))}
            </ul>
          )}
        </Modal.Content>
      </Modal>
    </div>
  )
}

export default ModalChapter
