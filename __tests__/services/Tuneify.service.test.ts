import TrackPlayer, { Capability, RepeatMode } from "react-native-track-player"
import { applicationService } from "../../src/services/Tuneify.service"

jest.mock("react-native-track-player", () => ({
  __esModule: true,
  default: {
    setRepeatMode: jest.fn().mockResolvedValue(undefined),
    setupPlayer: jest.fn().mockResolvedValue(undefined),
    updateOptions: jest.fn().mockResolvedValue(undefined),
    add: jest.fn().mockResolvedValue(undefined),
    pause: jest.fn().mockResolvedValue(undefined),
    play: jest.fn().mockResolvedValue(undefined),
    seekTo: jest.fn().mockResolvedValue(undefined)
  },
  RepeatMode: { Off: 0, Track: 1, Queue: 2 },
  Capability: {
    Play: "play",
    Pause: "pause",
    SkipToNext: "next",
    SkipToPrevious: "previous",
    Stop: "stop",
    SeekTo: "seek"
  },
  State: {
    Playing: "playing",
    Paused: "paused",
    Loading: "loading",
    Buffering: "buffering"
  },
  AppKilledPlaybackBehavior: {
    StopPlaybackAndRemoveNotification: "stopAndRemove"
  }
}))

const player = TrackPlayer as jest.Mocked<any>

const queueState = (isRepeat: boolean) =>
  ({
    data: {} as any,
    isLoading: false,
    isRepeat,
    isSuffle: false,
    isError: false
  }) as any

beforeEach(() => {
  jest.clearAllMocks()
})

describe("repeatMode", () => {
  it("turns repeat on when the stored flag is currently off", async () => {
    const dispatch = jest.fn()
    await applicationService.repeatMode(queueState(false), dispatch)
    expect(player.setRepeatMode).toHaveBeenCalledWith(RepeatMode.Track)
  })

  it("turns repeat off when the stored flag is currently on", async () => {
    const dispatch = jest.fn()
    await applicationService.repeatMode(queueState(true), dispatch)
    expect(player.setRepeatMode).toHaveBeenCalledWith(RepeatMode.Off)
  })

  it("never leaves the player looping a track while the flag reads off", async () => {
    const dispatch = jest.fn()
    await applicationService.repeatMode(queueState(true), dispatch)
    expect(player.setRepeatMode).not.toHaveBeenCalledWith(RepeatMode.Track)
  })

  it("dispatches the toggle so the icon follows the player", async () => {
    const dispatch = jest.fn()
    await applicationService.repeatMode(queueState(false), dispatch)
    expect(dispatch).toHaveBeenCalledTimes(1)
  })
})

describe("setUpPlayer", () => {
  it("declares every capability the notification advertises", async () => {
    await applicationService.setUpPlayer(null)
    const options = player.updateOptions.mock.calls[0][0]
    for (const cap of options.notificationCapabilities) {
      expect(options.capabilities).toContain(cap)
    }
  })

  it("declares every capability the compact notification advertises", async () => {
    await applicationService.setUpPlayer(null)
    const options = player.updateOptions.mock.calls[0][0]
    for (const cap of options.compactCapabilities) {
      expect(options.capabilities).toContain(cap)
    }
  })

  it("supports skipping to the next track", async () => {
    await applicationService.setUpPlayer(null)
    const options = player.updateOptions.mock.calls[0][0]
    expect(options.capabilities).toContain(Capability.SkipToNext)
  })

  it("does not queue a track when none is supplied", async () => {
    await applicationService.setUpPlayer(null)
    expect(player.add).not.toHaveBeenCalled()
  })

  it("queues the supplied track", async () => {
    const track = { id: "a", title: "t", artist: "x", artwork: "y", url: "u" }
    await applicationService.setUpPlayer(track as any)
    expect(player.add).toHaveBeenCalledWith(track)
  })
})

describe("timerMusicOff", () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  it("pauses playback once the chosen period elapses", () => {
    const toggleTimer = jest.fn()
    applicationService.timerMusicOff(2, jest.fn(), toggleTimer)
    expect(player.pause).not.toHaveBeenCalled()
    jest.advanceTimersByTime(2 * 60 * 1000)
    expect(player.pause).toHaveBeenCalledTimes(1)
  })

  it("does not pause before the period elapses", () => {
    applicationService.timerMusicOff(5, jest.fn(), jest.fn())
    jest.advanceTimersByTime(4 * 60 * 1000)
    expect(player.pause).not.toHaveBeenCalled()
  })

  it("replaces an armed timer instead of stacking a second one", () => {
    applicationService.timerMusicOff(1, jest.fn(), jest.fn())
    applicationService.timerMusicOff(10, jest.fn(), jest.fn())
    jest.advanceTimersByTime(60 * 1000)
    expect(player.pause).not.toHaveBeenCalled()
    jest.advanceTimersByTime(9 * 60 * 1000)
    expect(player.pause).toHaveBeenCalledTimes(1)
  })

  it("pauses only once when the timer is set repeatedly", () => {
    applicationService.timerMusicOff(1, jest.fn(), jest.fn())
    applicationService.timerMusicOff(1, jest.fn(), jest.fn())
    applicationService.timerMusicOff(1, jest.fn(), jest.fn())
    jest.advanceTimersByTime(60 * 60 * 1000)
    expect(player.pause).toHaveBeenCalledTimes(1)
  })
})

describe("timerSkip", () => {
  it("seeks forward by ten seconds", async () => {
    await applicationService.timerSkip(30, true)
    expect(player.seekTo).toHaveBeenCalledWith(40)
  })

  it("seeks backward by ten seconds", async () => {
    await applicationService.timerSkip(30, false)
    expect(player.seekTo).toHaveBeenCalledWith(20)
  })
})
