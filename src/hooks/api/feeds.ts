import { getMangaIdFeed } from '@/shared/api/swagger/generated'
import { useQuery } from '@tanstack/react-query'

export const feedApi = {
  baseKey: 'feed',
  useMangaFeed: (id: string) => {
    return useQuery({
      queryKey: [feedApi.baseKey, id],
      queryFn: ({ signal }) =>
        getMangaIdFeed(
          id,
          {
            'limit': 96,
            'offset': 0,
            'order': { chapter: 'desc', volume: 'desc' },
            'includes[]': ['scanlation_group', 'user'],
            'translatedLanguage[]': ['en'],
            'contentRating[]': ['safe', 'suggestive'],
          },
          { signal },
        ),
      refetchOnMount: false,
      enabled: Boolean(id),
      refetchOnWindowFocus: false,
      staleTime: 100000,
      retry: 0,
    })
  },
  // useMangaFeedLang: (id: string, languages: string) => {
  //   return useQuery({
  //     queryKey: [feedApi.baseKey, id, languages],
  //     queryFn: ({ signal }) =>
  //       getMangaIdFeed(
  //         id,
  //         {
  //           'limit': 96,
  //           'offset': 0,
  //           'order': { chapter: 'desc', volume: 'desc' },
  //           'includes[]': ['scanlation_group', 'user'],
  //           'translatedLanguage[]': [languages],
  //           'contentRating[]': ['safe', 'suggestive'],
  //         },
  //         { signal },
  //       ),
  //     refetchOnMount: false,
  //     enabled: Boolean(id),
  //     refetchOnWindowFocus: false,
  //     staleTime: 100000,
  //     retry: 0,
  //   })
  // },
}
