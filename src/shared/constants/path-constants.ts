export const PATH = {
  HOME: '/',
  FAVORITES: '/favorites',
  MANGA: {
    MAIN: '/manga',
    SEARCH: '/manga/search',
    TITLE: '/manga/title',
    CHAPTER: '/manga/chapter',
    getTitlePath: (id?: string | number | null) => `/manga/title/${id}`,
    getChapterPath: (id?: string | number | null) => `/manga/chapter/${id}`,
  },
  ANIME: {
    MAIN: '/anime',
    SEARCH: '/anime/search',
    TITLE: '/anime/title',
    getTitlePath: (id?: string | number | null) => `/anime/title/${id}`,
    getChapterPath: (id?: string | number | null) => `/anime/chapter/${id}`,
  },
}
