import { Track } from "react-native-track-player";
import { InitialStateTypes, StoreSong } from "./MusifySlice.interface";

export interface IMusify {
    setUpPlayer: (data: InitialStateTypes, handleBottomCondition: () => void,setCurrentTrrack: (track: Track) => void) => void
    handleBottomCondition: (setCurrentTrrack:(track: Track)=> void) => Promise<void>
}