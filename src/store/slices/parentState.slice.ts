import { createSlice } from "@reduxjs/toolkit"
import { RootState } from "../store"
import { InitialCurrentStateTypes } from "../../Interfaces/tuneifySlice.interface"

const initialState: InitialCurrentStateTypes = {
  albumId: "",
  playListId: "",
}
const parentState = createSlice({
  name: "parentDev",
  initialState,
  reducers: {},
})
export const {} = parentState.actions
export const tunifyParent = (state: RootState) =>
  state.persistedReducer.parentState
export default parentState.reducer
