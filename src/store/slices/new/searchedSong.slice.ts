import { ActionReducerMapBuilder, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { SearchedSongs } from "../../../api/service/Payload.service"
import { personalizedSearchedSong } from "../../actions/searchedSong.action"
import { RootState } from "../../store"
interface InitialSearchedSong {
  data: SearchedSongs | null
  isLoading: boolean
  isError: boolean
}
const initialState: InitialSearchedSong = {
  data: null,
  isLoading: false,
  isError: false
}
const searchedSongsSlice = createSlice({
  name: "searched",
  initialState,
  reducers: {},
  extraReducers: (builder: ActionReducerMapBuilder<InitialSearchedSong>) => {
    builder
      .addCase(
        personalizedSearchedSong.getSearchedSongDetails.pending,
        (state: InitialSearchedSong) => {
          state.isLoading = true
          state.isError = false
        }
      )
      .addCase(
        personalizedSearchedSong.getSearchedSongDetails.fulfilled,
        (state: InitialSearchedSong, actions: PayloadAction<SearchedSongs>) => {
          state.data = actions.payload
          state.isLoading = false
        }
      )
      .addCase(
        personalizedSearchedSong.getSearchedSongDetails.rejected,
        (state: InitialSearchedSong, actions: PayloadAction<any>) => {
          state.isLoading = false
          state.isError = true
          state.data = null
        }
      )
  }
})
export const {} = searchedSongsSlice.actions
export const searchedSongData = (state: RootState) => state.persistedReducer.searchedSong
export default searchedSongsSlice.reducer
