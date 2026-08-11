import {
  argbFromHex,
  hexFromArgb,
  themeFromSourceColor
} from "@material/material-color-utilities"

export interface Md3Colors {
  primary: string
  onPrimary: string
  primaryContainer: string
  onPrimaryContainer: string
  secondary: string
  onSecondary: string
  secondaryContainer: string
  onSecondaryContainer: string
  tertiary: string
  onTertiary: string
  tertiaryContainer: string
  onTertiaryContainer: string
  error: string
  onError: string
  errorContainer: string
  onErrorContainer: string
  background: string
  onBackground: string
  surface: string
  onSurface: string
  surfaceVariant: string
  onSurfaceVariant: string
  outline: string
  outlineVariant: string
  inverseSurface: string
  inverseOnSurface: string
  inversePrimary: string
  shadow: string
  scrim: string
  backdrop: string
  surfaceDisabled: string
  onSurfaceDisabled: string
  elevation: {
    level0: string
    level1: string
    level2: string
    level3: string
    level4: string
    level5: string
  }
}

const FALLBACK_SOURCE = "#ff8216"

const toHex = (argb: number): string => hexFromArgb(argb)

const blend = (base: string, overlay: string, amount: number): string => {
  const parse = (hex: string): [number, number, number] => {
    const clean = hex.replace("#", "")
    return [
      parseInt(clean.slice(0, 2), 16),
      parseInt(clean.slice(2, 4), 16),
      parseInt(clean.slice(4, 6), 16)
    ]
  }
  const [r1, g1, b1] = parse(base)
  const [r2, g2, b2] = parse(overlay)
  const ratio = Math.max(0, Math.min(1, amount))
  const channel = (a: number, b: number) =>
    Math.round(a + (b - a) * ratio)
      .toString(16)
      .padStart(2, "0")
  return `#${channel(r1, r2)}${channel(g1, g2)}${channel(b1, b2)}`
}

export const buildMd3Colors = (
  source: string,
  dark: boolean = true
): Md3Colors => {
  let scheme
  try {
    const generated = themeFromSourceColor(argbFromHex(source || FALLBACK_SOURCE))
    scheme = dark ? generated.schemes.dark : generated.schemes.light
  } catch (error) {
    const generated = themeFromSourceColor(argbFromHex(FALLBACK_SOURCE))
    scheme = dark ? generated.schemes.dark : generated.schemes.light
  }

  const surface = toHex(scheme.surface)
  const primary = toHex(scheme.primary)

  return {
    primary,
    onPrimary: toHex(scheme.onPrimary),
    primaryContainer: toHex(scheme.primaryContainer),
    onPrimaryContainer: toHex(scheme.onPrimaryContainer),
    secondary: toHex(scheme.secondary),
    onSecondary: toHex(scheme.onSecondary),
    secondaryContainer: toHex(scheme.secondaryContainer),
    onSecondaryContainer: toHex(scheme.onSecondaryContainer),
    tertiary: toHex(scheme.tertiary),
    onTertiary: toHex(scheme.onTertiary),
    tertiaryContainer: toHex(scheme.tertiaryContainer),
    onTertiaryContainer: toHex(scheme.onTertiaryContainer),
    error: toHex(scheme.error),
    onError: toHex(scheme.onError),
    errorContainer: toHex(scheme.errorContainer),
    onErrorContainer: toHex(scheme.onErrorContainer),
    background: toHex(scheme.background),
    onBackground: toHex(scheme.onBackground),
    surface,
    onSurface: toHex(scheme.onSurface),
    surfaceVariant: toHex(scheme.surfaceVariant),
    onSurfaceVariant: toHex(scheme.onSurfaceVariant),
    outline: toHex(scheme.outline),
    outlineVariant: toHex(scheme.outlineVariant),
    inverseSurface: toHex(scheme.inverseSurface),
    inverseOnSurface: toHex(scheme.inverseOnSurface),
    inversePrimary: toHex(scheme.inversePrimary),
    shadow: toHex(scheme.shadow),
    scrim: toHex(scheme.scrim),
    backdrop: "rgba(0, 0, 0, 0.5)",
    surfaceDisabled: blend(surface, toHex(scheme.onSurface), 0.12),
    onSurfaceDisabled: blend(surface, toHex(scheme.onSurface), 0.38),
    elevation: {
      level0: "transparent",
      level1: blend(surface, primary, 0.05),
      level2: blend(surface, primary, 0.08),
      level3: blend(surface, primary, 0.11),
      level4: blend(surface, primary, 0.12),
      level5: blend(surface, primary, 0.14)
    }
  }
}
