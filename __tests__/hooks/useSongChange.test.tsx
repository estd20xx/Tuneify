import React from "react"
import renderer, { act } from "react-test-renderer"
import TrackPlayer from "react-native-track-player"
import { useSongChange } from "../../src/hooks/useSongChange"

jest.mock("react-native-track-player", () => ({
  __esModule: true,
  default: {
    getQueue: jest.fn(),
    getActiveTrackIndex: jest.fn(),
    skip: jest.fn().mockResolvedValue(undefined),
    skipToNext: jest.fn().mockResolvedValue(undefined),
    skipToPrevious: jest.fn().mockResolvedValue(undefined),
    seekTo: jest.fn().mockResolvedValue(undefined)
  }
}))

const player = TrackPlayer as jest.Mocked<any>

const queueOf = (size: number) =>
  Array.from({ length: size }, (_, i) => ({ id: `t${i}` }))

const renderSongChange = (isShuffle: boolean) => {
  const ref: { current: any } = { current: null }
  const Probe = () => {
    ref.current = useSongChange(isShuffle)
    return null
  }
  act(() => {
    renderer.create(<Probe />)
  })
  return ref
}

beforeEach(() => {
  jest.clearAllMocks()
  player.getQueue.mockResolvedValue(queueOf(10))
  player.getActiveTrackIndex.mockResolvedValue(0)
})

describe("useSongChange without shuffle", () => {
  it("uses the native next control", async () => {
    const hook = renderSongChange(false)
    await act(async () => {
      await hook.current[1]()
    })
    expect(player.skipToNext).toHaveBeenCalledTimes(1)
    expect(player.skip).not.toHaveBeenCalled()
  })

  it("uses the native previous control", async () => {
    const hook = renderSongChange(false)
    await act(async () => {
      await hook.current[0]()
    })
    expect(player.skipToPrevious).toHaveBeenCalledTimes(1)
  })
})

describe("useSongChange with shuffle", () => {
  it("skips to some other track in the queue", async () => {
    const hook = renderSongChange(true)
    await act(async () => {
      await hook.current[1]()
    })
    expect(player.skip).toHaveBeenCalledTimes(1)
    expect(player.skipToNext).not.toHaveBeenCalled()
  })

  it("never lands on the track that is already playing", async () => {
    const hook = renderSongChange(true)
    player.getActiveTrackIndex.mockResolvedValue(4)
    for (let i = 0; i < 300; i++) {
      await act(async () => {
        await hook.current[1]()
      })
    }
    const chosen = player.skip.mock.calls.map((c: any[]) => c[0])
    expect(chosen).not.toContain(4)
  })

  it("only ever picks a valid index inside the queue", async () => {
    const hook = renderSongChange(true)
    player.getActiveTrackIndex.mockResolvedValue(0)
    for (let i = 0; i < 300; i++) {
      await act(async () => {
        await hook.current[1]()
      })
    }
    const chosen = player.skip.mock.calls.map((c: any[]) => c[0])
    expect(Math.min(...chosen)).toBeGreaterThanOrEqual(0)
    expect(Math.max(...chosen)).toBeLessThanOrEqual(9)
  })

  it("can still reach every other track in the queue", async () => {
    const hook = renderSongChange(true)
    player.getActiveTrackIndex.mockResolvedValue(4)
    for (let i = 0; i < 500; i++) {
      await act(async () => {
        await hook.current[1]()
      })
    }
    const chosen = new Set(player.skip.mock.calls.map((c: any[]) => c[0]))
    expect(chosen.size).toBe(9)
  })

  it("does nothing when the queue is empty", async () => {
    player.getQueue.mockResolvedValue([])
    const hook = renderSongChange(true)
    await act(async () => {
      await hook.current[1]()
    })
    expect(player.skip).not.toHaveBeenCalled()
  })

  it("restarts the only track when the queue holds a single song", async () => {
    player.getQueue.mockResolvedValue(queueOf(1))
    const hook = renderSongChange(true)
    await act(async () => {
      await hook.current[1]()
    })
    expect(player.skip).not.toHaveBeenCalled()
    expect(player.seekTo).toHaveBeenCalledWith(0)
  })

  it("shuffles on previous as well as next", async () => {
    const hook = renderSongChange(true)
    await act(async () => {
      await hook.current[0]()
    })
    expect(player.skip).toHaveBeenCalledTimes(1)
    expect(player.skipToPrevious).not.toHaveBeenCalled()
  })
})
