import { getRating } from '@/shared/api/mangadex/generated'
import { useQuery } from '@tanstack/react-query'

export const ratingApi = {
  baseKey: 'rating',
  useMangaRating: (mangas: string[]) => {
    return useQuery({
      queryKey: [ratingApi.baseKey, mangas],
      queryFn: ({ signal }) => getRating({ manga: mangas }, { signal }),
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      staleTime: 100000,
      retry: 0,
    })
  },
}
