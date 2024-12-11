import { jikanInstance } from '@/shared/api/jikan/axios.instance'
import { getCharacterManga, getMangaCharacters, MangaFull } from '@/shared/api/jikan/generated'
import { useQuery } from '@tanstack/react-query'

export const jikanMangaApi = {
  baseKey: 'jikanManga',
  useMangaByName: ({ name }: { name: string; offset?: number }) => {
    return useQuery<MangaFull>({
      queryKey: [jikanMangaApi.baseKey, name],
      queryFn: async ({ signal }) => {
        const res = await jikanInstance<{ data: MangaFull[] }>(
          {
            url: '/manga',
            method: 'GET',
            params: {
              q: name,
              limit: 5,
            },
          },
          { signal },
        )

        const foundManga = res.data.find(manga =>
          manga.titles?.some(
            title =>
              title.title &&
              (title.title.toLowerCase().trim() === name.toLowerCase().trim() ||
                title.title.toLowerCase().includes(name.toLowerCase().trim())),
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
  useMangaCharacters: ({ id }: { id?: number }) => {
    return useQuery({
      queryKey: [jikanMangaApi.baseKey, id],
      queryFn: async ({ signal }) => {
      if (!id) {
        return null;
      }
      return getMangaCharacters(id, { signal });
    },
      refetchOnMount: false,
      enabled: Boolean(id),
      refetchOnWindowFocus: false,
      staleTime: 100000,
      retry: 0,
    })
  },
}
