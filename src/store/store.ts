import { configureStore } from '@reduxjs/toolkit';
import Musify from "./Musify"
import { persistReducer, persistStore } from 'redux-persist'
import AsyncStorage from "@react-native-async-storage/async-storage"
const persistConfig = {
    key: 'testMusify',
    storage: AsyncStorage
}
const persistedReducer = persistReducer(persistConfig, Musify)
const store = configureStore({
    reducer: { persistedReducer },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    })
})
export const persistor = persistStore(store)
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store