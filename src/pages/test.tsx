import React, { useState } from 'react'

import Modal from '@/components/ui/modal'

import s from './test.module.css'

function Test() {
  const [isModalOpen, setModalOpen] = useState(false)

  const handleOpenModal = () => setModalOpen(true)
  const handleCloseModal = () => {
    console.log('click')
    setModalOpen(false)
  }
  return (
    <div className={s.test}>
      <div className={s.test1}>
        <button onClick={handleOpenModal}>Open Modal</button>
        <Modal isOpen={isModalOpen}>
          <div> this is the modal content</div>
          <button onClick={handleCloseModal}>Close modal content!</button>
        </Modal>
      </div>
    </div>
  )
}

export default Test
