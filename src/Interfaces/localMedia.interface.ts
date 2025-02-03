import { Dispatch, UnknownAction } from "@reduxjs/toolkit"
import { StoreSongTypes } from "./tuneifySlice.interface"
export interface LocalMediaInterface {
  getLocalmedia: (dispatch: Dispatch<UnknownAction>) => Promise<boolean>
  downloadSong: (
    song: StoreSongTypes,
    setDownloadProgress: (progress: number) => void
  ) => Promise<void>
}
