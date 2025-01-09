// All factorized
export interface StoreSongTypes {
  id: string
  title: string
  artist: string
  artwork: string
  url: string
}
export interface InitialStateTypes {
  storeSong: StoreSongTypes[]
  localFile: StoreSongTypes[]
  favouritesData: UserFavouritesTypes[]
  isUploaded: boolean
  isCurrentTrack: number
  userName: string
}
export interface InitialFavouriteState {
  favouriteData: UserFavouritesTypes[]
}

export interface UserFavouritesTypes {
  id: string
  title: string
  artist: string
  artwork: string
  url: string
}
export interface InitialUserState {
  userName: string
  image: string
}
export interface InitialLocalState {
  LocalSong: StoreSongTypes[]
  isUploading: boolean
  isAccepted: boolean
}
export interface InitialChildStateTypes {
  isPlaying: boolean
  isSetupped: boolean
  repeat: boolean
}
