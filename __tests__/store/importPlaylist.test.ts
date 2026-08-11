import reducer, {
  importPlaylist
} from "../../src/store/slices/offlinePlaylist.slice"

const song = (id: string) => ({
  id,
  title: `title-${id}`,
  artist: `artist-${id}`,
  artwork: `art-${id}`,
  url: `url-${id}`
})

const stateWith = (
  entries: Array<{ name: string; songs: string[] }> = []
) => ({
  playlist: entries.map((e) => [{ name: e.name, songs: e.songs.map(song) }])
})

const names = (state: any) => state.playlist.map((p: any) => p[0].name)
const songsOf = (state: any, i: number) =>
  state.playlist[i][0].songs.map((s: any) => s.id)

describe("importPlaylist", () => {
  it("adds a scanned playlist that does not exist yet", () => {
    const next = reducer(
      stateWith(),
      importPlaylist({ name: "Shared", songs: [song("a"), song("b")] })
    )
    expect(names(next)).toEqual(["Shared"])
    expect(songsOf(next, 0)).toEqual(["a", "b"])
  })

  it("strips duplicate songs inside the scanned payload", () => {
    const next = reducer(
      stateWith(),
      importPlaylist({
        name: "Shared",
        songs: [song("a"), song("a"), song("b")]
      })
    )
    expect(songsOf(next, 0)).toEqual(["a", "b"])
  })

  it("merges into an existing playlist without duplicating songs", () => {
    const next = reducer(
      stateWith([{ name: "Shared", songs: ["a", "b"] }]),
      importPlaylist({ name: "Shared", songs: [song("b"), song("c")] })
    )
    expect(names(next)).toEqual(["Shared"])
    expect(songsOf(next, 0)).toEqual(["a", "b", "c"])
  })

  it("matches an existing playlist ignoring case and spacing", () => {
    const next = reducer(
      stateWith([{ name: "Road Trip", songs: ["a"] }]),
      importPlaylist({ name: "  road trip ", songs: [song("b")] })
    )
    expect(next.playlist).toHaveLength(1)
    expect(songsOf(next, 0)).toEqual(["a", "b"])
  })

  it("ignores a scanned playlist with no songs", () => {
    const next = reducer(stateWith(), importPlaylist({ name: "Empty", songs: [] }))
    expect(next.playlist).toHaveLength(0)
  })

  it("never creates two playlists with the same name", () => {
    let next = reducer(
      stateWith(),
      importPlaylist({ name: "Shared", songs: [song("a")] })
    )
    next = reducer(next, importPlaylist({ name: "Shared", songs: [song("b")] }))
    expect(next.playlist).toHaveLength(1)
  })
})
