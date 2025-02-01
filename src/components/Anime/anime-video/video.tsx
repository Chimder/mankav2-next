
import { aniwatchApi } from '@/hooks/api/aniwatch/anime'

import VideoList from './video-list'
import { useRouter } from 'next/router'

type Props = {}

function AnimeVideo() {
  const router = useRouter()
  const id = router.query.id as string
  const { data: videoList } = aniwatchApi.useAnimeEpisodesById({ animeId: id })

  return (
    <div className="filterBar h-full overflow-y-scroll bg-primary pb-6 ">
      <VideoList
        key={`${videoList?.data?.totalEpisodes}${id}`}
        video={videoList?.data}
      />
    </div>
  )
}

export default AnimeVideo
