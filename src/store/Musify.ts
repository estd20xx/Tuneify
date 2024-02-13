import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { RootState } from './store';
import { SongsTypes } from '../Types/Types';
import { InitialStateTypes, LocalFileTypes, StoreSong } from '../Interfaces/MusifySlice.interface';

export interface LocalFile {
    album: string
    artist: string
    cover: string
    duration: string
    url: string
}

const initialState: InitialStateTypes = {
    storeSong: [],
    localFile: []
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
        },
        addLocalFiles(state: InitialStateTypes, actions: PayloadAction<LocalFileTypes[]>) {
            const data = (actions.payload).map((cx) => {
                const t: LocalFileTypes = {
                    title: cx.title,
                    album: cx.album,
                    artist: cx.artist,
                    cover: cx.cover,
                    duration: cx.duration,
                    url: cx.url,
                }
                return t
            })
            state.localFile = [...data]
        }
    }
})
export const { addSongList, addLocalFiles } = Musify.actions
export const musifyData = (state: RootState) => state.Musify
export default Musify.reducer