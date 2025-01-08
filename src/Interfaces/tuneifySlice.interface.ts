export interface StoreSongTypes {
  id: string
  title: string
  artist: string
  artwork: string
  url: string
}
export interface InitialCurrentTrackStateTypes {
  trackId: string
  index: number | null
}
export interface InitialChildStateTypes {
  isPlaying: boolean
  isSetupped: boolean
  repeat: boolean
}
export interface InitialFavouriteState {
  favouriteData: UserFavouritesTypes[]
}
export interface InitialLocalState {
  LocalSong: StoreSongTypes[]
  isUploading: boolean
  isAccepted: boolean
}
export interface InitialCurrentStateTypes {
  albumId: string
  playListId: string
}
// export interface InitialSongStateTypes {
//   songs: StoreSongTypes[]
// }
export interface InitialUserState {
  userName: string
  image: string
}
export interface UserFavouritesTypes {
  id: string
  title: string
  artist: string
  artwork: string
  url: string
  isLiked: boolean
}
// export interface LocalFileTypes {
//   album: string
//   artist: string
//   cover: string
//   duration: number
//   title: string
//   url: string
// }
export interface InitialStateTypes {
  storeSong: StoreSongTypes[]
  localFile: StoreSongTypes[]
  favouritesData: UserFavouritesTypes[]
  isUploaded: boolean
  isCurrentTrack: number
  userName: string
}
