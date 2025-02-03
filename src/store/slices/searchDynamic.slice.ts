import {
  ActionReducerMapBuilder,
  createSlice,
  PayloadAction
} from "@reduxjs/toolkit"
import { DynamicResponse } from "../../api/interface/Dynamic.interface"
import { personalizedDynamic } from "../actions/SearchDynamic.action"
import { RootState } from "../store"
interface InitialDynamicSearch {
  data: DynamicResponse | null
  isLoading: boolean
  isError: boolean
}
const initialState: InitialDynamicSearch = {
  data: null,
  isLoading: false,
  isError: false
}
const searchDynamics = createSlice({
  name: "@searchDynamic",
  initialState,
  reducers: {},
  extraReducers: (builder: ActionReducerMapBuilder<InitialDynamicSearch>) => {
    builder
      .addCase(
        personalizedDynamic.searchDynamicHandler.pending,
        (state: InitialDynamicSearch) => {
          state.isLoading = true
          state.isError = false
        }
      )
      .addCase(
        personalizedDynamic.searchDynamicHandler.fulfilled,
        (
          state: InitialDynamicSearch,
          actions: PayloadAction<DynamicResponse>
        ) => {
          state.data = { ...actions.payload }
          state.isLoading = false
        }
      )
      .addCase(
        personalizedDynamic.searchDynamicHandler.rejected,
        (state: InitialDynamicSearch) => {
          state.isLoading = false
          state.isError = true
        }
      )
  }
})
export const {} = searchDynamics.actions
export const dynamicSearchData = (state: RootState) =>
  state.persistedReducer.dynamic
export default searchDynamics.reducer
