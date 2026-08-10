import {
  packPlaylist,
  SHARE_HEADER,
  unpackPlaylist
} from "../../src/helpers/playlistCodec"

const song = (n: number) => ({
  id: `id${n}`,
  title: `Song Number ${n}`,
  artist: `Artist ${n}`,
  artwork: `https://c.saavncdn.com/753/Some-Album-Hindi-2004-2022120707341${n}-500x500.jpg`,
  url: `https://aac.saavncdn.com/753/1beca65be34c825c2108a77f81ea052${n}_320.mp4`
})

const playlist = (count: number, name = "Road Trip") => ({
  name,
  songs: Array.from({ length: count }, (_, i) => song(i))
})

describe("packPlaylist / unpackPlaylist", () => {
  it("round-trips a playlist name", () => {
    const result = unpackPlaylist(packPlaylist(playlist(3)))
    expect(result?.name).toBe("Road Trip")
  })

  it("round-trips every song field exactly", () => {
    const original = playlist(4)
    const result = unpackPlaylist(packPlaylist(original))
    expect(result?.songs).toEqual(original.songs)
  })

  it("restores full saavn artwork and audio urls", () => {
    const result = unpackPlaylist(packPlaylist(playlist(1)))
    expect(result?.songs[0].artwork).toBe(playlist(1).songs[0].artwork)
    expect(result?.songs[0].url).toBe(playlist(1).songs[0].url)
  })

  it("round-trips urls that match no known prefix", () => {
    const custom = {
      name: "Local",
      songs: [
        {
          id: "l1",
          title: "Local Song",
          artist: "Unknown",
          artwork: "file:///storage/emulated/0/art.png",
          url: "file:///storage/emulated/0/Music/track.mp3"
        }
      ]
    }
    expect(unpackPlaylist(packPlaylist(custom))?.songs).toEqual(custom.songs)
  })

  it("drops duplicate songs while packing", () => {
    const dupes = { name: "Dupes", songs: [song(1), song(1), song(2)] }
    const result = unpackPlaylist(packPlaylist(dupes))
    expect(result?.songs.map((s) => s.id)).toEqual(["id1", "id2"])
  })

  it("sanitises delimiters embedded in a title", () => {
    const nasty = {
      name: "Weird",
      songs: [{ ...song(1), title: "Tab\there\nand newline" }]
    }
    const result = unpackPlaylist(packPlaylist(nasty))
    expect(result?.songs).toHaveLength(1)
    expect(result?.songs[0].title).toBe("Tab here and newline")
  })

  it("folds the shared url prefixes so packing beats raw json", () => {
    const big = playlist(20)
    const packed = packPlaylist(big)
    expect(packed.length).toBeLessThan(JSON.stringify(big).length * 0.6)
  })
})

describe("unpackPlaylist rejects bad input", () => {
  it("returns null for an empty string", () => {
    expect(unpackPlaylist("")).toBeNull()
  })

  it("returns null for a payload without the header", () => {
    expect(unpackPlaylist("hello world")).toBeNull()
  })

  it("returns null for a header with no songs", () => {
    expect(unpackPlaylist(`${SHARE_HEADER}Empty`)).toBeNull()
  })

  it("returns null for arbitrary scanned text", () => {
    expect(unpackPlaylist("https://example.com/not-a-playlist")).toBeNull()
  })

  it("skips malformed rows but keeps valid ones", () => {
    const good = packPlaylist(playlist(2))
    expect(unpackPlaylist(`${good}\nbroken-row`)?.songs).toHaveLength(2)
  })

  it("returns null when given a non string", () => {
    expect(unpackPlaylist(undefined as any)).toBeNull()
  })
})
