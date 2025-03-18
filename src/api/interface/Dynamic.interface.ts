import { Image } from "../utils/utils"

interface DynamicTopQuery {
  id: string
  title: string
  type: string
  image: Array<Image>
}
interface DynamicArtists {
  id: string
  title: string
  type: string
  image: Array<Image>
}

interface DynamicPlaylist {
  id: string
  title: string
  type: string
  image: Array<Image>
  perma_url: string
  more_info: {
    artist_name: Array<string>
    entity_type: string
  }
}
interface DynamicSong {
  id: string
  title: string
  type: string
  image: Array<Image>
  perma_url: string
  more_info: {
    album: string
    album_id: string
    primary_artists: string
    singers: string
  }
  descriptions: string
}
interface DynamicAlbum {
  id: string
  title: string
  type: string
  image: Array<Image>
  perma_url: string
  more_info: {
    music: string
    year: string
    language: string
  }
  song_pids: string
  descriptions: string
}

export interface DynamicResponse {
  top: Array<DynamicTopQuery>
  artists: Array<DynamicArtists>
  albums: Array<DynamicAlbum>
  playlists: Array<DynamicPlaylist>
  songs: Array<DynamicSong>
}
