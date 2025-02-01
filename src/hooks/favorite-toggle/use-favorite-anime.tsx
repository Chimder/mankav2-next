import { useCallback, useEffect, useMemo, useState } from 'react'
import Cookies from 'js-cookie'
import {
  compressToEncodedURIComponent,
  decompressFromEncodedURIComponent,
} from 'lz-string'
import { useParams } from 'react-router-dom'

const COOKIE_ANIME_KEY = 'favAnime'

export function useFavoriteAnime() {
  const { id } = useParams()
const animeId = id as string
  const [favorites, setFavorites] = useState<string[]>(getFavoriteAnime)

  const isFavorite = useMemo(
    () => favorites.includes(animeId),
    [favorites, animeId],
  )

  const updateFavorites = useCallback(() => {
    setFavorites(getFavoriteAnime())
  }, [])

  const handleToggleFavorite = useCallback(() => {
    toggleFavoriteAnime(animeId)
    updateFavorites()
  }, [animeId, updateFavorites])

  useEffect(() => {
    const handleStorageChange = () => updateFavorites()
    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [updateFavorites])

  return { favorites, isFavorite, handleToggleFavorite }
}

function getFavoriteAnime(): string[] {
  const compressed = Cookies.get(COOKIE_ANIME_KEY)
  if (!compressed) return []
  const decompressed = decompressFromEncodedURIComponent(compressed)
  return decompressed ? JSON.parse(decompressed) : []
  // return JSON.parse(Cookies.get(COOKIE_ANIME_KEY) ?? '[]')
}

function toggleFavoriteAnime(mangaId: string): void {
  const currentFavorites = getFavoriteAnime()
  const updatedFavorites = currentFavorites.includes(mangaId)
    ? currentFavorites.filter(item => item !== mangaId)
    : [...currentFavorites, mangaId]

  const compressed = compressToEncodedURIComponent(
    JSON.stringify(updatedFavorites),
  )

  Cookies.set(COOKIE_ANIME_KEY, compressed, {
    path: '/',
    sameSite: 'strict',
    secure: true,
  })
}
