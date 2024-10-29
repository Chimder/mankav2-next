import { getRating } from '@/shared/api/swagger/generated'
import { useQuery } from '@tanstack/react-query'

export const ratingApi = {
  baseKey: 'rating',
  useRating: (mangas: string[]) => {
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
