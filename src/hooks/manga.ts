import {
  getMangaId,
  getSearchManga,
  GetSearchMangaStatusItem,
} from '@/shared/api/swagger/generated'
import {
  infiniteQueryOptions,
  keepPreviousData,
  useInfiniteQuery,
  useQuery,
} from '@tanstack/react-query'

type Order = 'asc' | 'desc'

type mangaSearchOps = {
  tags?: string[]
  name?: string
  offset?: number
  created?: Order
  rating?: Order
  updatedAt?: Order
  status: GetSearchMangaStatusItem
  // sortBy:
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
    year,
    title,
    latestUploaded,
  }: Partial<mangaSearchOps>) => {
    return useQuery({
      queryKey: [
        mangaApi.baseKey,
        name,
        tags,
        created,
        sortBy,
        rating,
        offset,
        updatedAt,
        year,
        status,
        title,
        latestUploaded,
      ],
      queryFn: ({ signal }) =>
        getSearchManga(
          {
            'includedTagsMode': 'AND',
            'includedTags[]': tags,
            'title': name,
            'includes[]': ['cover_art'],
            'status[]': [status!],
            'order': {
              createdAt: created,
              relevance:sortBy,
              rating: rating,
              updatedAt: updatedAt,
              year: year,
              title: title,
              latestUploadedChapter: latestUploaded,
            },
            // 'originalLanguage[]': [''],
            'contentRating[]': ['safe', 'suggestive'],
            'limit': 8,
            'offset': offset,
          },
          { signal },
        ),
      placeholderData: keepPreviousData,
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
