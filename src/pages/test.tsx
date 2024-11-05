import React from 'react'

import s from './test.module.css'

function Test() {
  return (
    <div className={s.test}>
      <div className={s.test1}>
        <div className={s.stickyContainer}>
          <div className={s.one}></div>
        </div>
      </div>
    </div>
  )
}

export default Test
