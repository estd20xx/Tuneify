
import React, { useEffect } from 'react'
import MainNavigation from './src/mainNavigation/MainNavigation'
import { Platform, StatusBar } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { PaperProvider, configureFonts } from 'react-native-paper';

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
      <PaperProvider theme={theme}>
        <StatusBar backgroundColor={"#181a20"} />
        <MainNavigation />
      </PaperProvider>
    </GestureHandlerRootView>
  )
}

export default App 