import { createSlice } from "@reduxjs/toolkit"
import { RootState } from "../store"
import { InitialChildStateTypes } from "../../Interfaces/tuneifySlice.interface"
const initialState: InitialChildStateTypes = {
  isPlaying: false,
  isLoading: false,
  repeat: false
}
const childStateSlice = createSlice({
  name: "childDev",
  initialState,
  reducers: {
    changeTunifyState(state: InitialChildStateTypes) {
      state.isPlaying = !state.isPlaying
    },
    changeTunifyRepeatMode(state: InitialChildStateTypes) {
      state.repeat = !state.repeat
    }
  }
})
export const { changeTunifyState, changeTunifyRepeatMode } = childStateSlice.actions
export const tunifyChild = (state: RootState) => state.persistedReducer.childState
export default childStateSlice.reducer
