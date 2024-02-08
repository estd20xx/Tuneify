/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { PaperProvider } from 'react-native-paper';
import MusifyPlayer from "react-native-track-player"
export default function Main() {
  return (
    <PaperProvider>
      <App />
    </PaperProvider>
  );
}
AppRegistry.registerComponent(appName, () => Main);
MusifyPlayer.registerPlaybackService(() => require("./src/musify/Musify.ts"))
