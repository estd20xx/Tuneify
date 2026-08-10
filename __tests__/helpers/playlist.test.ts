import {
  containsSong,
  dedupeSongs,
  findPlaylistIndex,
  mergeSongs,
  normalizePlaylistName,
  uniquePlaylistName
} from "../../src/helpers/playlist"

const song = (id: string) => ({
  id,
  title: `title-${id}`,
  artist: `artist-${id}`,
  artwork: `art-${id}`,
  url: `url-${id}`
})

const entry = (name: string) => [{ name, songs: [song("s1")] }]

describe("dedupeSongs", () => {
  it("removes repeated ids and keeps the first occurrence", () => {
    const result = dedupeSongs([song("a"), song("b"), song("a")])
    expect(result.map((s) => s.id)).toEqual(["a", "b"])
  })

  it("leaves a list without duplicates untouched", () => {
    const input = [song("a"), song("b")]
    expect(dedupeSongs(input).map((s) => s.id)).toEqual(["a", "b"])
  })

  it("drops entries without an id", () => {
    const result = dedupeSongs([song("a"), { ...song("b"), id: "" }] as any)
    expect(result.map((s) => s.id)).toEqual(["a"])
  })

  it("returns an empty array for null input", () => {
    expect(dedupeSongs(null)).toEqual([])
  })
})

describe("containsSong", () => {
  it("finds a song already in the list", () => {
    expect(containsSong([song("a"), song("b")], "b")).toBe(true)
  })

  it("reports a song that is absent", () => {
    expect(containsSong([song("a")], "z")).toBe(false)
  })

  it("handles a missing list", () => {
    expect(containsSong(undefined, "a")).toBe(false)
  })
})

describe("mergeSongs", () => {
  it("appends only songs that are not already present", () => {
    const result = mergeSongs([song("a"), song("b")], [song("b"), song("c")])
    expect(result.map((s) => s.id)).toEqual(["a", "b", "c"])
  })

  it("keeps the existing list when everything is a duplicate", () => {
    const result = mergeSongs([song("a")], [song("a"), song("a")])
    expect(result.map((s) => s.id)).toEqual(["a"])
  })
})

describe("normalizePlaylistName", () => {
  it("trims and lowercases", () => {
    expect(normalizePlaylistName("  Road Trip  ")).toBe("road trip")
  })
})

describe("findPlaylistIndex", () => {
  it("matches ignoring case and surrounding space", () => {
    const playlists = [entry("Rock"), entry("Chill")]
    expect(findPlaylistIndex(playlists, "  chill ")).toBe(1)
  })

  it("returns -1 when no playlist matches", () => {
    expect(findPlaylistIndex([entry("Rock")], "Jazz")).toBe(-1)
  })
})

describe("uniquePlaylistName", () => {
  it("keeps the name when it is free", () => {
    expect(uniquePlaylistName([entry("Rock")], "Jazz")).toBe("Jazz")
  })

  it("suffixes a colliding name", () => {
    expect(uniquePlaylistName([entry("Rock")], "Rock")).toBe("Rock (2)")
  })

  it("keeps counting past an existing suffix", () => {
    const playlists = [entry("Rock"), entry("Rock (2)")]
    expect(uniquePlaylistName(playlists, "Rock")).toBe("Rock (3)")
  })

  it("falls back to a default for a blank name", () => {
    expect(uniquePlaylistName([], "   ")).toBe("Playlist")
  })
})
