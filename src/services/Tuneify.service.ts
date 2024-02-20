import axios from "axios"
import { ITuneify } from "../Interfaces/tuneifySetUp.interface"
import { InitialStateTypes } from "../Interfaces/tuneifySlice.interface"
import TrackPlayer, { AppKilledPlaybackBehavior, Capability, Event, PlaybackState, State, Track } from "react-native-track-player"
import SuggestedServices from "./suggested.service"
export default class TuneifyService extends SuggestedServices implements ITuneify {
    constructor(private lyricApi: string) { super() }
    public getGradient = (): string[] => {
        const colors = ["#b8b7b8", "#a4a3a4", "#8f8e8f", "#7b7a7b", "#666666", "#525152", "#3d3d3d", "#292829", "#141414",
        ]
        return colors 
    }
    public getEvent = (): Event[] => {
        const events: Event[] = [
            Event.PlaybackState,
            Event.PlaybackError,
            Event.PlaybackState,
            Event.PlaybackError,
        ]
        return events
    }
    public getLyrics = async (setLyric: (lyric: string) => void): Promise<void> => {
        try {
            let currentTrack = await TrackPlayer.getActiveTrack()
            const data = await axios.get(`${this.lyricApi}${currentTrack?.id}`)
            if (data.data.data) {
                setLyric(data.data.data.lyrics)
            } else {
                setLyric("We are working on it.! 💻")
            }
        } catch (error) {
            setLyric("We are working on it.! 💻")
        }
    }
    public playPauseAction = (playbackState: PlaybackState | { state: undefined }): void => {
        playbackState.state == State.Playing ? TrackPlayer.pause() : TrackPlayer.play()
    }
    public handleBottomCondition = async (setCurrentTrrack: (track: Track) => void): Promise<void> => {
        try {
            let currentTrack = await TrackPlayer.getActiveTrack()
            currentTrack && setCurrentTrrack(currentTrack)
        } catch (error) {
            console.log(error)
        }
    }
    public setUpPlayer = async (data: InitialStateTypes, setCurrentTrack: (track: Track) => void) => {
        try {
            await TrackPlayer.setupPlayer({ maxCacheSize: 1024 * 10, autoHandleInterruptions: true })
            await TrackPlayer.updateOptions({
                android: {
                    appKilledPlaybackBehavior: AppKilledPlaybackBehavior.StopPlaybackAndRemoveNotification
                },
                capabilities: [
                    Capability.Play,
                    Capability.Pause,
                    Capability.SkipToPrevious,
                    Capability.Stop,
                    Capability.SeekTo
                ],
                compactCapabilities: [Capability.Play, Capability.Pause, Capability.SkipToNext, Capability.SkipToPrevious]
            })
            await TrackPlayer.add(data.storeSong)
            this.handleBottomCondition(setCurrentTrack)
        } catch (error) {
            console.log(error)
        }
    }
}