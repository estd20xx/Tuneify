import { buildSearchRows } from "../../src/helpers/searchResults"

const song = (id: string) => ({
  id,
  title: `Song ${id}`,
  type: "song",
  image: [{ link: "50" }, { link: "150" }, { link: "500" }],
  language: "english",
  year: "2024",
  play_count: "1",
  link: [],
  artist: `Artist ${id}`
})

const dynamic = {
  top: [],
  songs: [],
  artists: [{ id: "ar1", title: "Arijit", image: [{ link: "a" }, { link: "b" }] }],
  playlists: [
    {
      id: "pl1",
      title: "Chill",
      image: [{ link: "a" }, { link: "b" }],
      more_info: { artist_name: "Various" }
    }
  ],
  albums: [
    {
      id: "al1",
      title: "Album One",
      image: [{ link: "a" }, { link: "b" }],
      more_info: { music: "Composer" }
    }
  ]
} as any

describe("buildSearchRows", () => {
  it("shows full song results under top", () => {
    const rows = buildSearchRows("top", [song("a"), song("b")] as any, dynamic)
    expect(rows.map((r) => r.id)).toEqual(["a", "b"])
  })

  it("shows full song results under songs", () => {
    const rows = buildSearchRows("songs", [song("a")] as any, dynamic)
    expect(rows[0].subtitle).toBe("Artist a")
  })

  it("marks song rows as playable", () => {
    const rows = buildSearchRows("songs", [song("a")] as any, dynamic)
    expect(rows[0].song).not.toBeNull()
  })

  it("switches to artists when the artists chip is picked", () => {
    const rows = buildSearchRows("artists", [song("a")] as any, dynamic)
    expect(rows.map((r) => r.title)).toEqual(["Arijit"])
    expect(rows[0].subtitle).toBe("Artist")
  })

  it("switches to playlists and uses the playlist owner as subtitle", () => {
    const rows = buildSearchRows("playlists", [] as any, dynamic)
    expect(rows[0].title).toBe("Chill")
    expect(rows[0].subtitle).toBe("Various")
  })

  it("switches to albums and uses the composer as subtitle", () => {
    const rows = buildSearchRows("albums", [] as any, dynamic)
    expect(rows[0].title).toBe("Album One")
    expect(rows[0].subtitle).toBe("Composer")
  })

  it("marks non song rows as not playable", () => {
    const rows = buildSearchRows("artists", [] as any, dynamic)
    expect(rows[0].song).toBeNull()
  })

  it("drops songs without an id", () => {
    const rows = buildSearchRows(
      "songs",
      [song("a"), { ...song("b"), id: "" }] as any,
      dynamic
    )
    expect(rows).toHaveLength(1)
  })

  it("returns an empty list when there is nothing to show", () => {
    expect(buildSearchRows("albums", [], null)).toEqual([])
  })

  it("survives missing song results", () => {
    expect(buildSearchRows("songs", null, dynamic)).toEqual([])
  })
})
