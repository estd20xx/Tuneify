import { ChartsTypes } from "../Types/Types"
import { Tr, TrendingAlbumTypes, AlbumTypes } from "./album.interface"
import { TrendingSongTypes } from "./songs.interface"
import { PlaylistTypes } from "./playlist.interface"
export interface SuggestedDataInterfaceChild {
  albums: AlbumTypes[]
  playlists: PlaylistTypes[]
  charts: ChartsTypes[]
  trending: Tr
}
export interface Http {
  data: SuggestedDataInterfaceChild
}

export default interface Isuggested {
  wait: (timeout: number) => Promise<void>
  randomGenerator: (initial: number, final: number) => number
  http: (url: string) => Promise<Http>
  getSuggestedData: (
    setAlbums: (albums: AlbumTypes[]) => void,
    setPlst: (playlist: PlaylistTypes[]) => void,
    setChst: (charts: ChartsTypes[]) => void,
    setLd: (ld: boolean) => void,
    setTrndSong: (trndSong: TrendingSongTypes[]) => void,
    setTrndAlb: (trndAlbum: TrendingAlbumTypes[]) => void
  ) => void
}
