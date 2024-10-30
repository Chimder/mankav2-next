import { getMangaTag } from '@/shared/api/swagger/generated'
import { useQuery } from '@tanstack/react-query'

export const tagsApi = {
  baseKey: 'tags',
  useMangaTags: () => {
    return useQuery({
      queryKey: [tagsApi.baseKey],
      queryFn: ({ signal }) => getMangaTag({ signal }),
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      staleTime: 100000,
      retry: 0,
    })
  },
}
