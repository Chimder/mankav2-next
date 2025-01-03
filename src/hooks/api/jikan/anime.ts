import { useQuery } from '@tanstack/react-query'
import { jikanInstance } from '@/shared/api/jikan/axios.instance';
import { getAnimeCharacters, getMangaRelations, MangaFull } from '@/shared/api/jikan/generated';

export const jikanAnimeApi = {
  baseKey: 'jikanManga',
  useMangaByName: ({ name }: { name: string | null; offset?: number }) => {
    return useQuery<MangaFull>({
      queryKey: [jikanAnimeApi.baseKey, name],
      queryFn: async () => {
        const res = await jikanInstance<{ data: MangaFull[] }>({
          url: '/manga',
          method: 'GET',
          params: {
            q: name,
            limit: 5,
          },
        })

        const foundManga = res.data.find(manga =>
          manga.titles?.some(
            title =>
              title.title &&
              (name?.toLowerCase().trim() ===
                title.title.toLowerCase().trim() ||
                name
                  ?.toLowerCase()
                  .includes(title.title.toLowerCase().trim()) ||
                title.title
                  .toLowerCase()
                  .includes(name?.toLowerCase().trim()!)),
          ),
        )

        if (foundManga) return foundManga

        throw new Error(`Manga with name "${name}" not found`)
      },
      refetchOnMount: false,
      enabled: Boolean(name),
      refetchOnWindowFocus: false,
      staleTime: 100000,
      retry: 0,
    })
  },
  useAnimeCharactersById: ({ id }: { id?: number }) => {
    return useQuery({
      queryKey: [jikanAnimeApi.baseKey, 'chapters', id],
      queryFn: async ({ signal }) => {
        if (!id) {
          return null
        }
        return getAnimeCharacters(id, { signal })
      },
      refetchOnMount: false,
      enabled: Boolean(id),
      refetchOnWindowFocus: false,
      staleTime: 100000,
      retry: 0,
    })
  },
  useMangaRelation: ({ id }: { id?: number }) => {
    return useQuery({
      queryKey: [jikanAnimeApi.baseKey, 'relation', id],
      queryFn: async ({ signal }) => {
        if (!id) {
          return null
        }
        return getMangaRelations(id, { signal })
      },
      refetchOnMount: false,
      enabled: Boolean(id),
      refetchOnWindowFocus: false,
      staleTime: 100000,
      retry: 0,
    })
  },
}
