import { ImageApi } from "./module.interface"
export interface Audio {
  quality: string
  link: string
}
export interface AlbumDetailsRequest {
  id: string
  title: string
  subtitle: string
  header_desc: string
  type: string
  perma_url: string
  image: string
  language: string
  year: string
  play_count: string
  explicit_content: string
  list_count: string
  list_type: string
  list: {
    id: string
    title: string
    subtitle: string
    header_desc: string
    type: string
    perma_url: string
    image: string
    language: string
    year: string
    play_count: string
    explicit_content: string
    list_count: string
    list_type: string
    list: string
    more_info: {
      music: string
      album_id: string
      album: string
      label: string
      origin: string
      is_dolby_content: false
      encrypted_media_url: string
      encrypted_cache_url: string
      encrypted_drm_cache_url: string
      encrypted_drm_media_url: string
      album_url: string
      duration: string
      rights: {
        code: string
        cacheable: string
        delete_cached_object: string
        reason: string
      }
      cache_state: string
      has_lyrics: string
      lyrics_snippet: string
      starred: string
      copyright_text: string
      artistMap: {
        primary_artists: {
          id: string
          name: string
          role: string
          image: string
          type: string
          perma_url: string
        }[]
        featured_artists: []
        artists: {
          id: string
          name: string
          role: string
          image: string
          type: string
          perma_url: string
        }[]
      }
      release_date: string
      label_url: string
      vcode: string
      vlink: string
      triller_available: false
      request_jiotune_flag: false
      webp: "true"
    }
  }[]
}
export interface AlbumDetailsResponse {
  id: string
  title: string
  subtitle: string
  header_desc: string
  type: string
  artwork: ImageApi[]
  year: string
  list_count: string
  list_type: string
  songs: Array<TrendingAlbumSons>
}

//// New here dont refactor below this line ---

export type TrendingAlbumSons = {
  id: string
  title: string
  subtitle: string
  image: ImageApi[]
  year: string
  play_count: string
  songLink: Audio[]
  duration: string
  artists: string
  has_lyrics: string
}
