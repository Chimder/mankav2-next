import { getMangaId, getSearchManga } from '@/shared/api/swagger/generated'
import { useQuery } from '@tanstack/react-query'

type Order = 'asc' | 'desc'

type mangaSearchOps = {
  tags?: string[]
  name?: string
  offset?: number
  created?: Order
  rating?: Order
  updatedAt?: Order
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
    year,
    title,
    latestUploaded,
  }: Partial<mangaSearchOps>) => {
    return useQuery({
      queryKey: [
        mangaApi.baseKey,
        name,
        tags,
        offset,
        created,
        rating,
        updatedAt,
        year,
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
            'order': {
              createdAt: created,
              rating: rating,
              updatedAt: updatedAt,
              year: year,
              title: title,
              latestUploadedChapter: latestUploaded,
            },
            'contentRating[]': ['safe'],
            'limit': 32,
            'offset': offset,
          },
          { signal },
        ),
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      staleTime: 100000,
      retry: 0,
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
