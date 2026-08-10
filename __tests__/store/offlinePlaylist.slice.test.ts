import reducer, {
  addSongToPlaylist,
  deletePlaylist,
  newPlaylist
} from "../../src/store/slices/offlinePlaylist.slice"

const song = (id: string) => ({
  id,
  title: `title-${id}`,
  artist: `artist-${id}`,
  artwork: `artwork-${id}`,
  url: `url-${id}`
})

const list = (name: string, songIds: string[] = ["s1"]) => [
  { name, songs: songIds.map(song) }
]

const stateWith = (...names: string[]) => ({
  playlist: names.map((n) => list(n))
})

const names = (state: { playlist: Array<Array<{ name: string }>> }) =>
  state.playlist.map((p) => p[0].name)

describe("offline playlist slice", () => {
  it("creates a playlist at the front of the list", () => {
    const next = reducer(stateWith("old"), newPlaylist(list("fresh")))
    expect(names(next)).toEqual(["fresh", "old"])
  })

  it("ignores a playlist whose name already exists", () => {
    const next = reducer(stateWith("rock"), newPlaylist(list("rock")))
    expect(names(next)).toEqual(["rock"])
  })

  it("deletes a mid-list playlist and keeps the rest", () => {
    const next = reducer(stateWith("a", "b", "c", "d"), deletePlaylist(1))
    expect(names(next)).toEqual(["a", "c", "d"])
  })

  it("deletes exactly one playlist regardless of its index", () => {
    const next = reducer(stateWith("a", "b", "c", "d", "e", "f"), deletePlaylist(3))
    expect(next.playlist).toHaveLength(5)
    expect(names(next)).toEqual(["a", "b", "c", "e", "f"])
  })

  it("deletes the last playlist without emptying the list", () => {
    const next = reducer(stateWith("a", "b", "c"), deletePlaylist(2))
    expect(names(next)).toEqual(["a", "b"])
  })

  it("adds a song to the targeted playlist", () => {
    const next = reducer(
      stateWith("a"),
      addSongToPlaylist({ song: song("new"), index: 0 })
    )
    expect(next.playlist[0][0].songs.map((s) => s.id)).toEqual(["s1", "new"])
  })

  it("does not add the same song to a playlist twice", () => {
    const next = reducer(
      stateWith("a"),
      addSongToPlaylist({ song: song("s1"), index: 0 })
    )
    expect(next.playlist[0][0].songs).toHaveLength(1)
  })
})
