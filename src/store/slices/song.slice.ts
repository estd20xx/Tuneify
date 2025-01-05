import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { Song } from "../../api/service/Payload.service"
import { InitialSongStateTypes, StoreSongTypes } from "../../Interfaces/tuneifySlice.interface"
import { RootState } from "../store"
const initialState: InitialSongStateTypes = {
  songs: []
}
const songSlice = createSlice({
  name: "songDev",
  initialState,
  reducers: {
    addSongList(state: InitialSongStateTypes, actions: PayloadAction<Song[]>) {
      const data = actions.payload.map((cx) => {
        const songs: StoreSongTypes = {
          id: cx.id,
          title: cx.title,
          artist: cx.artist,
          artwork: cx.image[2].link,
          url: cx.link[4].link
        }
        return songs
      })
      state.songs = [...data]
    },
    addplayListSong(state: InitialSongStateTypes) {},
    addAlbumSongs(state: InitialSongStateTypes) {}
  }
})

export const { addSongList } = songSlice.actions
export const tuneifySongs = (state: RootState) => state.persistedReducer.storeSong
export default songSlice.reducer
