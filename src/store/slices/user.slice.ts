import {PayloadAction, createSlice} from "@reduxjs/toolkit"
import {RootState} from "../store"
interface InitialUserState {
  userName: string
}
const initialState: InitialUserState = {
  userName: "namelessnerd",
}
const userSlices = createSlice({
  name: "userDev",
  initialState,
  reducers: {
    addUser(state: InitialUserState, actions: PayloadAction<string>) {
      state.userName = actions.payload
    },
  },
})
export const {addUser} = userSlices.actions
export const tuneifyUser = (state: RootState) => state.persistedReducer.user
export default userSlices.reducer
