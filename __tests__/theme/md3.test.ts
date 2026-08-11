import { buildMd3Colors } from "../../src/theme/md3"

const isHex = (value: string) => /^#[0-9a-f]{6}$/i.test(value)

describe("buildMd3Colors", () => {
  it("produces a primary derived from the source colour", () => {
    expect(isHex(buildMd3Colors("#ff8216").primary)).toBe(true)
  })

  it("returns every core Material 3 role as a hex colour", () => {
    const colors = buildMd3Colors("#ff8216")
    const roles = [
      colors.primary,
      colors.onPrimary,
      colors.primaryContainer,
      colors.secondary,
      colors.tertiary,
      colors.background,
      colors.surface,
      colors.surfaceVariant,
      colors.outline,
      colors.error
    ]
    roles.forEach((role) => expect(isHex(role)).toBe(true))
  })

  it("gives a dark scheme a dark background", () => {
    const [r, g, b] = buildMd3Colors("#ff8216", true)
      .background.replace("#", "")
      .match(/.{2}/g)!
      .map((v) => parseInt(v, 16))
    expect((r + g + b) / 3).toBeLessThan(80)
  })

  it("gives a light scheme a bright background", () => {
    const [r, g, b] = buildMd3Colors("#ff8216", false)
      .background.replace("#", "")
      .match(/.{2}/g)!
      .map((v) => parseInt(v, 16))
    expect((r + g + b) / 3).toBeGreaterThan(180)
  })

  it("shifts the whole scheme when the source colour changes", () => {
    expect(buildMd3Colors("#ff8216").primary).not.toBe(
      buildMd3Colors("#3487f3").primary
    )
  })

  it("tints surfaces differently at each elevation level", () => {
    const { elevation } = buildMd3Colors("#ff8216")
    expect(elevation.level1).not.toBe(elevation.level5)
  })

  it("starts elevation level0 as transparent", () => {
    expect(buildMd3Colors("#ff8216").elevation.level0).toBe("transparent")
  })

  it("falls back to the default source for an invalid colour", () => {
    expect(isHex(buildMd3Colors("nonsense").primary)).toBe(true)
  })

  it("falls back for an empty colour", () => {
    expect(isHex(buildMd3Colors("").primary)).toBe(true)
  })

  it("keeps onPrimary readable against primary", () => {
    const colors = buildMd3Colors("#ff8216")
    expect(colors.onPrimary).not.toBe(colors.primary)
  })
})
