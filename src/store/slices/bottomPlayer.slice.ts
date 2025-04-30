import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "../store"
interface InitialBottomInterface {
  value: number
}
const initialState: InitialBottomInterface = {
  value: 54
}
const bottomSlice = createSlice({
  name: "@bottomSlice",
  initialState,
  reducers: {
    changePosition(
      state: InitialBottomInterface,
      actions: PayloadAction<number>
    ) {
      state.value = actions.payload
    }
  }
})
export const { changePosition } = bottomSlice.actions
export const bottomPlayer = (state: RootState) =>
  state.persistedReducer.bottomPlayer
export default bottomSlice.reducer
