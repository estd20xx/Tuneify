import TuneifyPlayer, { Event } from "react-native-track-player"
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
    TuneifyPlayer.addEventListener(Event.RemoteSeek, ({ position }) => {
      TuneifyPlayer.seekTo(position)
    })
    TuneifyPlayer.addEventListener(Event.RemoteStop, () => {
      TuneifyPlayer.stop()
    })
  } catch (error) {
    console.log("Player failed to setup")
  }
}
