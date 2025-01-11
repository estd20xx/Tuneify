import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { StoreSongTypes } from "../../Interfaces/tuneifySlice.interface"
import { RootState } from "../store"
export interface ChildPlaylistInterface {
  name: string
  songs: Array<StoreSongTypes>
}
interface UpdatePersonalizedPlaylist {
  song: StoreSongTypes
  index: number
}
interface InitialPlaylistInterface {
  playlist: Array<Array<ChildPlaylistInterface>>
}
const initialState: InitialPlaylistInterface = {
  playlist: new Array<Array<ChildPlaylistInterface>>()
}
const offlinePlaylist = createSlice({
  name: "@testOffline",
  initialState,
  reducers: {
    newPlaylist(
      state: InitialPlaylistInterface,
      actions: PayloadAction<Array<ChildPlaylistInterface>>
    ) {
      state.playlist.unshift(actions.payload)
    },
    addSongToPlaylist(
      state: InitialPlaylistInterface,
      actions: PayloadAction<UpdatePersonalizedPlaylist>
    ) {
      state.playlist[actions.payload.index][0].songs.push(actions.payload.song)
    }
  }
})

export const { newPlaylist, addSongToPlaylist } = offlinePlaylist.actions
export const customePlaylist = (state: RootState) => state.persistedReducer.customePlaylist
export default offlinePlaylist.reducer
