
import React, { useEffect } from 'react'
import MainNavigation from './src/mainNavigation/MainNavigation'
import { Platform, StatusBar } from 'react-native';
const App = () => {
  // StatusBar.setBarStyle("light-content");
  // useEffect(() => {
  //   // if (Platform.OS === "android") {
  //   //   StatusBar.setBackgroundColor("rgba(0,0,0,0)");
  //   //   StatusBar.setTranslucent(true);
  //   // }
  // }, [])
  return (
    <>
      <StatusBar backgroundColor={"#181a20"} />
      <MainNavigation />
    </>
  )
}

export default App 