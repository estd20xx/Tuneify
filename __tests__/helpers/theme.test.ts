import {
  buildTheme,
  darken,
  hexToRgb,
  lighten,
  mix,
  readableOn,
  rgbToHex,
  withAlpha
} from "../../src/helpers/theme"

const DEFAULT_ACCENT = "#ff8216"

describe("hexToRgb", () => {
  it("parses a six digit hex", () => {
    expect(hexToRgb("#ff8216")).toEqual([255, 130, 22])
  })

  it("expands a three digit hex", () => {
    expect(hexToRgb("#f81")).toEqual([255, 136, 17])
  })

  it("falls back to the default accent for junk input", () => {
    expect(hexToRgb("not-a-color")).toEqual([255, 130, 22])
  })
})

describe("rgbToHex", () => {
  it("round-trips a colour", () => {
    expect(rgbToHex(...hexToRgb("#3487f3"))).toBe("#3487f3")
  })

  it("clamps values above range", () => {
    expect(rgbToHex(300, 300, 300)).toBe("#ffffff")
  })

  it("clamps values below range", () => {
    expect(rgbToHex(-10, -10, -10)).toBe("#000000")
  })
})

describe("mix", () => {
  it("returns the source colour at amount zero", () => {
    expect(mix("#ff8216", "#000000", 0)).toBe("#ff8216")
  })

  it("returns the target colour at amount one", () => {
    expect(mix("#ff8216", "#000000", 1)).toBe("#000000")
  })

  it("lands halfway at amount one half", () => {
    expect(mix("#ffffff", "#000000", 0.5)).toBe("#808080")
  })
})

describe("darken and lighten", () => {
  it("darken moves towards black", () => {
    expect(darken("#ff8216", 1)).toBe("#000000")
  })

  it("lighten moves towards white", () => {
    expect(lighten("#ff8216", 1)).toBe("#ffffff")
  })
})

describe("withAlpha", () => {
  it("produces an rgba string", () => {
    expect(withAlpha("#ff8216", 0.5)).toBe("rgba(255, 130, 22, 0.5)")
  })

  it("clamps alpha above one", () => {
    expect(withAlpha("#ff8216", 5)).toBe("rgba(255, 130, 22, 1)")
  })
})

describe("readableOn", () => {
  it("uses dark text on a bright accent", () => {
    expect(readableOn("#ffe600")).toBe("#181a20")
  })

  it("uses light text on a dark accent", () => {
    expect(readableOn("#1b1002")).toBe("#ffffff")
  })
})

describe("buildTheme", () => {
  it("keeps the chosen accent as the accent", () => {
    expect(buildTheme("#16FF00").accent).toBe("#16FF00")
  })

  it("derives a near black background from the accent", () => {
    const theme = buildTheme(DEFAULT_ACCENT)
    const [r, g, b] = hexToRgb(theme.background)
    expect(Math.max(r, g, b)).toBeLessThan(45)
  })

  it("keeps the default accent close to the original app background", () => {
    const theme = buildTheme(DEFAULT_ACCENT)
    const [r, g, b] = hexToRgb(theme.background)
    const [er, eg, eb] = hexToRgb("#1b1002")
    expect(Math.abs(r - er)).toBeLessThanOrEqual(6)
    expect(Math.abs(g - eg)).toBeLessThanOrEqual(6)
    expect(Math.abs(b - eb)).toBeLessThanOrEqual(6)
  })

  it("shifts the background hue when the accent changes", () => {
    expect(buildTheme("#3487f3").background).not.toBe(
      buildTheme(DEFAULT_ACCENT).background
    )
  })

  it("falls back to the default accent when given nothing", () => {
    expect(buildTheme("").accent).toBe("#ff8216")
  })

  it("produces a soft variant lighter than the accent", () => {
    const theme = buildTheme(DEFAULT_ACCENT)
    const [r] = hexToRgb(theme.accentSoft)
    const [br] = hexToRgb(theme.accent)
    expect(r).toBeGreaterThanOrEqual(br)
  })
})
