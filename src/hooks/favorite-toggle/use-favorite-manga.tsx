import { useCallback, useEffect, useMemo, useState } from 'react'
import Cookies from 'js-cookie'
import {
  compressToEncodedURIComponent,
  decompressFromEncodedURIComponent,
} from 'lz-string'
import { useParams } from 'react-router-dom'

const COOKIE_MANGA_KEY = 'favManga'

export function useFavoriteManga() {
  const { id } = useParams()
  const mangaId = id as string
  const [favorites, setFavorites] = useState<string[]>(getFavoriteManga)

  const isFavorite = useMemo(
    () => favorites.includes(mangaId),
    [favorites, mangaId],
  )

  const updateFavorites = useCallback(() => {
    setFavorites(getFavoriteManga())
  }, [])

  const handleToggleFavorite = useCallback(() => {
    toggleFavoriteManga(mangaId)
    updateFavorites()
  }, [mangaId, updateFavorites])

  useEffect(() => {
    const handleStorageChange = () => updateFavorites()
    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [updateFavorites])

  return { favorites, isFavorite, handleToggleFavorite }
}

function getFavoriteManga(): string[] {
  const compressed = Cookies.get(COOKIE_MANGA_KEY)
  if (!compressed) return []
  const decompressed = decompressFromEncodedURIComponent(compressed)
  return decompressed ? JSON.parse(decompressed) : []
}

function toggleFavoriteManga(mangaId: string): void {
  const currentFavorites = getFavoriteManga()
  const updatedFavorites = currentFavorites.includes(mangaId)
    ? currentFavorites.filter(item => item !== mangaId)
    : [...currentFavorites, mangaId]

  const compressed = compressToEncodedURIComponent(
    JSON.stringify(updatedFavorites),
  )
  Cookies.set(COOKIE_MANGA_KEY, compressed, {
    path: '/',
    sameSite: 'strict',
    secure: true,
  })
}
