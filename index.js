/**
 * @format
 */

import { AppRegistry, LogBox } from "react-native"
import TuneifyPlayer from "react-native-track-player"
import App from "./App"
import { name as appName } from "./app.json"

LogBox.ignoreLogs(["ViewPropTypes will be removed"])

AppRegistry.registerComponent(appName, () => App)
TuneifyPlayer.registerPlaybackService(() => require("./src/Tuneify/Tuneify.ts"))
