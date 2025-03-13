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
      const isPresent = state.playlist.filter(
        (c) => c[0].name == actions.payload[0].name
      )
      if (isPresent.length > 0) {
        return
      }
      state.playlist.unshift(actions.payload)
    },

    deletePlaylist(
      state: InitialPlaylistInterface,
      actions: PayloadAction<number>
    ) {
      state.playlist.splice(actions.payload, actions.payload + 1)
    },

    addSongToPlaylist(
      state: InitialPlaylistInterface,
      actions: PayloadAction<UpdatePersonalizedPlaylist>
    ) {
      const isPresent = state.playlist[actions.payload.index][0].songs.filter(
        (c) => c.id == actions.payload.song.id
      )
      if (isPresent.length > 0) {
        return
      }
      state.playlist[actions.payload.index][0].songs.push(actions.payload.song)
    }
  }
})
export const { newPlaylist, addSongToPlaylist, deletePlaylist } =
  offlinePlaylist.actions
export const customePlaylist = (state: RootState) =>
  state.persistedReducer.customePlaylist
export default offlinePlaylist.reducer
