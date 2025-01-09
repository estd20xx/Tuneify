import { Dispatch, UnknownAction } from "@reduxjs/toolkit"
import { Image } from "react-native"
import { SortSongFields, SortSongOrder, getAll } from "react-native-get-music-files"
import uuid from "react-native-uuid"
import tempImage from "../assets/images/new.png"
import { LocalMediaInterface } from "../Interfaces/localMedia.interface"
import { StoreSongTypes } from "../Interfaces/tuneifySlice.interface"
import { addLocalFiles } from "../store/slices/offline.slice"
const localImage = Image.resolveAssetSource(tempImage).uri
export default class LocalMediaService implements LocalMediaInterface {
  getLocalmedia = async (dispatch: Dispatch<UnknownAction>): Promise<boolean> => {
    try {
      const songsOrError = await getAll({
        offset: 0,
        coverQuality: 50,
        sortBy: SortSongFields.TITLE,
        sortOrder: SortSongOrder.DESC
      })
      let data: StoreSongTypes[] = new Array<StoreSongTypes>()
      if (songsOrError instanceof Object) {
        data = songsOrError.map((cx) => {
          return {
            id: uuid.v4(),
            title: cx.title,
            artist: cx.artist,
            artwork: cx.cover ? cx.cover : localImage,
            url: cx.url
          } as StoreSongTypes
        })
      }
      dispatch(addLocalFiles(data))
      return true
    } catch (error) {
      return false
    }
  }
}
