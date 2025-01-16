import { Dispatch, UnknownAction } from "@reduxjs/toolkit"
import { LocalMediaInterface } from "../Interfaces/localMedia.interface"
import { StoreSongTypes } from "../Interfaces/tuneifySlice.interface"
import { ApplicationCore } from "../native/MusicFiles"
import { addLocalFiles } from "../store/slices/offline.slice"
export interface OfflineSongTypes {
  id: string
  title: string
  artist: string
  album: string
  duration: string
  path: string
  artwork: string
}
class LocalMediaService implements LocalMediaInterface {
  public getLocalmedia = async (dispatch: Dispatch<UnknownAction>): Promise<boolean> => {
    try {
      const musicFiles = await ApplicationCore.getMusicFiles()
      let data: StoreSongTypes[] = new Array<StoreSongTypes>()
      data = musicFiles.map((cx) => {
        const { id, title, artist, artwork, path } = cx
        return {
          id,
          title,
          artist,
          artwork,
          url: path
        } as StoreSongTypes
      })
      // data.sort((a, b) => a.title.localeCompare(b.title))
      dispatch(addLocalFiles(data))
      return true
    } catch (error) {
      console.log(error)
      return false
    }
  }
}

export const musicService = new LocalMediaService()
