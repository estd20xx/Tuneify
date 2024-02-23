import TuneifyPlayer, { Event } from "react-native-track-player"
// export const registerTunifyPlayer = async () => {
//     try {
//         TuneifyPlayer.addEventListener(Event.RemotePlay, () => {
//             TuneifyPlayer.play()
//         })
//         TuneifyPlayer.addEventListener(Event.RemotePause, () => {
//             TuneifyPlayer.pause()
//         })
//         TuneifyPlayer.addEventListener(Event.RemoteNext, () => {
//             TuneifyPlayer.skipToNext()
//         })
//         TuneifyPlayer.addEventListener(Event.RemotePrevious, () => {
//             TuneifyPlayer.skipToPrevious()
//         })
//         console.log("done")
//     } catch (error) {
//         console.log("Player failed to setup")
//     }
// }

module.exports = async function () {
    try {
        TuneifyPlayer.addEventListener(Event.RemotePlay, () => {
            TuneifyPlayer.play()
        })
        TuneifyPlayer.addEventListener(Event.RemotePause, () => {
            TuneifyPlayer.pause()
        })
        TuneifyPlayer.addEventListener(Event.RemoteNext, () => {
            TuneifyPlayer.skipToNext()
        })
        TuneifyPlayer.addEventListener(Event.RemotePrevious, () => {
            TuneifyPlayer.skipToPrevious()
        })
        console.log("done")
    } catch (error) {
        console.log("Player failed to setup")
    }
}
