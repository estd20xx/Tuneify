import { useMemo } from "react"
import { AppTheme } from "../helpers/theme"
import { useMd3Colors } from "./useMd3"

export const useTheme = (): AppTheme => {
  const md3 = useMd3Colors()
  return useMemo(
    () => ({
      accent: md3.primary,
      accentSoft: md3.primaryContainer,
      accentStrong: md3.onPrimaryContainer,
      accentMuted: md3.secondaryContainer,
      background: md3.background,
      surface: md3.surface,
      surfaceRaised: md3.elevation.level2,
      border: md3.outlineVariant,
      textPrimary: md3.onSurface,
      textMuted: md3.onSurfaceVariant,
      inactive: md3.onSurfaceVariant
    }),
    [md3]
  )
}
