import { Anime } from '@/hooks/api/aniwatch/types'

export const findBestMatches = (
  searchName: string,
  animes: Anime[],
): Anime[] | null => {
  if (!searchName || !animes.length) return null

  const topAnimes = animes.slice(0, 5)

  const normalize = (str: string): string => {
    return str
      .toLowerCase()
      .trim()
      .replace(/[~:!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/g, ' ')
      .replace(/\s+/g, ' ')
  }

  const calculateMatchScore = (title: string): number => {
    const searchWords = normalize(searchName).split(' ')
    const titleWords = normalize(title).split(' ')

    let score = 0

    searchWords.forEach(searchWord => {
      if (titleWords.includes(searchWord)) {
        score += 1
      }
    })

    titleWords.forEach(titleWord => {
      searchWords.forEach(searchWord => {
        if (titleWord.includes(searchWord) || searchWord.includes(titleWord)) {
          score += 0.5
        }
      })
    })

    return score / Math.max(searchWords.length, titleWords.length)
  }

  const scoredAnimes = topAnimes
    .map(anime => ({
      anime,
      score: Math.max(
        calculateMatchScore(anime.name),
        calculateMatchScore(anime.jname),
      ),
    }))
    .sort((a, b) => b.score - a.score)
    .filter(item => item.score >= 0.5)
    .map(item => item.anime)

  return scoredAnimes.length > 0 ? scoredAnimes : null
}

function findBestOneMatches(name: string, animes: Anime[]): Anime | null {
  const normalize = (str: string): string => {
    return str
      .toLowerCase()
      .trim()
      .replace(/[~:!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/g, ' ')
      .replace(/\s+/g, ' ')
  }

  const normalizedSearchName = normalize(name)

  const calculateMatchScore = (title: string): number => {
    const normalizedTitle = normalize(title)

    const searchWords = normalizedSearchName.split(' ')
    const titleWords = normalizedTitle.split(' ')

    let score = 0

    searchWords.forEach(searchWord => {
      if (titleWords.includes(searchWord)) {
        score += 1
      }
    })

    titleWords.forEach(titleWord => {
      searchWords.forEach(searchWord => {
        if (titleWord.includes(searchWord) || searchWord.includes(titleWord)) {
          score += 0.5
        }
      })
    })

    return score / Math.max(searchWords.length, titleWords.length)
  }

  let bestMatch: Anime | null = null
  let highestScore = 0

  for (const anime of animes) {
    const nameScore = calculateMatchScore(anime.name)
    const jnameScore = calculateMatchScore(anime.jname)

    const maxScore = Math.max(nameScore, jnameScore)

    if (maxScore > highestScore) {
      highestScore = maxScore
      bestMatch = anime
    }
  }

  return highestScore >= 0.7 ? bestMatch : null
}
