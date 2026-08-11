import reducer, {
  resetScreen,
  songRepeat,
  updateQueue,
  updateSongQueue
} from "../../src/store/slices/Queue.slice"

const song = (id: string) => ({
  id,
  title: `title-${id}`,
  artist: `artist-${id}`,
  artwork: `artwork-${id}`,
  url: `url-${id}`
})

const baseState = () => ({
  data: { screenId: "songs", song: song("a"), isPlaying: true } as any,
  isLoading: false,
  isRepeat: false,
  isSuffle: false,
  isError: false
})

describe("central queue slice", () => {
  it("replaces the whole queue descriptor on updateQueue", () => {
    const next = reducer(
      baseState(),
      updateQueue({
        screenId: "favourites",
        song: song("b"),
        isPlaying: true
      } as any)
    )
    expect(next.data.screenId).toBe("favourites")
    expect(next.data.song.id).toBe("b")
  })

  it("swaps only the song and playing flag on updateSongQueue", () => {
    const next = reducer(
      baseState(),
      updateSongQueue({ song: song("c") as any, isPlaying: false })
    )
    expect(next.data.song.id).toBe("c")
    expect(next.data.isPlaying).toBe(false)
    expect(next.data.screenId).toBe("songs")
  })

  it("flips the repeat flag on each songRepeat", () => {
    const once = reducer(baseState(), songRepeat())
    expect(once.isRepeat).toBe(true)
    const twice = reducer(once, songRepeat())
    expect(twice.isRepeat).toBe(false)
  })

  it("clears the screen id but keeps the current song", () => {
    const next = reducer(baseState(), resetScreen())
    expect(next.data.screenId).toBe("")
    expect(next.data.song.id).toBe("a")
  })
})
