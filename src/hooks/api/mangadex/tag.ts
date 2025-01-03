import { useQuery } from '@tanstack/react-query'
import { getMangaTag } from '@/shared/api/mangadex/generated'

export const tagsApi = {
  baseKey: 'tags',
  useMangaTags: () => {
    return useQuery({
      queryKey: [tagsApi.baseKey],
      queryFn: ({ signal }) => getMangaTag({ signal }),
      select: tags =>
        tags?.data?.map(tag => ({
          id: tag.id || '',
          name: tag.attributes?.name?.en || '',
        })) || [],
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      staleTime: 1000000,
      retry: 0,
    })
  },
}
