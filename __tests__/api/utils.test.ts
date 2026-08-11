import {
  handleArtists,
  handleImageVariation
} from "../../src/api/utils/utils"

describe("handleArtists", () => {
  it("joins several artists without a trailing separator", () => {
    const result = handleArtists([
      { name: "Arijit Singh" },
      { name: "Shreya Ghoshal" }
    ] as any)
    expect(result).toBe("Arijit Singh, Shreya Ghoshal")
  })

  it("returns a single artist with no separator at all", () => {
    expect(handleArtists([{ name: "Sushant" }] as any)).toBe("Sushant")
  })

  it("never ends with a comma or space", () => {
    const result = handleArtists([
      { name: "A" },
      { name: "B" },
      { name: "C" }
    ] as any)
    expect(result).not.toMatch(/[,\s]$/)
  })

  it("returns an empty string for an empty artist list", () => {
    expect(handleArtists([] as any)).toBe("")
  })

  it("returns an empty string when the field is missing", () => {
    expect(handleArtists(undefined as any)).toBe("")
  })
})

describe("handleImageVariation", () => {
  it("produces the three expected quality variants", () => {
    const result = handleImageVariation("https://cdn.test/cover-150x150.jpg")
    expect(result.map((i) => i.quality)).toEqual([
      "50x50",
      "150x150",
      "500x500"
    ])
  })

  it("rewrites a 150x150 source url for each quality", () => {
    const result = handleImageVariation("https://cdn.test/cover-150x150.jpg")
    expect(result[2].link).toBe("https://cdn.test/cover-500x500.jpg")
  })

  it("rewrites a 50x50 source url for each quality", () => {
    const result = handleImageVariation("https://cdn.test/cover-50x50.jpg")
    expect(result[2].link).toBe("https://cdn.test/cover-500x500.jpg")
  })
})
