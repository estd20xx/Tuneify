import { useMemo } from "react"
import { MD3DarkTheme } from "react-native-paper"
import { buildMd3Colors, Md3Colors } from "../theme/md3"
import { useAccent } from "./useAccent"

export const useMd3Colors = (): Md3Colors => {
  const accent = useAccent()
  return useMemo(() => buildMd3Colors(accent, true), [accent])
}

export const usePaperTheme = () => {
  const colors = useMd3Colors()
  return useMemo(
    () => ({
      ...MD3DarkTheme,
      roundness: 4,
      colors: { ...MD3DarkTheme.colors, ...colors }
    }),
    [colors]
  )
}
