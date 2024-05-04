import {
  SortSongFields,
  SortSongOrder,
  getAll,
} from "react-native-get-music-files"
import { IlocalMedia } from "../Interfaces/localMedia.interface"
import { Dispatch, UnknownAction } from "@reduxjs/toolkit"
import { addLocalFiles } from "../store/slices/offline.slice"
export default class LocalMediaService implements IlocalMedia {
  getLocalmedia = async (
    dispatch: Dispatch<UnknownAction>
  ): Promise<boolean> => {
    try {
      const songsOrError = await getAll({
        limit: Infinity,
        offset: 0,
        coverQuality: 50,
        minSongDuration: 1000,
        sortBy: SortSongFields.TITLE,
        sortOrder: SortSongOrder.DESC,
      })
      const data: any[] = [...songsOrError]
      dispatch(addLocalFiles(data))
      return true
    } catch (error) {
      return false
    }
  }
}
