import reducer, {
  addUserFavouritesData
} from "../../src/store/slices/favourite.slice"

const song = (id: string) => ({
  id,
  title: `title-${id}`,
  artist: `artist-${id}`,
  artwork: `artwork-${id}`,
  url: `url-${id}`
})

const stateWith = (...ids: string[]) => ({
  favouriteData: ids.map(song)
})

const ids = (state: { favouriteData: Array<{ id: string }> }) =>
  state.favouriteData.map((s) => s.id)

describe("favourite slice", () => {
  it("adds a song when it is not already a favourite", () => {
    const next = reducer(stateWith(), addUserFavouritesData(song("a") as any))
    expect(ids(next)).toEqual(["a"])
  })

  it("puts the newest favourite at the front", () => {
    let next = reducer(stateWith(), addUserFavouritesData(song("a") as any))
    next = reducer(next, addUserFavouritesData(song("b") as any))
    expect(ids(next)).toEqual(["b", "a"])
  })

  it("removes a mid-list favourite and keeps every other song", () => {
    const next = reducer(
      stateWith("a", "b", "c", "d", "e"),
      addUserFavouritesData(song("c") as any)
    )
    expect(ids(next)).toEqual(["a", "b", "d", "e"])
  })

  it("removes the last favourite without touching earlier ones", () => {
    const next = reducer(
      stateWith("a", "b", "c"),
      addUserFavouritesData(song("c") as any)
    )
    expect(ids(next)).toEqual(["a", "b"])
  })

  it("removes the first favourite without clearing the list", () => {
    const next = reducer(
      stateWith("a", "b", "c"),
      addUserFavouritesData(song("a") as any)
    )
    expect(ids(next)).toEqual(["b", "c"])
  })

  it("removes exactly one song no matter how deep in the list it sits", () => {
    const start = stateWith("a", "b", "c", "d", "e", "f", "g", "h")
    const next = reducer(start, addUserFavouritesData(song("g") as any))
    expect(next.favouriteData).toHaveLength(7)
    expect(ids(next)).not.toContain("g")
  })

  it("toggles back to the original length after add then remove", () => {
    const start = stateWith("a", "b", "c")
    const added = reducer(start, addUserFavouritesData(song("z") as any))
    const removed = reducer(added, addUserFavouritesData(song("z") as any))
    expect(ids(removed)).toEqual(ids(start))
  })
})
