import { TrendingAlbumSons } from "../api/interface/album.interface"
import { PlayListSongList } from "../api/interface/module.interface"
import { Song } from "../api/service/Payload.service"
import Isanitizer from "../Interfaces/sanitizer.interface"
import { StoreSongTypes } from "../Interfaces/tuneifySlice.interface"
import store from "../store/store"

export const pickQuality = (
  links: Array<{ link: string }> | undefined,
  highQuality: boolean
): string => {
  if (!links || !links.length) return ""
  const wanted = highQuality ? 4 : 3
  return (links[wanted] ?? links[links.length - 1]).link
}

const preferHigh = (): boolean => {
  try {
    return store.getState().persistedReducer.settings.highQuality
  } catch (error) {
    return true
  }
}

export const pickImage = (
  images: Array<{ link: string }> | undefined
): string => {
  if (!images || !images.length) return ""
  return (images[2] ?? images[images.length - 1]).link
}

export default class SanitizeService implements Isanitizer {
  public albumDetails = (
    songsList: Array<TrendingAlbumSons>
  ): Array<StoreSongTypes> => {
    const data = songsList.map((cx) => {
      return {
        id: cx.id,
        title: cx.title,
        artist: cx.artists,
        artwork: pickImage(cx.image),
        url: pickQuality(cx.songLink, preferHigh())
      } as StoreSongTypes
    })
    return data
  }
  public songs = (songsList: Array<Song>): Array<StoreSongTypes> => {
    const data = songsList.map((cx) => {
      return {
        id: cx.id,
        title: cx.title,
        artist: cx.artist,
        artwork: pickImage(cx.image),
        url: pickQuality(cx.link, preferHigh())
      } as StoreSongTypes
    })
    return data
  }
  public playList = (
    songsList: Array<PlayListSongList>
  ): Array<StoreSongTypes> => {
    const data = songsList.map((cx) => {
      return {
        id: cx.id,
        title: cx.title,
        artist: cx.more_info.music,
        artwork: pickImage(cx.image),
        url: pickQuality(cx.more_info.songLink, preferHigh())
      } as StoreSongTypes
    })
    return data
  }
}
export const sanitize = new SanitizeService()
