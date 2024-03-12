import {Track} from "react-native-track-player"
import {AlbumTypes} from "../Interfaces/album.interface"
import Isanitizer from "../Interfaces/sanitizer.interface"
import {SongsTypes} from "../Interfaces/songs.interface"
import {LocalFileTypes} from "../Interfaces/tuneifySlice.interface"
export default class SanitizeService implements Isanitizer {
  sanitizeForQueue = (
    Track: SongsTypes[] | LocalFileTypes[] | AlbumTypes[]
  ): Track[] => {
    return []
  }
}
