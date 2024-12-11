import { getMangaTag } from '@/shared/api/mangadex/generated'
import { useQuery } from '@tanstack/react-query'

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
      staleTime: 100000,
      retry: 0,
    })
  },
}
