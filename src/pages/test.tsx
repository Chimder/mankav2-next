import React, { ReactElement, Suspense, useState } from 'react'

import { jikanMangaApi } from '@/hooks/api/jikan/manga'

// import s from './test.module.css'

function Test() {
  const name = `WataMote: No Matter How I Look at It, It's You Guys' Fault I'm Not Popular!`
  const { data } = jikanMangaApi.useMangaByName({ name })

  const { data: characters } = jikanMangaApi.useMangaCharacters({
    id: data?.mal_id,
  })
  console.log(
    '<><<><<>',
    `No Matter How I Look at It, It's You Guys' Fault I'm Not Popular!`
    .toLowerCase()
    .trim()
    .includes(
        name
          .toLowerCase()
          .trim(),
      ),
  )
  console.log('TRIMED', name.toLowerCase())
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
