import React from 'react'
import { useRouter } from 'next/router'
import dayjs from 'dayjs'

import { mangaApi } from '@/hooks/api/manga'

type Props = {}

const Info = (props: Props) => {
  const path = useRouter()
  const mangaId = path?.query?.id as string
  const { data: manga } = mangaApi.useMangaByID(mangaId)

  const backgroundImageUrl = `/api/proxy?url=https://mangadex.org/covers/${mangaId}/${
    manga?.data?.relationships?.find(obj => obj.type === 'cover_art')
      ?.attributes?.fileName
  }`

  console.log('INFO', manga)
  return (
    <section className="flex flex-col order-2 w-1/3">
      <div className="fixed border-[1px] border-green-400 flex flex-col justify-center items-center">
        {/* <div className=''> */}
        <img
          className="relative w-[310px] h-[440px] z-10"
          src={backgroundImageUrl}
          alt=""
        />
        <div className="h-full flex">
          <div className="py-4 ">
            <div className="my-3 mx-0 text-sm">
              <span className="mr-1 mb-2.5 text-sm">Title:</span>
              <span className="text-base">
                {manga?.data?.attributes?.title?.en}
              </span>
            </div>
            <div className="title">
              <span className="head">Created:</span>
              <span className="text-sm">
                {dayjs(manga?.data?.attributes?.createdAt).format('YYYY')}
              </span>
            </div>
            <div className="title">
              <span className="head">Year:</span>
              <span className="text-sm">{manga?.data?.attributes?.year}</span>
            </div>
            <div className="title">
              <span className="head">Chapters:</span>
              {/* <span className="text-sm">{chapters?.data?.length}</span> */}
            </div>

            <div className="titleGenres">
              <span className="head">Status: </span>
              <div className=" inline-block py-1 px-2 ml-[2px] mb-1 text-sm bg-transparent border-1 rounded-4xl">
                {manga?.data?.attributes?.status}
              </div>
            </div>
            <div className="titleGenres">
              <span className="head">Genres: </span>
              {manga?.data?.attributes?.tags?.slice(0, 5).map(tag => (
                <div
                  className="inline-block py-1 px-2 ml-[2px] mb-1 text-sm bg-transparent border-1 rounded-4xl"
                  key={tag.id}
                >
                  {tag.attributes?.name?.en}
                </div>
              ))}
            </div>
            <div className="title">
              <span className="head">Author</span>
              <span className="text-sm">
                {
                  manga?.data?.relationships?.find(obj => obj.type == 'author')
                    ?.attributes?.name as string
                }
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Info
