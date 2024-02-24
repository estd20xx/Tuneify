/**
 * @format
 */

import {AppRegistry} from "react-native"
import App from "./App"
import {name as appName} from "./app.json"
import {PaperProvider} from "react-native-paper"
import TuneifyPlayer from "react-native-track-player"
export default function Main() {
  return (
    <PaperProvider>
      <App />
    </PaperProvider>
  )
}
AppRegistry.registerComponent(appName, () => Main)
TuneifyPlayer.registerPlaybackService(() => require("./src/Tuneify/Tuneify.ts"))
