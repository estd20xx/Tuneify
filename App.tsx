import React, { useEffect } from "react"
import { StatusBar } from "react-native"
import { GestureHandlerRootView } from "react-native-gesture-handler"
import SplashScreen from "react-native-splash-screen"
import { Provider } from "react-redux"
import { PersistGate } from "redux-persist/integration/react"
import MainNavigation from "./src/mainNavigation/MainNavigation"
import store, { persistor } from "./src/store/store"
const App = () => {
  useEffect(() => {
    SplashScreen.hide()
  }, [])
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StatusBar backgroundColor={"#1b1002"} />
      <Provider store={store}>
        <PersistGate persistor={persistor} loading={null}>
          <MainNavigation />
        </PersistGate>
      </Provider>
    </GestureHandlerRootView>
  )
}
export default App