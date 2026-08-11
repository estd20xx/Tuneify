import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "../store"

export interface DownloadedMeta {
  id: string
  title: string
  artist: string
  artwork: string
}

interface InitialDownloadsInterface {
  byPath: Record<string, DownloadedMeta>
}

const initialState: InitialDownloadsInterface = {
  byPath: {}
}

const downloadsSlice = createSlice({
  name: "@downloads",
  initialState,
  reducers: {
    rememberDownload(
      state: InitialDownloadsInterface,
      actions: PayloadAction<{ path: string; meta: DownloadedMeta }>
    ) {
      if (!actions.payload?.path) return
      state.byPath[actions.payload.path] = actions.payload.meta
    },
    forgetDownload(
      state: InitialDownloadsInterface,
      actions: PayloadAction<string>
    ) {
      delete state.byPath[actions.payload]
    }
  }
})

export const { rememberDownload, forgetDownload } = downloadsSlice.actions
export const downloadedMeta = (state: RootState) =>
  state.persistedReducer.downloads
export default downloadsSlice.reducer
