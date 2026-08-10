import React, { memo } from "react"
import { StatusBar } from "react-native"
import { useTheme } from "../../hooks/useTheme"

const ThemedChrome = () => {
  const theme = useTheme()
  return (
    <StatusBar backgroundColor={theme.background} barStyle="light-content" />
  )
}

export default memo(ThemedChrome)
