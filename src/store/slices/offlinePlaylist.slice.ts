import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import {
  containsSong,
  dedupeSongs,
  findPlaylistIndex,
  mergeSongs,
  uniquePlaylistName
} from "../../helpers/playlist"
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
      const incoming = actions.payload?.[0]
      if (!incoming) return
      if (findPlaylistIndex(state.playlist, incoming.name) !== -1) return
      state.playlist.unshift([
        { name: incoming.name.trim(), songs: dedupeSongs(incoming.songs) }
      ])
    },

    deletePlaylist(
      state: InitialPlaylistInterface,
      actions: PayloadAction<number>
    ) {
      state.playlist.splice(actions.payload, 1)
    },

    addSongToPlaylist(
      state: InitialPlaylistInterface,
      actions: PayloadAction<UpdatePersonalizedPlaylist>
    ) {
      const target = state.playlist[actions.payload.index]?.[0]
      if (!target) return
      if (!actions.payload.song?.id) return
      if (containsSong(target.songs, actions.payload.song.id)) return
      target.songs.push(actions.payload.song)
    },

    importPlaylist(
      state: InitialPlaylistInterface,
      actions: PayloadAction<ChildPlaylistInterface>
    ) {
      const incoming = actions.payload
      if (!incoming) return
      const songs = dedupeSongs(incoming.songs)
      if (!songs.length) return
      const existingIndex = findPlaylistIndex(state.playlist, incoming.name)
      if (existingIndex !== -1) {
        const target = state.playlist[existingIndex][0]
        target.songs = mergeSongs(target.songs, songs)
        return
      }
      state.playlist.unshift([
        { name: uniquePlaylistName(state.playlist, incoming.name), songs }
      ])
    }
  }
})
export const {
  newPlaylist,
  addSongToPlaylist,
  deletePlaylist,
  importPlaylist
} = offlinePlaylist.actions
export const customePlaylist = (state: RootState) =>
  state.persistedReducer.customePlaylist
export default offlinePlaylist.reducer
