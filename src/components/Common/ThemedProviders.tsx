import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import React from "react"
import { StatusBar } from "react-native"
import { MenuProvider } from "react-native-popup-menu"
import { PaperProvider } from "react-native-paper"
import Toast from "react-native-toast-message"
import { usePaperTheme } from "../../hooks/useMd3"
import MainNavigation from "../../mainNavigation/MainNavigation"
import ErrorBoundary from "./ErrorBoundary"

const queryClient = new QueryClient()

const ThemedProviders = () => {
  const paperTheme = usePaperTheme()
  return (
    <PaperProvider theme={paperTheme}>
      <StatusBar
        backgroundColor={paperTheme.colors.background}
        barStyle="light-content"
      />
      <MenuProvider>
        <QueryClientProvider client={queryClient}>
          <ErrorBoundary>
            <MainNavigation />
          </ErrorBoundary>
          <Toast />
        </QueryClientProvider>
      </MenuProvider>
    </PaperProvider>
  )
}

export default ThemedProviders
