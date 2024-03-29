import {Track} from "react-native-track-player"

export default interface Isanitizer {
  sanitizeForQueue: () => Track[]
}
