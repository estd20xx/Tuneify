
import React from 'react'
import MainNavigation from './src/mainNavigation/MainNavigation'
import { StatusBar } from "react-native"
const App = () => {
  return (
    <>
      <StatusBar backgroundColor={"#181a20"} />
      <MainNavigation />
    </>
  )
}

export default App 