import { AlbumResponse } from "../api/interface/module.interface"
import { CustomPArt, ImageType } from "../Types/Types"
export interface TrendingAlbumPropsTypes {
  data: AlbumResponse[]
  topic: string
}
interface TrendingAlbumData {
  key: string
  name: string
  params: {
    albumData: AlbumResponse
  }
}
export interface TrendingAlbumParamsTypes {
  route: TrendingAlbumData
}
export interface AlbumDataProps {
  data: AlbumResponse[]
  topic: string
}

export interface SeperateAlbumTypes {
  // do not remove
  id: string
  name: string
  year: string
  type: string
  playCount: string
  language: string
  explicitContent: string
  songCount: string
  url: string
  primaryArtists: CustomPArt[]
  featuredArtists: []
  artist: CustomPArt[]
  image: ImageType[]
}
export interface SeperateAlbumDataPropsTypes {
  data: SeperateAlbumTypes
}
export interface SmallAlbumTypes {
  id: string
  name: string
}
export interface Ialbum {
  readonly getUrl: () => string
  getAlbums: (
    setCAlb: (albums: SeperateAlbumTypes[]) => void,
    setIsl: (isL: boolean) => void
  ) => Promise<void>
}
