import {
  ActionReducerMapBuilder,
  createSlice,
  PayloadAction
} from "@reduxjs/toolkit"
import { SearchedSongs } from "../../api/service/Payload.service"
import { personalizedSearchedSong } from "../actions/searchedSong.action"
import { searchSongPagination } from "../actions/searchPagination.action"
import { RootState } from "../store"
interface InitialSearchedSong {
  data: SearchedSongs | null
  isLoading: boolean
  isMoreLoading: boolean
  isError: boolean
}
const initialState: InitialSearchedSong = {
  data: null,
  isLoading: false,
  isMoreLoading: false,
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
      .addCase(
        searchSongPagination.getSearchedSongDetails.pending,
        (state: InitialSearchedSong) => {
          state.isMoreLoading = true
        }
      )
      .addCase(
        searchSongPagination.getSearchedSongDetails.fulfilled,
        (state: InitialSearchedSong, actions: PayloadAction<SearchedSongs>) => {
          if (state.data?.songs) {
            state.data.songs.push(...actions.payload.songs)
          }
          state.isMoreLoading = false
        }
      )
      .addCase(
        searchSongPagination.getSearchedSongDetails.rejected,
        (state: InitialSearchedSong, actions: PayloadAction<any>) => {
          state.isMoreLoading = false
        }
      )
  }
})
export const {} = searchedSongsSlice.actions
export const searchedSongData = (state: RootState) =>
  state.persistedReducer.searchedSong
export default searchedSongsSlice.reducer
