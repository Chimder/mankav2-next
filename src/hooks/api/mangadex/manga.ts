import {
  getMangaId,
  getMangaRelation,
  getSearchManga,
  GetSearchMangaIncludedTagsMode,
  GetSearchMangaParams,
  GetSearchMangaStatusItem,
} from '@/shared/api/mangadex/generated'
import { OffsetFilter } from '@/shared/constants/filters'
import { keepPreviousData, queryOptions, useQuery, useSuspenseQuery } from '@tanstack/react-query'

export type mangaSearchOps = {
  tags?: string[]
  name?: string
  offset?: number
  status?: string
  sortBy?: any
}

export const mangaApi = {
  baseKey: 'manga',
  useMangaByID: (id?: string) => {
    return useQuery({
      queryKey: [mangaApi.baseKey, id],
      queryFn: ({ signal }) => {
        if (!id) return undefined
        return getMangaId(
          id!,
          { 'includes[]': ['manga', 'cover_art', 'author'] },
          { signal },
        )
      },
      refetchOnMount: false,
      enabled: Boolean(id),
      refetchOnWindowFocus: false,
      staleTime: 100000,
      retry: 0,
    })
  },
  useMangaSeachInput: (title: string) => {
    return useQuery({
      queryKey: [mangaApi.baseKey, title],
      queryFn: ({ signal }) =>
        getSearchManga(
          {
            'includedTagsMode': 'AND',
            'includes[]': ['manga', 'cover_art'],
            'title': title,
            'limit': 5,
            'order': {
              relevance: 'desc',
            },
          },
          { signal },
        ),
      refetchOnMount: false,
      enabled: Boolean(title),
      refetchOnWindowFocus: false,
      // placeholderData: keepPreviousData,
      retry: 0,
    })
  },

  useMangaSearch: ({
    tags,
    name,
    offset,
    status,
    sortBy,
  }: Partial<mangaSearchOps>) => {
    const queryParams: GetSearchMangaParams = {
      'includedTagsMode': 'AND' as GetSearchMangaIncludedTagsMode,
      'includedTags[]': tags,
      ...(name && { title: name }),
      'includes[]': ['cover_art'],
      ...(status && { 'status[]': [status as GetSearchMangaStatusItem] }),
      'contentRating[]': ['safe', 'suggestive'],
      'ids[]': [],
      'limit': OffsetFilter,
      'offset': offset,
      'order': sortBy
        ? {
            [sortBy.type]: sortBy.order,
          }
        : undefined,
    }
    return useQuery({
      // eslint-disable-next-line @tanstack/query/exhaustive-deps
      queryKey: [mangaApi.baseKey, 'filter', offset],
      queryFn: ({ signal }) => getSearchManga(queryParams, { signal }),
      staleTime: 100000,
      retry: 0,
      placeholderData: keepPreviousData,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    })
  },

  useMangaRelations: ({ id }: { id: string }) => {
    return useQuery({
      queryKey: [mangaApi.baseKey, 'relation', id],
      queryFn: ({ signal }) =>
        getMangaRelation(id, { 'includes[]': ['manga'] }, { signal }),
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      enabled: Boolean(id),
      staleTime: 160000,
      retry: 0,
    })
  },
  useMangaSearchMany: ({ ids }: { ids?: string[] }) => {
    return useQuery({
      queryKey: [mangaApi.baseKey, 'filter', ids],
      queryFn: ({ signal }) =>
        getSearchManga(
          {
            'includes[]': ['cover_art'],
            'contentRating[]': ['safe', 'suggestive', 'erotica'],
            'ids[]': ids,
          },
          { signal },
        ),
      staleTime: 100000,
      retry: 0,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    })
  },
  useMangaSearchFav: ({ ids }: { ids?: string[] }) => {
    return useQuery({
      queryKey: [mangaApi.baseKey, 'filterFavorites', ids?.length, ids],
      queryFn: ({ signal }) => {
        if (!ids?.length) return undefined
        return getSearchManga(
          {
            'includes[]': ['cover_art'],
            'contentRating[]': ['safe', 'suggestive', 'erotica'],
            'ids[]': ids,
          },
          { signal },
        )
      },
      staleTime: 100000,
      retry: 0,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    })
  },
  useMangaSearchPopular: () => {
    return useQuery({
      queryKey: [mangaApi.baseKey, 'Popular'],
      queryFn: ({ signal }) =>
        getSearchManga(
          {
            'includes[]': ['cover_art'],
            'contentRating[]': ['safe', 'suggestive', 'erotica'],
            'order': { followedCount: 'desc' },
            'limit': 18,
            // 'ids[]': ids,
          },
          { signal },
        ),
      staleTime: 100000,
      retry: 0,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    })
  },
  useMangaSearchLatest: () => {
    return useQuery({
      queryKey: [mangaApi.baseKey, 'Latest'],
      queryFn: ({ signal }) =>
        getSearchManga(
          {
            'includes[]': ['cover_art'],
            'contentRating[]': ['safe', 'suggestive', 'erotica'],
            'order': { latestUploadedChapter: 'desc' },
            // 'ids[]': ids,
          },
          { signal },
        ),
      staleTime: 100000,
      retry: 0,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    })
  },
  useMangaSearchRating: () => {
    return useQuery({
      queryKey: [mangaApi.baseKey, 'Rating'],
      queryFn: ({ signal }) =>
        getSearchManga(
          {
            'includes[]': ['cover_art'],
            'contentRating[]': ['safe', 'suggestive', 'erotica'],
            'order': { rating: 'desc' },
            'limit': 18,
            // 'ids[]': ids,
          },
          { signal },
        ),
      staleTime: 100000,
      retry: 0,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    })
  },

  // getTodoListInfinityQueryOptions: () => {
  //   return infiniteQueryOptions({
  //     queryKey: [todoListApi.baseKey, 'list'],
  //     queryFn: meta =>
  //       jsonApiInstance<PaginatedResult<TodoDto>>(
  //         `/tasks?_page=${meta.pageParam}&_per_page=10`,
  //         {
  //           signal: meta.signal,
  //         },
  //       ),
  //     initialPageParam: 1,
  //     getNextPageParam: result => result.next,
  //     select: result => result.pages.flatMap(page => page.data),
  //   })
  // },
}
