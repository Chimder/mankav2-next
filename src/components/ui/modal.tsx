import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react'
import classNames from 'classnames'

import s from './modal.module.css'

interface ModalProps {
  children: ReactNode
  className?: string
}

interface ModalTriggerProps {
  children: ReactNode
  className?: string
}

interface ModalContentProps {
  children: ReactNode
  className?: string
}

interface ModalCloseProps {
  children: ReactNode
  className?: string
}

interface ModalContextProps {
  open: () => void
  close: () => void
  isOpen: boolean
  hasCloseButton: boolean
}

const ModalContext = createContext<ModalContextProps | undefined>(undefined)

const Modal: React.FC<ModalProps> & {
  Trigger: React.FC<ModalTriggerProps>
  Close: React.FC<ModalCloseProps>
  Content: React.FC<ModalContentProps>
} = ({ children, className }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [hasCloseButton, setHasCloseButton] = useState(false)

  const open = () => setIsOpen(true)
  const close = () => setIsOpen(false)

  useEffect(() => {
    setHasCloseButton(
      React.Children.toArray(children).some(
        child => React.isValidElement(child) && child.type === Modal.Close,
      ),
    )
  }, [children])

  return (
    <ModalContext.Provider value={{ open, close, isOpen, hasCloseButton }}>
      {React.Children.map(children, child =>
        React.isValidElement(child) && child.type === Modal.Trigger
          ? child
          : null,
      )}
      {isOpen && (
        <div
          className={s.overlay}
          onClick={() => !hasCloseButton && close()}
          aria-hidden="true"
        >
          <dialog
            className={classNames(className)}
            open={isOpen}
            onClick={e => e.stopPropagation()}
          >
            {React.Children.map(children, child =>
              React.isValidElement(child) &&
              (child.type === Modal.Content || child.type === Modal.Close)
                ? child
                : null,
            )}
          </dialog>
        </div>
      )}
    </ModalContext.Provider>
  )
}

const ModalTrigger: React.FC<ModalTriggerProps> = ({ children, className }) => {
  const context = useContext(ModalContext)
  if (!context) {
    throw new Error('Modal.Trigger must be used within a Modal')
  }

  return (
    <div className={classNames(className)} onClick={context.open}>
      {children}
    </div>
  )
}

const ModalContent: React.FC<ModalContentProps> = ({ children, className }) => {
  const context = useContext(ModalContext)
  if (!context) {
    throw new Error('Modal.Content must be used within a Modal')
  }

  return <div className={classNames(className)}>{children}</div>
}

const ModalClose: React.FC<ModalCloseProps> = ({ children, className }) => {
  const context = useContext(ModalContext)
  if (!context) {
    throw new Error('Modal.Close must be used within a Modal')
  }

  return (
    <div className={classNames(className)} onClick={context.close}>
      {children}
    </div>
  )
}

Modal.Trigger = ModalTrigger
Modal.Content = ModalContent
Modal.Close = ModalClose

export default Modal
