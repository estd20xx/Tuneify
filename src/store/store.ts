import { configureStore } from "@reduxjs/toolkit";
import Musify from "./Musify";


const store = configureStore({
    reducer: {
        Musify
    }
})
export type RootState = ReturnType<typeof store.getState>
export default store