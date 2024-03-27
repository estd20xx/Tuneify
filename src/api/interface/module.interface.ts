export interface ImageApi {
  quality: string
  link: string
}
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
