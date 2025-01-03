export interface AnimeByNameType {
  success: boolean
  data: Data
}
export interface Data {
  animes: Anime[]
  mostPopularAnimes: MostPopularAnime[]
  searchQuery: string
  searchFilters: SearchFilters
  totalPages: number
  hasNextPage: boolean
  currentPage: number
}

export interface Anime {
  id: string
  name: string
  jname: string
  poster: string
  duration: string
  type: string
  rating: string
  episodes: Episodes
}

export interface Episodes {
  sub: number
  dub: number
}

export interface MostPopularAnime {
  id: string
  name: string
  jname: string
  poster: string
  episodes: Episodes2
  type: string
}

export interface Episodes2 {
  sub: number
  dub: number
}

export interface SearchFilters {}

// /////////////////////
export interface AnimeByIdType {
  success: boolean
  data: AnimeByIdData
}

export interface AnimeByIdData {
  anime: AnimeById
  seasons: Season[]
  mostPopularAnimes: any[]
  relatedAnimes: RelatedAnime[]
  recommendedAnimes: RecommendedAnime[]
}

export interface AnimeById {
  info: Info
  moreInfo: MoreInfo
}

export interface Info {
  id: string
  anilistId: number
  malId: number
  name: string
  poster: string
  description: string
  stats: Stats
  promotionalVideos: PromotionalVideo[]
  charactersVoiceActors: any[]
}

export interface Stats {
  rating: string
  quality: string
  episodes: Episodes
  type: string
  duration: string
}

export interface Episodes {
  sub: number
  dub: number
}

export interface PromotionalVideo {
  title: string
  source: string
  thumbnail: string
}

export interface MoreInfo {
  japanese: string
  synonyms: string
  aired: string
  premiered: string
  duration: string
  status: string
  malscore: string
  genres: string[]
  studios: string
  producers: string[]
}

export interface Season {
  id: string
  name: string
  title: string
  poster: string
  isCurrent: boolean
}

export interface RelatedAnime {
  id: string
  name: string
  jname: string
  poster: string
  episodes: Episodes2
  type: string
}

export interface Episodes2 {
  sub: number
  dub: number
}

export interface RecommendedAnime {
  id: string
  name: string
  jname: string
  poster: string
  duration: string
  type: string
  rating?: string
  episodes: Episodes3
}

export interface Episodes3 {
  sub: number
  dub?: number
}
///////////////video
export interface AnimeVideoType {
  success: boolean
  data: AnimeVideoData
}

export interface AnimeVideoData {
  totalEpisodes: number
  episodes: VideoEpisode[]
}

export interface VideoEpisode {
  title: string
  episodeId: string
  number: number
  isFiller: boolean
}
/////////////////Episode server
export interface AnimeServerType {
  success: boolean
  data: AnimeServerData
}

export interface AnimeServerData {
  sub: Sub[]
  dub: Dub[]
  raw: any[]
  episodeId: string
  episodeNo: number
}

export interface Sub {
  serverName: string
  serverId: number
}

export interface Dub {
  serverName: string
  serverId: number
}

// sources
export interface AnimeSources {
  success: boolean
  data: SourcesData
}

export interface SourcesData {
  tracks: Track[]
  intro: Intro
  outro: Outro
  sources: Source[]
  anilistID: number
  malID: number
}

export interface Track {
  file: string
  label?: string
  kind: string
  default?: boolean
}

export interface Intro {
  start: number
  end: number
}

export interface Outro {
  start: number
  end: number
}

export interface Source {
  url: string
  type: string
}
