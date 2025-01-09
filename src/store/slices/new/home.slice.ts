import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { HomeDataResponse } from "../../../api/interface/module.interface"
import { homeService } from "../../actions/home.action"
import { RootState } from "../../store"
interface InitialHomeDataInerface {
  data: HomeDataResponse | null
  isLoading: boolean
  isError: boolean
}
const initialState: InitialHomeDataInerface = {
  data: null,
  isLoading: false,
  isError: false
}
const homeSlice = createSlice({
  name: "@home",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(homeService.getHomeData.pending, (state: InitialHomeDataInerface) => {
        state.isLoading = true
        state.isError = false
      })
      .addCase(
        homeService.getHomeData.fulfilled,
        (state: InitialHomeDataInerface, action: PayloadAction<HomeDataResponse>) => {
          state.data = action.payload
          state.isLoading = false
        }
      )
      .addCase(
        homeService.getHomeData.rejected,
        (state: InitialHomeDataInerface, actions: PayloadAction<any>) => {
          state.isError = true
          state.isLoading = false
          state.data = null
        }
      )
  }
})
export const homeData = (state: RootState) => state.persistedReducer.home
export default homeSlice.reducer
