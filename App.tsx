import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import React, { useEffect } from "react"
import { StatusBar } from "react-native"
import { GestureHandlerRootView } from "react-native-gesture-handler"
import { MenuProvider } from "react-native-popup-menu"
import { SafeAreaProvider } from "react-native-safe-area-context"
import SplashScreen from "react-native-splash-screen"
import Toast from "react-native-toast-message"
import { Provider } from "react-redux"
import { PersistGate } from "redux-persist/integration/react"
import ErrorBoundary from "./src/components/Common/ErrorBoundary"
import ThemedChrome from "./src/components/Common/ThemedChrome"
import MainNavigation from "./src/mainNavigation/MainNavigation"
import store, { persistor } from "./src/store/store"

const queryClient = new QueryClient()
const App = () => {
  useEffect(() => {
    SplashScreen.hide()
  }, [])

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <Provider store={store}>
          <PersistGate persistor={persistor} loading={null}>
            <MenuProvider>
              <QueryClientProvider client={queryClient}>
                <ThemedChrome />
                <ErrorBoundary>
                  <MainNavigation />
                </ErrorBoundary>
                <Toast />
              </QueryClientProvider>
            </MenuProvider>
          </PersistGate>
        </Provider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  )
}
export default App
