import { isMissing, mergeDownloadMeta } from "../../src/helpers/localMedia"

const localSong = (overrides: Record<string, string> = {}) => ({
  id: "1",
  title: "Some Song",
  artist: "<unknown>",
  artwork: "",
  url: "/storage/emulated/0/Music/Some Song.mp3",
  ...overrides
})

const meta = {
  "/storage/emulated/0/Music/Some Song.mp3": {
    id: "abc",
    title: "Some Song",
    artist: "Himesh Reshammiya",
    artwork: "https://c.saavncdn.com/cover-500x500.jpg"
  }
}

describe("isMissing", () => {
  it("treats the MediaStore unknown marker as missing", () => {
    expect(isMissing("<unknown>")).toBe(true)
  })

  it("treats an empty string as missing", () => {
    expect(isMissing("")).toBe(true)
  })

  it("treats whitespace as missing", () => {
    expect(isMissing("   ")).toBe(true)
  })

  it("treats a real artist name as present", () => {
    expect(isMissing("Arijit Singh")).toBe(false)
  })
})

describe("mergeDownloadMeta", () => {
  it("fills in the artist that MediaStore could not read", () => {
    const result = mergeDownloadMeta([localSong()], meta)
    expect(result[0].artist).toBe("Himesh Reshammiya")
  })

  it("fills in the missing artwork", () => {
    const result = mergeDownloadMeta([localSong()], meta)
    expect(result[0].artwork).toBe("https://c.saavncdn.com/cover-500x500.jpg")
  })

  it("keeps metadata the device did manage to read", () => {
    const result = mergeDownloadMeta(
      [localSong({ artist: "Real Tag Artist" })],
      meta
    )
    expect(result[0].artist).toBe("Real Tag Artist")
  })

  it("leaves songs that were not downloaded untouched", () => {
    const other = localSong({ url: "/storage/emulated/0/Music/Other.mp3" })
    expect(mergeDownloadMeta([other], meta)).toEqual([other])
  })

  it("never changes the playable url", () => {
    const result = mergeDownloadMeta([localSong()], meta)
    expect(result[0].url).toBe(localSong().url)
  })

  it("returns the songs unchanged when nothing has been downloaded", () => {
    const songs = [localSong()]
    expect(mergeDownloadMeta(songs, {})).toEqual(songs)
  })

  it("handles a missing song list", () => {
    expect(mergeDownloadMeta(null, meta)).toEqual([])
  })
})
