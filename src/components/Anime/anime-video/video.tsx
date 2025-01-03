import { useRouter } from 'next/router'

import { aniwatchApi } from '@/hooks/api/aniwatch/anime'

import VideoList from './video-list'

function AnimeVideo() {
  const router = useRouter()
  const id = router.query.id as string
  const { data: videoList } = aniwatchApi.useAnimeEpisodesById({ animeId: id })

  return (
    <div className="chapters-scrollbar h-full overflow-y-scroll pb-6">
      {/* <ScrollRestoration /> */}
      <VideoList
        key={`${videoList?.data?.totalEpisodes}${id}`}
        video={videoList?.data}
      />
    </div>
  )
}

export default AnimeVideo
