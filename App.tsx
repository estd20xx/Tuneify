
import React, { useEffect } from 'react'
import MainNavigation from './src/mainNavigation/MainNavigation'
import { Platform, StatusBar } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
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
      <MainNavigation />
    </GestureHandlerRootView>
  )
}

export default App 