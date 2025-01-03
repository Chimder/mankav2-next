import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

import type {
  AnimeByIdType,
  AnimeByNameType,
  AnimeServerType,
  AnimeSources,
  AnimeVideoType,
} from './types'
import { findBestMatches } from '@/shared/utils/find-best-matches'

const url = process.env.NEXT_PUBLIC_VITE_ANIWATCH!
export const instance = axios.create({
  baseURL: `${url}/api/v2/hianime`,
  headers: {
    'Content-Type': 'application/json',
    'Accept': '*/*',
  },
})

export const aniwatchApi = {
  baseKey: 'aniwatchApi',
  useAnimeByName: ({ name }: { name: string }) => {
    return useQuery({
      queryKey: [aniwatchApi.baseKey, name],
      queryFn: async ({ signal }) => {
        if (!name) return null

        const res = await instance.get<AnimeByNameType>('/search', {
          params: { q: name },
          signal,
        })

        const topAnimes = res.data.data.animes.slice(0, 5)

        const ress = findBestMatches(name, topAnimes)

        return ress
      },
      refetchOnMount: false,
      enabled: Boolean(name),
      refetchOnWindowFocus: false,
      staleTime: 100000,
      retry: 0,
    })
  },

  useAnimeInfoById: ({ id }: { id?: string }) => {
    return useQuery({
      queryKey: [aniwatchApi.baseKey, 'info', id],
      queryFn: async ({ signal }) => {
        const res = await instance.get<AnimeByIdType>(`/anime/${id}`, {
          signal,
        })
        return res.data
      },
      refetchOnMount: false,
      enabled: Boolean(id),
      refetchOnWindowFocus: false,
      staleTime: 100000,
      retry: 0,
    })
  },
  useAnimeEpisodesById: ({ animeId }: { animeId?: string }) => {
    return useQuery({
      queryKey: [aniwatchApi.baseKey, 'episodes', animeId],
      queryFn: async ({ signal }) => {
        const res = await instance.get<AnimeVideoType>(
          `/anime/${animeId}/episodes`,
          {
            signal,
          },
        )
        return res.data
      },
      refetchOnMount: false,
      enabled: Boolean(animeId),
      refetchOnWindowFocus: false,
      staleTime: 100000,
      retry: 0,
    })
  },
  useAnimeEpisodesServers: ({ episodeId }: { episodeId: string }) => {
    return useQuery({
      queryKey: [aniwatchApi.baseKey, 'episode server', episodeId],
      queryFn: async ({ signal }) => {
        const res = await instance.get<AnimeServerType>('/episode/servers', {
          params: { animeEpisodeId: episodeId },
          signal,
        })
        return res.data
      },
      refetchOnMount: false,
      enabled: Boolean(episodeId),
      refetchOnWindowFocus: false,
      staleTime: 100000,
      retry: 0,
    })
  },
  useAnimeEpisodeSources: ({
    animeEpisodeId,
    server,
    catygory,
  }: {
    animeEpisodeId?: string
    server?: string
    catygory?: 'sub' | 'dub' | 'raw'
  }) => {
    return useQuery({
      queryKey: [aniwatchApi.baseKey, animeEpisodeId, server, catygory],
      queryFn: async ({ signal }) => {
        const res = await instance.get<AnimeSources>('/episode/sources', {
          params: { animeEpisodeId, server, catygory },
          signal,
        })
        return res.data
      },
      refetchOnMount: false,
      enabled: Boolean(animeEpisodeId && server && catygory),
      refetchOnWindowFocus: false,
      staleTime: 100000,
      retry: 0,
    })
  },
}
