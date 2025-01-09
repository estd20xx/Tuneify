import { DownloadUrlType, ImageType } from "../Types/Types"
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
export interface SongInterface {
  getSongs: (setSng: (songs: SongsTypes[]) => void) => Promise<void>
}
