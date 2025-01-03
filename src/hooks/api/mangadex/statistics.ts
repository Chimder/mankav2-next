import { useQuery } from '@tanstack/react-query'
import { getStatisticsMangaUuid } from '@/shared/api/mangadex/generated'

export const statisticsApi = {
  baseKey: 'statistics',
  useMangaStatistics: (id: string) => {
    return useQuery({
      queryKey: [statisticsApi.baseKey, id],
      queryFn: ({ signal }) => getStatisticsMangaUuid(id, { signal }),
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      staleTime: 100000,
      retry: 0,
    })
  },
}
