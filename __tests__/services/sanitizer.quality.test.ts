import { pickImage, pickQuality } from "../../src/services/sanitizer.service"

jest.mock("../../src/store/store", () => ({
  __esModule: true,
  default: { getState: () => ({ persistedReducer: { settings: {} } }) }
}))

const links = [
  { link: "12kbps" },
  { link: "48kbps" },
  { link: "96kbps" },
  { link: "160kbps" },
  { link: "320kbps" }
]

describe("pickQuality", () => {
  it("picks the 320kbps stream when high quality is on", () => {
    expect(pickQuality(links, true)).toBe("320kbps")
  })

  it("picks the 160kbps stream when high quality is off", () => {
    expect(pickQuality(links, false)).toBe("160kbps")
  })

  it("falls back to the best available when the list is short", () => {
    expect(pickQuality([{ link: "only" }], true)).toBe("only")
  })

  it("returns an empty string for an empty list", () => {
    expect(pickQuality([], true)).toBe("")
  })

  it("returns an empty string when the field is missing", () => {
    expect(pickQuality(undefined, true)).toBe("")
  })
})

describe("pickImage", () => {
  it("prefers the largest variant", () => {
    const images = [{ link: "50" }, { link: "150" }, { link: "500" }]
    expect(pickImage(images)).toBe("500")
  })

  it("falls back when fewer variants are returned", () => {
    expect(pickImage([{ link: "50" }])).toBe("50")
  })

  it("returns an empty string when there is no artwork", () => {
    expect(pickImage(undefined)).toBe("")
  })
})
