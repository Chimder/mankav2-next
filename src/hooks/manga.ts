import {
  getMangaId,
  getSearchManga,
  GetSearchMangaIncludedTagsMode,
  GetSearchMangaParams,
  GetSearchMangaStatusItem,
} from '@/shared/api/swagger/generated'
import { keepPreviousData, useQuery } from '@tanstack/react-query'

type Order = 'asc' | 'desc'

type mangaSearchOps = {
  tags?: string[]
  name?: string
  offset?: number
  created?: Order
  rating?: Order
  updatedAt?: Order
  status: string
  sortBy?: Order
  year?: Order
  title?: Order
  latestUploaded?: Order
}

export const mangaApi = {
  baseKey: 'manga',
  useMangaByID: (id: string) => {
    return useQuery({
      queryKey: [mangaApi.baseKey, id],
      queryFn: ({ signal }) =>
        getMangaId(
          id,
          { 'includes[]': ['manga', 'cover_art', 'author'] },
          { signal },
        ),
      refetchOnMount: false,
      enabled: Boolean(id),
      refetchOnWindowFocus: false,
      staleTime: 100000,
      retry: 0,
    })
  },

  useMangaSearch: ({
    tags,
    name,
    offset,
    created,
    rating,
    updatedAt,
    status,
    sortBy,
    title,
    year,
    latestUploaded,
  }: Partial<mangaSearchOps>) => {
    const queryParams: GetSearchMangaParams = {
      'includedTagsMode': 'AND' as GetSearchMangaIncludedTagsMode,
      'includedTags[]': tags,
      ...(name && { title: name }),
      'includes[]': ['cover_art'],
      ...(status && { 'status[]': [status as GetSearchMangaStatusItem] }),
      'contentRating[]': ['safe', 'suggestive'],
      'limit': 8,
      'offset': offset,
      'order': {
        ...(created && { createdAt: created }),
        ...(sortBy && { relevance: sortBy }),
        ...(rating && { rating: rating }),
        ...(updatedAt && { updatedAt: updatedAt }),
        ...(title && { title: title }),
      },
    }

    return useQuery({
      // eslint-disable-next-line @tanstack/query/exhaustive-deps
      queryKey: [mangaApi.baseKey, offset],
      queryFn: ({ signal }) => getSearchManga(queryParams, { signal }),
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
