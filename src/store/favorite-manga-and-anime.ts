// import Cookies from 'js-cookie'
// import { create } from 'zustand'

// import { createSelectors } from './create-selectors'

// export type FavoriteItem = {
//   favoriteManga: string[]
//   favoriteAnime: string[]
// }

// export type FavoriteAction = {
//   favoriteManga: string[]
//   favoriteAnime: string[]
//   toggleFavoriteManga: (manga: string) => void
//   toggleFavoriteAnime: (anime: string) => void
// }

// export const FavoriteAnimeMangaStore = create<FavoriteAction>(set => ({
//   favoriteAnime: JSON.parse(Cookies.get('favAnime') ?? '[]'),
//   favoriteManga: JSON.parse(Cookies.get('favManga') ?? '[]'),

//   toggleFavoriteAnime: anime => {
//     set(state => {
//       const updatedAnime = state.favoriteAnime.includes(anime)
//         ? state.favoriteAnime.filter(item => item !== anime)
//         : [...state.favoriteAnime, anime]

//       Cookies.set('favAnime', JSON.stringify(updatedAnime), {
//         expires: 7,
//         path: '/',
//       })

//       return { favoriteAnime: updatedAnime }
//     })
//   },

//   toggleFavoriteManga: manga => {
//     set(state => {
//       const updatedManga = state.favoriteManga.includes(manga)
//         ? state.favoriteManga.filter(item => item !== manga)
//         : [...state.favoriteManga, manga]

//       Cookies.set('favManga', JSON.stringify(updatedManga), {
//         expires: 7,
//         path: '/',
//       })

//       return { favoriteManga: updatedManga }
//     })
//   },
// }))

// export const useFavoriteAnimeMangaStore = createSelectors(
//   FavoriteAnimeMangaStore,
// )
