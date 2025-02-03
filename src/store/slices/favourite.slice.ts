import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { Track } from "react-native-track-player"
import {
  InitialFavouriteState,
  StoreSongTypes
} from "../../Interfaces/tuneifySlice.interface"
import { RootState } from "../store"
const initialState: InitialFavouriteState = {
  favouriteData: []
}
const favouriteSlice = createSlice({
  name: "favouriteDev",
  initialState,
  reducers: {
    addUserFavouritesData(
      state: InitialFavouriteState,
      actions: PayloadAction<Track>
    ) {
      const data = state.favouriteData.filter((c) => c.id == actions.payload.id)
      if (data.length != 0) {
        state.favouriteData.splice(
          state.favouriteData.indexOf(data[0]),
          state.favouriteData.indexOf(data[0]) + 1
        )
        return
      }
      const dtx: StoreSongTypes = {
        id: actions.payload.id,
        title: actions.payload.title!,
        artist: actions.payload.artist!,
        artwork: actions.payload.artwork!,
        url: actions.payload.url
      }
      state.favouriteData.unshift(dtx)
    }
  }
})
export const { addUserFavouritesData } = favouriteSlice.actions
export const tuneifyFavourites = (state: RootState) =>
  state.persistedReducer.favourite
export default favouriteSlice.reducer
