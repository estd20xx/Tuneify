import { createSlice } from "@reduxjs/toolkit"
import { InitialChildStateTypes } from "../../Interfaces/tuneifySlice.interface"
import { RootState } from "../store"
const initialState: InitialChildStateTypes = {
  isPlaying: false,
  isSetupped: false,
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
    },
    changeApplicationSetup(state: InitialChildStateTypes) {
      state.isSetupped = true
    }
  }
})
export const { changeTunifyRepeatMode, changeApplicationSetup } =
  childStateSlice.actions
export const tunifyChild = (state: RootState) =>
  state.persistedReducer.childState
export default childStateSlice.reducer
