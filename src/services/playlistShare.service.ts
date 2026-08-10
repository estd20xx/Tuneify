import { deflate, inflate } from "react-native-gzip"
import {
  packPlaylist,
  QR_PAYLOAD_LIMIT,
  unpackPlaylist
} from "../helpers/playlistCodec"
import { ChildPlaylistInterface } from "../store/slices/offlinePlaylist.slice"

export interface EncodedShare {
  payload: string
  size: number
  fits: boolean
}

class PlaylistShareService {
  public encode = async (
    playlist: ChildPlaylistInterface
  ): Promise<EncodedShare> => {
    const packed = packPlaylist(playlist)
    try {
      const compressed = await deflate(packed)
      const payload = `G${compressed}`
      return {
        payload,
        size: payload.length,
        fits: payload.length <= QR_PAYLOAD_LIMIT
      }
    } catch (error) {
      const payload = `P${packed}`
      return {
        payload,
        size: payload.length,
        fits: payload.length <= QR_PAYLOAD_LIMIT
      }
    }
  }

  public decode = async (
    scanned: string
  ): Promise<ChildPlaylistInterface | null> => {
    if (!scanned || scanned.length < 2) return null
    const mode = scanned[0]
    const body = scanned.slice(1)
    if (mode === "P") return unpackPlaylist(body)
    if (mode !== "G") return null
    try {
      const packed = await inflate(body)
      return unpackPlaylist(packed)
    } catch (error) {
      return null
    }
  }
}

export const playlistShareService = new PlaylistShareService()
