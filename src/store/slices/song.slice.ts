import {PayloadAction, createSlice} from "@reduxjs/toolkit"
import {
  InitialSongStateTypes,
  StoreSongTypes,
} from "../../Interfaces/tuneifySlice.interface"
import {RootState} from "../store"
import {SongsTypes} from "../../Interfaces/songs.interface"

const initialState: InitialSongStateTypes = {
  songs: [],
}
const songSlice = createSlice({
  name: "songDev",
  initialState,
  reducers: {
    addSongList(
      state: InitialSongStateTypes,
      actions: PayloadAction<SongsTypes[]>
    ) {
      const data = actions.payload.map(cx => {
        const t: StoreSongTypes = {
          id: cx.id,
          title: cx.name,
          artist: cx.primaryArtists,
          artwork: cx.image[2].link,
          url: cx.downloadUrl[4].link,
        }
        return t
      })
      state.songs = [...data]
    },
  },
})

export const {addSongList} = songSlice.actions
export const tuneifySongs = (state: RootState) =>
  state.persistedReducer.storeSong
export default songSlice.reducer
