import React, { ReactElement, Suspense, useState } from 'react'

import { jikanMangaApi } from '@/hooks/api/jikan/manga'

// import s from './test.module.css'

function Test() {
  const name = 'Too Many Losing Heroines!'
  const { data } = jikanMangaApi.useMangaByName({ name })

  const { data:characters } = jikanMangaApi.useMangaCharacters({ id:data?.mal_id })

  console.log('data>>>', data)

  return (
    <Suspense fallback={<div className="text-5xl text-white">loading....</div>}>
      <div className="h-full w-full">
        <ul>
          <li key={data?.mal_id}>
            <p className="text-white">{data?.mal_id}</p>
          </li>
        </ul>
        <div className="text-6xl text-amber-300">Test text</div>
      </div>
    </Suspense>
  )
}

export default Test
