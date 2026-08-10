export interface AppTheme {
  accent: string
  accentSoft: string
  accentStrong: string
  accentMuted: string
  background: string
  surface: string
  surfaceRaised: string
  border: string
  textPrimary: string
  textMuted: string
  inactive: string
}

const clamp = (value: number): number => Math.max(0, Math.min(255, value))

export const hexToRgb = (hex: string): [number, number, number] => {
  const clean = (hex || "").replace("#", "").trim()
  const full =
    clean.length === 3
      ? clean
          .split("")
          .map((c) => c + c)
          .join("")
      : clean
  if (full.length !== 6 || /[^0-9a-fA-F]/.test(full)) return [255, 130, 22]
  return [
    parseInt(full.slice(0, 2), 16),
    parseInt(full.slice(2, 4), 16),
    parseInt(full.slice(4, 6), 16)
  ]
}

export const rgbToHex = (r: number, g: number, b: number): string =>
  "#" +
  [r, g, b]
    .map((v) => Math.round(clamp(v)).toString(16).padStart(2, "0"))
    .join("")

export const mix = (hex: string, target: string, amount: number): string => {
  const ratio = Math.max(0, Math.min(1, amount))
  const [r1, g1, b1] = hexToRgb(hex)
  const [r2, g2, b2] = hexToRgb(target)
  return rgbToHex(
    r1 + (r2 - r1) * ratio,
    g1 + (g2 - g1) * ratio,
    b1 + (b2 - b1) * ratio
  )
}

export const darken = (hex: string, amount: number): string =>
  mix(hex, "#000000", amount)

export const lighten = (hex: string, amount: number): string =>
  mix(hex, "#ffffff", amount)

export const withAlpha = (hex: string, alpha: number): string => {
  const [r, g, b] = hexToRgb(hex)
  const a = Math.max(0, Math.min(1, alpha))
  return `rgba(${r}, ${g}, ${b}, ${a})`
}

export const readableOn = (hex: string): string => {
  const [r, g, b] = hexToRgb(hex)
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255
  return luminance > 0.6 ? "#181a20" : "#ffffff"
}

export const buildTheme = (accent: string): AppTheme => {
  const base = accent || "#ff8216"
  return {
    accent: base,
    accentSoft: lighten(base, 0.3),
    accentStrong: darken(base, 0.25),
    accentMuted: withAlpha(base, 0.2),
    background: darken(base, 0.9),
    surface: darken(base, 0.86),
    surfaceRaised: darken(base, 0.78),
    border: withAlpha(base, 0.35),
    textPrimary: "#ffffff",
    textMuted: "#d0d0d1",
    inactive: "#a1a0a3"
  }
}
