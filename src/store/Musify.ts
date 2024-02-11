import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { RootState } from './store';
import { SongsTypes } from '../Types/Types';
import { InitialStateTypes, StoreSong } from '../Interfaces/MusifySlice.interface';

const initialState: InitialStateTypes = {
    storeSong: []
}
const Musify = createSlice({
    name: "musifyDev",
    initialState,
    reducers: {
        addSongList(state: InitialStateTypes, actions: PayloadAction<SongsTypes[]>) {
            const data = (actions.payload).map((cx) => {
                const t: StoreSong = {
                    id: cx.id, title: cx.name, artist: cx.primaryArtists,
                    artwork: cx.image[2].link, url: cx.downloadUrl[4].link
                }
                return t
            })
            state.storeSong = [...data]
        }
    }
});
export const { addSongList } = Musify.actions
export const musifyData = (state: RootState) => state.Musify
export default Musify.reducer