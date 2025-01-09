import { TrendingAlbumSons } from "../api/interface/album.interface"
import { Song } from "../api/service/Payload.service"
import { StoreSongTypes } from "./tuneifySlice.interface"

export default interface SanitizerInterface {
  albumDetails: (songs: Array<TrendingAlbumSons>) => Array<StoreSongTypes>
  songs: (songs: Array<Song>) => Array<StoreSongTypes>
}
