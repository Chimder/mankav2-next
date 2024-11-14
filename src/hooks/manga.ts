import {
  getMangaId,
  getSearchManga,
  GetSearchMangaIncludedTagsMode,
  GetSearchMangaParams,
  GetSearchMangaStatusItem,
} from '@/shared/api/swagger/generated'
import { OffsetFilter } from '@/shared/constants/filters'
import { useQuery } from '@tanstack/react-query'

export type mangaSearchOps = {
  tags?: string[]
  name?: string
  offset?: number
  status?: string
  sortBy?: any
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
      'limit': OffsetFilter,
      'offset': offset,
      'order': sortBy
        ? {
            [sortBy.type]: sortBy.order,
          }
        : undefined,
      // 'order': {
      //   ...(order?.createdAt && { createdAt: order?.createdAt }),
      //   ...(order?.relevance && { relevance: order?.relevance }),
      //   ...(order?.rating && { rating: order?.rating }),
      //   ...(order?.updatedAt && { updatedAt: order?.updatedAt }),
      //   ...(order?.title && { title: order?.title }),
      // },
    }
    return useQuery({
      // eslint-disable-next-line @tanstack/query/exhaustive-deps
      queryKey: [mangaApi.baseKey, 'filter', offset],
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
