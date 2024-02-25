import {DownloadUrlType, ImageType, PrimaryArtistsTypes} from "../Types/Types"
import {SmallAlbumTypes} from "./album.interface"

export interface TrendingSongTypes {
  id: string
  name: string
  type: string
  album: SmallAlbumTypes
  url: string
  year: string
  releaseDate: string
  duration: string
  label: string
  primaryArtists: PrimaryArtistsTypes[]
  featuredArtists: []
  explicitContent: string
  language: string
  image: ImageType[]
}
export interface TrendingSongsPropsTypes {
  data: TrendingSongTypes[]
  topic: string
}
export interface SongsTypes {
  id: string
  name: string
  type: string
  album: {
    id: string
    name: string
    url: string
  }
  year: string
  releaseData: string
  duration: string
  label: string
  primaryArtists: string
  featuredArtists: string
  explicitContent: string
  playCount: string
  language: string
  hashLyrics: string
  url: string
  copyright: string
  image: ImageType[]
  downloadUrl: DownloadUrlType[]
}
export interface Isongs {
  readonly getUrl: () => string
  getSongs: (setSng: (songs: SongsTypes[]) => void) => Promise<void>
}
