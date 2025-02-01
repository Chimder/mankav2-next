import { ScrollRestoration, useParams } from 'react-router-dom'

import { aniwatchApi } from '@/hooks/api/aniwatch/anime'

import VideoList from './video-list'

type Props = {}

function AnimeVideo() {
  const { id } = useParams()
  const { data: videoList } = aniwatchApi.useAnimeEpisodesById({ animeId: id })

  return (
    <div className="filterBar h-full overflow-y-scroll bg-primary pb-6 ">
      <ScrollRestoration />
      <VideoList
        key={`${videoList?.data?.totalEpisodes}${id}`}
        video={videoList?.data}
      />
    </div>
  )
}

export default AnimeVideo
