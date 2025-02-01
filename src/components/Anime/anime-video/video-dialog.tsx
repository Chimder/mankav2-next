import { aniwatchApi } from '@/hooks/api/aniwatch/anime'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import { Skeleton } from '@/components/ui/skeleton'

import VideoPlayer from './player/video-player'

type Props = {
  episodeId: string
  isOpen?: boolean
  setIsOpen: (isOpen: boolean) => void
}

function VideoDialog({ isOpen, setIsOpen, episodeId }: Props) {
  const animeServers = aniwatchApi.useAnimeEpisodesServers({
    episodeId,
  })

  const animeSources = aniwatchApi.useAnimeEpisodeSources({
    animeEpisodeId: animeServers.data?.data?.episodeId,
    server: animeServers.data?.data?.sub[0]?.serverName,
    catygory: 'sub',
  })

  function handleClose() {
    setIsOpen(false)
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent
        className="flex h-[90vh] w-[80vw] max-w-[1200px] flex-col items-center justify-center bg-black p-2"
        onPointerDownOutside={handleClose}
        onEscapeKeyDown={handleClose}
      >
        <div className="w-full rounded-lg border border-primary">
          {animeServers.isLoading || animeSources.isLoading ? (
            <div className="relative aspect-video w-full bg-black">
              <Skeleton className="h-full w-full"></Skeleton>
            </div>
          ) : (
            animeSources.data?.data && (
              <VideoPlayer {...animeSources.data?.data} />
            )
          )}
        </div>
        <DialogTitle></DialogTitle>
      </DialogContent>
    </Dialog>
  )
}

export default VideoDialog
