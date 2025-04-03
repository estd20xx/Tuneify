import {
  ActionReducerMapBuilder,
  createSlice,
  PayloadAction
} from "@reduxjs/toolkit"
import { StoreSongTypes } from "../../Interfaces/tuneifySlice.interface"
import { audioBookDetails } from "../actions/audioBookDetails.action"
import { RootState } from "../store"
interface InitialAudioBookDetailsInterface {
  data: Array<StoreSongTypes> | null
  isLoading: boolean
  isError: boolean
}
const initialState: InitialAudioBookDetailsInterface = {
  data: null,
  isLoading: false,
  isError: false
}
const audioBookDetailsWithChapter = createSlice({
  name: "audioBookDetailsWithChaper",
  initialState,
  reducers: {},
  extraReducers: (
    builder: ActionReducerMapBuilder<InitialAudioBookDetailsInterface>
  ) => {
    builder
      .addCase(
        audioBookDetails.getAudioBookDetails.pending,
        (state: InitialAudioBookDetailsInterface) => {
          state.isLoading = true
          state.isError = false
        }
      )
      .addCase(
        audioBookDetails.getAudioBookDetails.fulfilled,
        (
          state: InitialAudioBookDetailsInterface,
          actions: PayloadAction<Array<StoreSongTypes>>
        ) => {
          state.data = actions.payload
          state.isLoading = false
        }
      )
      .addCase(
        audioBookDetails.getAudioBookDetails.rejected,
        (state: InitialAudioBookDetailsInterface) => {
          state.isLoading = false
          state.isError = true
        }
      )
  }
})
export const {} = audioBookDetailsWithChapter.actions
export const audioBookDetailsWithChapters = (state: RootState) =>
  state.persistedReducer.audioBookDetailsWithChapter
export default audioBookDetailsWithChapter.reducer
