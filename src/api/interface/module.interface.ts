import { Audio, Image } from "../utils/utils"
export interface ImageApi {
  quality: string
  link: string
}
interface CommonHeader {
  id: string
  title: string
  subtitle: string
  header_desc: string
  type: string
  perma_url: string
  language: string
  year: string
  play_count: string
  explicit_content: string
  list_count: string
  list_type: string
}

interface ResponseHeader extends CommonHeader {
  image: Image[]
}
interface RequestHeader extends CommonHeader {
  image: string // make array
}
interface CommonArtist {
  id: string
  name: string
  role: string
  type: string
  perma_url: string
}
interface RequestPlaylistArtist extends CommonArtist {
  image: string
}
interface ResponsePlaylistArtist extends CommonArtist {
  image: Image[]
}

export interface PlayListRequest extends RequestHeader {
  list: PlayListReSongList[]
}
export interface PlaylistResponseOnce extends ResponseHeader {
  list: PlayListSongList[]
}
interface PlayListReSongList extends RequestHeader {
  more_info: {
    music: string
    album_id: string
    album: string
    label: string
    origin: string
    encrypted_media_url: string
    encrypted_cache_url: string
    encrypted_drm_cache_url: string
    encrypted_drm_media_url: string
    duration: string
    artists: RequestPlaylistArtist[]
  }
}
export interface PlayListSongList extends ResponseHeader {
  more_info: {
    music: string
    album_id: string
    album: string
    label: string
    origin: string
    songLink: Audio[]
    duration: string
    artists: ResponsePlaylistArtist[]
  }
}

///////////////////
export interface TrendingAlbumRequest {
  //AlbumRequest
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
    release_date: string
    song_count: string
    artistMap: {
      primary_artists: []
      featured_artists: []
      artists: [
        {
          id: string
          name: string
          role: string
          image: string
          type: string
          perma_url: string
        }
      ]
    }
  }
  modules?: null
}

export interface Artists {
  id: string
  name: string
  role: string
  image: string
  type: string
  perma_url: string
}
export interface AlbumResponse {
  id: string
  title: string
  subtitle: string
  header_desc: string
  type: string
  perma_url: string
  artwork: ImageApi[]
  language: string
  year: string
  release_date: string
  song_count: string
  artists: Artists[]
}
export interface ChartsResponse {
  id: string
  title: string
  subtitle: string
  type: string
  artwork: ImageApi[] // TODO --> need to make array
  perma_url: string
}
export interface ChartsRequest {
  id: string
  title: string
  subtitle: string
  type: string
  image: string // TODO --> need to make array
  perma_url: string
  more_info: {
    firstname: string
  }
  explicit_content?: string
  mini_obj?: boolean
  language?: string
}
export interface PlaylistResponse {
  id: string
  title: string
  subtitle: string
  type: string
  artwork: ImageApi[]
  perma_url: string
  more_info: {
    song_count: string
    firstname: string
    follower_count: string
    last_updated: string
    uid: string
  }
}

export interface TopPlayListsRequest {
  id: string
  title: string
  subtitle: string
  type: string
  image: string
  perma_url: string
  more_info: {
    song_count: string
    firstname: string
    follower_count: string
    last_updated: string
    uid: string
  }
  explicit_content: string
  mini_obj: boolean
}
export interface HomeDataRequest {
  tuneifyTrendingAlbums: TrendingAlbumRequest[]
  tuneifyTopPlaylists: TopPlayListsRequest[]
  tuneifyCharts: ChartsRequest[] //Top floavour ==> Topic
  tuneifyAlbums: TrendingAlbumRequest[]
}
export interface HomeDataResponse {
  tuneifyTrendingAlbumsResponse: AlbumResponse[]
  tuneifyTopPlaylistsResponse: PlaylistResponse[]
  tuneifyChartsResponse: ChartsResponse[] //Top floavour ==> Topic
  tuneifyAlbumsResponse: AlbumResponse[]
}
