import React, { useEffect } from 'react'
import ReactDOM from 'react-dom'

import s from './modal.module.css'

interface ModalProps {
  isOpen: boolean
  onClose?: () => void
  children: React.ReactNode
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  // useEffect(() => {
  //   const handleEscape = (event: KeyboardEvent) => {
  //     if (event.key === 'Escape') onClose()
  //   }
  //   document.addEventListener('keydown', handleEscape)
  //   return () => document.removeEventListener('keydown', handleEscape)
  // }, [onClose])

  if (!isOpen) return null

  return (
    <div className={s.overlay}>
      <dialog className={s.modal} open={isOpen}>
        {children}
      </dialog>
    </div>
  )
}

export default Modal
