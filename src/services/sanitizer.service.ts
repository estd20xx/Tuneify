import { TrendingAlbumSons } from "../api/interface/album.interface"
import { PlayListSongList } from "../api/interface/module.interface"
import { Song } from "../api/service/Payload.service"
import Isanitizer from "../Interfaces/sanitizer.interface"
import { StoreSongTypes } from "../Interfaces/tuneifySlice.interface"
export default class SanitizeService implements Isanitizer {
  public albumDetails = (
    songsList: Array<TrendingAlbumSons>
  ): Array<StoreSongTypes> => {
    const data = songsList.map((cx) => {
      return {
        id: cx.id,
        title: cx.title,
        artist: cx.artists,
        artwork: cx.image[2].link,
        url: cx.songLink[4].link
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
        artwork: cx.image[2].link,
        url: cx.link[4].link
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
        artwork: cx.image[2].link,
        url: cx.more_info.songLink[4].link
      } as StoreSongTypes
    })
    return data
  }
}
export const sanitize = new SanitizeService()
