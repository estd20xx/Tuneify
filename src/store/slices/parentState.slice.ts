import {createSlice} from "@reduxjs/toolkit"
import {RootState} from "../store"
export interface InitialCurrentStateTypes {
  albumId: string
  playListId: string
}
const initialState: InitialCurrentStateTypes = {
  albumId: "",
  playListId: "",
}
const parentState = createSlice({
  name: "parentDev",
  initialState,
  reducers: {
    test(state: InitialCurrentStateTypes) {},
  },
})
export const {test} = parentState.actions
export const tunifyParent = (state: RootState) =>
  state.persistedReducer.parentState
export default parentState.reducer
