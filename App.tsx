import React, {useEffect} from "react"
import MainNavigation from "./src/mainNavigation/MainNavigation"
import {StatusBar} from "react-native"
import {GestureHandlerRootView} from "react-native-gesture-handler"
import {configureFonts} from "react-native-paper"
import {Provider} from "react-redux"
import store, {persistor} from "./src/store/store"
import CodePush from "react-native-code-push"
import SplashScreen from "react-native-splash-screen"
import {PersistGate} from "redux-persist/integration/react"
const fontConfig = {
  fontFamily: "Roboto",
}
const theme = {
  fonts: configureFonts({config: fontConfig}),
}
const App = () => {
  useEffect(() => {
    SplashScreen.hide()
  }, [])
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <StatusBar backgroundColor={"#181a20"} />
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <MainNavigation />
        </PersistGate>
      </Provider>
    </GestureHandlerRootView>
  )
}

export default App

// export default CodePush({
//   updateDialog: true,
// })(App);
