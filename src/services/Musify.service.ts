import { IMusify } from "../Interfaces/MusifySetUp.interface";
import { InitialStateTypes } from "../Interfaces/MusifySlice.interface";
import TrackPlayer, { AppKilledPlaybackBehavior, Capability, Track } from "react-native-track-player";
export class MusifyService implements IMusify {

    getTrackObject = async (): Promise<Track> => {
        try {
            let trackIndex = await TrackPlayer.getCurrentTrack();
            let trackObject = await TrackPlayer.getTrack(trackIndex!)
            return trackObject!
        } catch (error) {
            const data: Track = {
                url: '',
                title: '',
                artist: '',
                album: '',
                genre: '',
                date: '',
                artwork: 'http://example.com/cover.png',
                duration: 402

            }
            return data
        }
    }
    handleBottomCondition = async (setCurrentTrrack: (track: Track) => void): Promise<void> => {
        try {
            let trackIndex = await TrackPlayer.getCurrentTrack();
            let trackObject = await TrackPlayer.getTrack(trackIndex!)
            trackObject && setCurrentTrrack(trackObject)

        } catch (error) {
            console.log(error)
        }
    }
    setUpPlayer = async (data: InitialStateTypes, handleBottomCondition: () => void, setCurrentTrrack: (track: Track) => void) => {
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
            this.handleBottomCondition()
        } catch (error) {
            console.log(error)
        }
    }

}