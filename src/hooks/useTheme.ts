import { useMemo } from "react"
import { AppTheme, buildTheme } from "../helpers/theme"
import { useAccent } from "./useAccent"

export const useTheme = (): AppTheme => {
  const accent = useAccent()
  return useMemo(() => buildTheme(accent), [accent])
}
