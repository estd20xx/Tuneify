/**
 * @format
 */

import { AppRegistry } from "react-native"
import { PaperProvider } from "react-native-paper"
import TuneifyPlayer from "react-native-track-player"
import App from "./App"
import { name as appName } from "./app.json"
export default function Main() {
  return (
    <PaperProvider>
      <App />
    </PaperProvider>
  )
}
AppRegistry.registerComponent(appName, () => Main)
TuneifyPlayer.registerPlaybackService(() => require("./src/Tuneify/Tuneify.ts"))
