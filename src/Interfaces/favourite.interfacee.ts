import { Track } from "react-native-track-player";

export interface Ifavourites {
    addToFav: (currentSong: Track) => void
}