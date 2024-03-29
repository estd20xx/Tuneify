import {Track} from "react-native-track-player"
import Isanitizer from "../Interfaces/sanitizer.interface"
export default class SanitizeService implements Isanitizer {
  sanitizeForQueue = (): Track[] => {
    return []
  }
}
