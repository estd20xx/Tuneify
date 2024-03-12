import {
  ArtistsTypes,
  CustomPArt,
  ImageType,
  PrimaryArtistsTypes,
} from "../Types/Types"
import {TrendingSongTypes} from "./songs.interface"
export interface TrendingAlbumPropsTypes {
  data: TrendingAlbumTypes[]
  topic: string
}
interface TrendingAlbumData {
  key: string
  name: string
  params: {
    albumData: TrendingAlbumTypes
  }
}
export interface TrendingAlbumParamsTypes {
  route: TrendingAlbumData
}
export interface AlbumDataProps {
  data: AlbumTypes[]
  topic: string
}
export interface Tr {
  albums: TrendingAlbumTypes[]
  songs: TrendingSongTypes[]
}
export interface SeperateAlbumTypes {
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
export interface TrendingAlbumTypes {
  id: string
  name: string
  type: string
  year: string
  releaseDate: string
  playCount: string
  language: string
  explicitContent: string
  songCount: string
  url: string
  primaryArtists: string
  featuredArtists: []
  artists: ArtistsTypes[]
  image: ImageType[]
}
export interface SmallAlbumTypes {
  id: string
  name: string
}
export interface AlbumTypes
  extends PrimaryArtistsTypes,
    ArtistsTypes,
    ImageType {
  id: string
  name: string
  year: string
  type: string
  playCount: string
  language: string
  explicitContent: string
  url: string
  primaryArtists: PrimaryArtistsTypes[]
  featuredArtists: []
  artists: ArtistsTypes[]
  image: ImageType[]
  songs: []
}
export interface Ialbum {
  readonly getUrl: () => string
  getAlbums: (
    setCAlb: (albums: SeperateAlbumTypes[]) => void,
    setIsl: (isL: boolean) => void
  ) => Promise<void>
}
