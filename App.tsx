
import React, { useEffect } from 'react'
import MainNavigation from './src/mainNavigation/MainNavigation'
import { Platform, StatusBar } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { configureFonts } from 'react-native-paper';
import MusifyPlayer from 'react-native-track-player';
import { Provider } from 'react-redux';
import store from './src/store/store';
const fontConfig = {
  fontFamily: 'Roboto'
};

const theme = {
  fonts: configureFonts({ config: fontConfig }),
};

const App = () => {
  // StatusBar.setBarStyle("light-content");
  // useEffect(() => {
  //   // if (Platform.OS === "android") {
  //   //   StatusBar.setBackgroundColor("rgba(0,0,0,0)");
  //   //   StatusBar.setTranslucent(true);
  //   // }
  // }, [])


  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StatusBar backgroundColor={"#181a20"} />
      <Provider store={store}>
        <MainNavigation />
      </Provider>

    </GestureHandlerRootView>
  )
}

export default App 