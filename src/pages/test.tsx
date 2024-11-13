import React, { useState } from 'react'

import Modal from '@/components/ui/modal'

import s from './test.module.css'

function Test() {
  return (
    <div className={s.test}>
      <div className={s.test1}>
        <Modal>
          <Modal.Trigger>
            <div>Open Modal</div>
          </Modal.Trigger>
          <Modal.Content>
            <div>This is the modal content</div>
          </Modal.Content>
          {/* <Modal.Close>Close X</Modal.Close> */}
        </Modal>
      </div>
    </div>
  )
}

export default Test
