import { Event, PlaybackState, Track } from "react-native-track-player";
import { InitialStateTypes } from "./tuneifySlice.interface";

export interface ITuneify {
    getLyrics: (setlyrics: (lyric: string) => void) => Promise<void>
    playPauseAction: (playbackState: PlaybackState | { state: undefined }) => void
    getEvent: () => Event[]
    setUpPlayer: (data: InitialStateTypes, setCurrentTrrack: (track: Track) => void) => void
    handleBottomCondition: (setCurrentTrack: (track: Track) => void) => Promise<void>
}