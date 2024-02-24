import {PayloadAction, createSlice} from "@reduxjs/toolkit"
import {StoreSongTypes} from "../../Interfaces/tuneifySlice.interface"
import {SongsTypes} from "../../Types/Types"
import {RootState} from "../store"
export interface InitialSongStateTypes {
  songs: StoreSongTypes[]
}
const initialState: InitialSongStateTypes = {
  songs: [],
}
const songSlice = createSlice({
  name: "songDev",
  initialState,
  reducers: {
    addSongList(
      state: InitialSongStateTypes,
      actions: PayloadAction<SongsTypes[]>,
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
