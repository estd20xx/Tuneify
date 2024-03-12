import {Track} from "react-native-track-player"
import {SongsTypes} from "./songs.interface"
import {LocalFileTypes} from "./tuneifySlice.interface"
import {AlbumTypes} from "./album.interface"
export default interface Isanitizer {
  sanitizeForQueue: (
    Track: SongsTypes[] | LocalFileTypes[] | AlbumTypes[]
  ) => Track[]
}
