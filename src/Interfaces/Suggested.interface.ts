import { SongsTypes } from "./songs.interface"
import {
  AlbumResponse,
  ChartsResponse,
  PlaylistResponse,
} from "../api/interface/module.interface"
export interface SuggestedDataInterfaceChild {
  albums: AlbumResponse[]
  playlists: PlaylistResponse[]
  charts: ChartsResponse[]
  trending: any // TODO  Needs to be optimize
}
export interface Http {
  data: SuggestedDataInterfaceChild
}
export default interface Isuggested {
  wait: (timeout: number) => Promise<void>
  randomGenerator: (initial: number, final: number) => number
  http: (url: string) => Promise<Http>
  getSuggestedData: (
    setAlbums: (albums: AlbumResponse[]) => void,
    setPlst: (playlist: PlaylistResponse[]) => void,
    setChst: (charts: ChartsResponse[]) => void,
    setLd: (ld: boolean) => void,
    setTrndSong: (trndSong: SongsTypes[]) => void,
    setTrndAlb: (trndAlbum: AlbumResponse[]) => void
  ) => void
}
