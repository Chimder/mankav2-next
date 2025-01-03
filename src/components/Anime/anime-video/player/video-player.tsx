/* eslint-disable jsx-a11y/media-has-caption */
import React, { useEffect, useRef, useState } from 'react'
import { Source, Track } from '@/hooks/api/aniwatch/types'
import Hls from 'hls.js'

interface VideoPlayerProps {
  sources?: Source[]
  tracks?: Track[]
  intro?: { start: number; end: number }
  outro?: { start: number; end: number }
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({
  sources,
  tracks,
  intro,
  outro,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null)
  const hlsRef = useRef<Hls | null>(null)
  const [showSkipIntro, setShowSkipIntro] = useState(false)

  const handleTimeUpdate = () => {
    if (intro && videoRef.current) {
      const currentTime = videoRef.current.currentTime
      setShowSkipIntro(currentTime >= intro.start && currentTime < intro.end)
    }
  }

  useEffect(() => {
    const video = videoRef.current
    if (!video || !sources?.length) return

    const hlsSource = sources.find(source => source.type === 'hls')

    if (hlsSource && Hls.isSupported()) {
      if (hlsRef.current) {
        hlsRef.current.destroy()
      }

      const hls = new Hls({
        enableWorker: true,
        lowLatencyMode: true,
      })

      hlsRef.current = hls

      hls.on(Hls.Events.ERROR, (event, data) => {
        console.error('HLS Error:', data)
        if (data.fatal) {
          switch (data.type) {
            case Hls.ErrorTypes.NETWORK_ERROR:
              hls.startLoad()
              break
            case Hls.ErrorTypes.MEDIA_ERROR:
              hls.recoverMediaError()
              break
            default:
              hls.destroy()
              break
          }
        }
      })

      hls.loadSource(hlsSource.url)
      hls.attachMedia(video)

      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video.play().catch(error => {
          console.log('Autoplay prevented:', error)
        })
      })

      video.addEventListener('timeupdate', handleTimeUpdate)
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = hlsSource?.url || ''
      video.addEventListener('timeupdate', handleTimeUpdate)
      video.addEventListener('loadedmetadata', () => {
        video.play().catch(error => {
          console.log('Autoplay prevented:', error)
        })
      })
    }

    return () => {
      if (hlsRef.current) {
        hlsRef.current.destroy()
        hlsRef.current = null
      }
      video.removeEventListener('timeupdate', handleTimeUpdate)
    }
  }, [sources, intro])

  const skipIntro = () => {
    if (videoRef.current && intro?.end) {
      videoRef.current.currentTime = intro.end
    }
  }

  const captionTracks = tracks?.filter(
    track => track.kind === 'captions' || track.kind === 'subtitles',
  )

  return (
    <div className="relative aspect-video w-full bg-black">
      <video
        ref={videoRef}
        className="h-full w-full rounded-sm border-none outline-none "
        controls
        crossOrigin="anonymous"
      >
        {captionTracks?.map((track, index) => (
          <track
          className=''
            key={track.file}
            kind={track.kind}
            label={track.label}
            src={track.file}
            default={track.default || index === 0}
          />
        ))}
      </video>

      {showSkipIntro && (
        <button
          className="absolute bottom-20 right-4 rounded bg-white/20 px-4 py-2 hover:bg-white/30"
          onClick={skipIntro}
        >
          Skip Intro
        </button>
      )}
    </div>
  )
}

export default VideoPlayer
