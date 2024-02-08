import MusifyPlayer, { Event } from "react-native-track-player"
module.exports = async function () {
    try {
        MusifyPlayer.addEventListener(Event.RemotePlay, () => {
            MusifyPlayer.play()
        })
        MusifyPlayer.addEventListener(Event.RemotePause, () => {
            MusifyPlayer.pause()
        })
        MusifyPlayer.addEventListener(Event.RemoteNext, () => {
            MusifyPlayer.skipToNext()
        })
        MusifyPlayer.addEventListener(Event.RemotePrevious, () => {
            MusifyPlayer.skipToPrevious()
        })
       
    } catch (error) {
        console.log("Something went wrong")
    }
}



