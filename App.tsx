import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import React, { useEffect } from "react"
import { StatusBar } from "react-native"
import { GestureHandlerRootView } from "react-native-gesture-handler"
import { MenuProvider } from "react-native-popup-menu"
import SplashScreen from "react-native-splash-screen"
import { Provider } from "react-redux"
import { PersistGate } from "redux-persist/integration/react"
import MainNavigation from "./src/mainNavigation/MainNavigation"
import PermissionService from "./src/services/permission.service"
import store, { persistor } from "./src/store/store"
import { HomeScreenProps } from "./src/Types/Types"
const permission = new PermissionService()

const queryClient = new QueryClient()
const App: React.FC<HomeScreenProps> = ({ navigation }) => {
  useEffect(() => {
    SplashScreen.hide()
  }, [])

  // #1b1002
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StatusBar backgroundColor={"#1b1002"} />
      <Provider store={store}>
        <PersistGate persistor={persistor} loading={null}>
          <MenuProvider>
            <QueryClientProvider client={queryClient}>
              <MainNavigation />
            </QueryClientProvider>
          </MenuProvider>
        </PersistGate>
      </Provider>
    </GestureHandlerRootView>
  )
}
export default App
