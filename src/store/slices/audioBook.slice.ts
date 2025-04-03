import {
  ActionReducerMapBuilder,
  createSlice,
  PayloadAction
} from "@reduxjs/toolkit"
import { AudioBookScreenInterface } from "../../screens/Home/AudioBook"
import { getAudioBooks } from "../actions/audioBook.action"
import { RootState } from "../store"

export interface InitialAudioBookInterface {
  data: Array<AudioBookScreenInterface>
  isLoading: boolean
  isError: boolean
}
const initialState: InitialAudioBookInterface = {
  data: [],
  isLoading: false,
  isError: false
}
const audioBookSlice = createSlice({
  name: "@audioBookDev",
  initialState,
  reducers: {},
  extraReducers: (
    builder: ActionReducerMapBuilder<InitialAudioBookInterface>
  ) => {
    builder
      .addCase(getAudioBooks.pending, (state: InitialAudioBookInterface) => {
        state.isLoading = true
        state.isError = false
      })
      .addCase(
        getAudioBooks.fulfilled,
        (
          state: InitialAudioBookInterface,
          actions: PayloadAction<Array<AudioBookScreenInterface>>
        ) => {
          Object.assign(state.data, actions.payload)
        }
      )
      .addCase(getAudioBooks.rejected, (state: InitialAudioBookInterface) => {
        state.isLoading = false
        state.isError = true
      })
  }
})

export const {} = audioBookSlice.actions
export const audioBooks = (state: RootState) => state.persistedReducer.audioBook
export default audioBookSlice.reducer
