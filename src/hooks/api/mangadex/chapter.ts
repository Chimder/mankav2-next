import { useQuery } from '@tanstack/react-query'
import { getAtHomeServerChapterId, getChapterId, getMangaAggregate } from '@/shared/api/mangadex/generated'

export const chapterApi = {
  baseKey: 'feed',
  useMangaChapters: (id: string) => {
    return useQuery({
      queryKey: [chapterApi.baseKey, 'chapterID', id],
      queryFn: ({ signal }) =>
        getChapterId(id, { 'includes[]': ['manga'] }, { signal }),
      retry: 0,
      staleTime: 100000,
      enabled: Boolean(id),
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    })
  },
  useMangaChapterByID: (id: string) => {
    return useQuery({
      queryKey: [chapterApi.baseKey, 'atHome', id],
      queryFn: ({ signal }) =>
        getAtHomeServerChapterId(id, { forcePort443: false }, { signal }),
      refetchOnMount: false,
      enabled: Boolean(id),
      refetchOnWindowFocus: false,
      staleTime: 100000,
      retry: 0,
    })
  },
  useMangaAggregate: (id: string, languages: string) => {
    return useQuery({
      queryKey: [chapterApi.baseKey, id, languages],
      queryFn: ({ signal }) =>
        getMangaAggregate(
          id,
          { 'translatedLanguage[]': [languages] },
          { signal },
        ),
      refetchOnMount: false,
      enabled: Boolean(id),
      refetchOnWindowFocus: false,
      staleTime: 100000,
      retry: 0,
    })
  },
}
