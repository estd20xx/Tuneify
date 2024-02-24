export interface StoreSongTypes {
  id: string
  title: string
  artist: string
  artwork: string
  url: string
}
export interface UserFavouritesTypes {
  id: string
  title: string
  artist: string
  artwork: string
  url: string
  isLiked: boolean
}
export interface LocalFileTypes {
  album: string
  artist: string
  cover: string
  duration: number
  title: string
  url: string
}
export interface InitialStateTypes {
  storeSong: StoreSongTypes[]
  localFile: LocalFileTypes[]
  favouritesData: UserFavouritesTypes[]
  isUploaded: boolean
  isCurrentTrack: number
  userName: string
}
