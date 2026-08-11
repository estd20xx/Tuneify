import React, { useEffect } from "react"
import { GestureHandlerRootView } from "react-native-gesture-handler"
import { SafeAreaProvider } from "react-native-safe-area-context"
import SplashScreen from "react-native-splash-screen"
import { Provider } from "react-redux"
import { PersistGate } from "redux-persist/integration/react"
import ThemedProviders from "./src/components/Common/ThemedProviders"
import store, { persistor } from "./src/store/store"

const App = () => {
  useEffect(() => {
    SplashScreen.hide()
  }, [])

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <Provider store={store}>
          <PersistGate persistor={persistor} loading={null}>
            <ThemedProviders />
          </PersistGate>
        </Provider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  )
}
export default App
