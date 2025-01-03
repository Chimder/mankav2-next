import { useQuery } from '@tanstack/react-query'
import { getMangaIdFeed } from '@/shared/api/mangadex/generated';

export const feedApi = {
  baseKey: 'feed',
  useMangaFeed: ({ id, offset }: { id?: string; offset: number }) => {
    return useQuery({
      queryKey: [feedApi.baseKey, id, offset],
      queryFn: ({ signal }) =>
        getMangaIdFeed(
          id!,
          {
            limit: 96,
            offset: offset,
            order: { chapter: 'desc', volume: 'desc' },
            'includes[]': ['scanlation_group', 'user'],
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
