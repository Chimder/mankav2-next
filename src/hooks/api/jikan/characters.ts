import { useQuery } from '@tanstack/react-query'
import { getCharacterFullById, getPersonFullById } from '@/shared/api/jikan/generated';

export const jikanCharacterPeopleApi = {
  baseKey: 'jikanManga',
  usePersoneById: ({
    id,
    type,
  }: { id?: number; type?: 'character' | 'voices' }) => {
    return useQuery({
      queryKey: [jikanCharacterPeopleApi.baseKey, type, 'characters', id],
      queryFn: async ({ signal }) => {
        if (!id) return undefined

        return type === 'character'
          ? await getCharacterFullById(id, { signal })
          : await getPersonFullById(id, { signal })
      },
      refetchOnMount: false,
      enabled: Boolean(id),
      refetchOnWindowFocus: false,
      staleTime: 100000,
      retry: 0,
    })
  },
  usePeopleById: ({ id }: { id: number }) => {
    return useQuery({
      queryKey: [jikanCharacterPeopleApi.baseKey, 'people', id],
      queryFn: ({ signal }) => getPersonFullById(id, { signal }),
      refetchOnMount: false,
      enabled: Boolean(id),
      refetchOnWindowFocus: false,
      staleTime: 100000,
      retry: 0,
    })
  },
}
