import {
  getAtHomeServerChapterId,
  getChapter,
  getChapterId,
  getMangaAggregate,
} from '@/shared/api/swagger/generated'
import { useQuery } from '@tanstack/react-query'

export const chapterApi = {
  baseKey: 'feed',
  useMangaChapters: (id: string) => {
    return useQuery({
      queryKey: [chapterApi.baseKey, id],
      queryFn: ({ signal }) => getChapter({ title: '' }, { signal }),
      refetchOnMount: false,
      enabled: Boolean(id),
      refetchOnWindowFocus: false,
      staleTime: 100000,
      retry: 0,
    })
  },
  useMangaChapterByID: (id: string) => {
    return useQuery({
      queryKey: [chapterApi.baseKey, id],
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
