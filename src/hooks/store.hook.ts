import { useSelector, TypedUseSelectorHook, useDispatch } from "react-redux"
import { RootState, AppDispatch } from "../store/store"
export const TypedSelectorHook: TypedUseSelectorHook<RootState> = useSelector
export const useAppDispatch = () => useDispatch<AppDispatch>()
