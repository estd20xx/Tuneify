import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { Image } from "react-native"
import { InitialUserState } from "../../Interfaces/tuneifySlice.interface"
import { RootState } from "../store"
const initialState: InitialUserState = {
  userName: "namelessnerd",
  image: Image.resolveAssetSource(require("../../assets/images/developer.jpg"))
    .uri
}
const userSlices = createSlice({
  name: "userDevs",
  initialState,
  reducers: {
    changeUserName(state: InitialUserState, actions: PayloadAction<string>) {
      state.userName = actions.payload
    },
    changeProfile(state: InitialUserState, actions: PayloadAction<string>) {
      state.image = actions.payload
    }
  }
})
export const { changeUserName, changeProfile } = userSlices.actions
export const tuneifyUser = (state: RootState) => state.persistedReducer.user
export default userSlices.reducer
