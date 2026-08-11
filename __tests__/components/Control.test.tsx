import React from "react"
import { act } from "react-test-renderer"
import { FAB, IconButton } from "react-native-paper"
import Control from "../../src/components/Player/Control"
import { applicationService } from "../../src/services/Tuneify.service"
import { renderWithProviders } from "../utils/renderWithProviders"

jest.mock("../../src/services/Tuneify.service", () => ({
  applicationService: {
    playPauseAction: jest.fn(),
    repeatMode: jest.fn()
  }
}))

const queue = {
  data: {},
  isLoading: false,
  isRepeat: false,
  isSuffle: false,
  isError: false
} as any

const setup = (overrides: Partial<any> = {}) => {
  const toggleShuffle = jest.fn()
  const dispatch = jest.fn()
  const tree = renderWithProviders(
    <Control
      isRepeat={false}
      playbackState={{ state: "paused" } as any}
      applicationQueue={queue}
      dispatch={dispatch}
      isShuffle={false}
      toggleShuffle={toggleShuffle}
      {...overrides}
    />
  )
  return {
    tree,
    toggleShuffle,
    dispatch,
    fab: tree.root.findAllByType(FAB)[0],
    buttons: tree.root.findAllByType(IconButton)
  }
}

beforeEach(() => jest.clearAllMocks())

describe("Player Control", () => {
  it("renders shuffle, previous, next and repeat as icon buttons", () => {
    const { buttons } = setup()
    expect(buttons).toHaveLength(4)
  })

  it("shows a play icon while paused", () => {
    const { fab } = setup()
    expect(fab.props.icon).toBe("play")
  })

  it("shows a pause icon while playing", () => {
    const { fab } = setup({ playbackState: { state: "playing" } })
    expect(fab.props.icon).toBe("pause")
  })

  it("shows the loading spinner while buffering", () => {
    const { fab } = setup({ playbackState: { state: "buffering" } })
    expect(fab.props.loading).toBe(true)
  })

  it("shows the loading spinner while loading", () => {
    const { fab } = setup({ playbackState: { state: "loading" } })
    expect(fab.props.loading).toBe(true)
  })

  it("does not show the spinner during normal playback", () => {
    const { fab } = setup({ playbackState: { state: "playing" } })
    expect(fab.props.loading).toBe(false)
  })

  it("toggles play and pause from the main button", () => {
    const { fab } = setup()
    act(() => {
      fab.props.onPress()
    })
    expect(applicationService.playPauseAction).toHaveBeenCalled()
  })

  it("toggles shuffle from the shuffle button", () => {
    const { buttons, toggleShuffle } = setup()
    act(() => {
      buttons[0].props.onPress()
    })
    expect(toggleShuffle).toHaveBeenCalled()
  })

  it("changes repeat mode from the repeat button", () => {
    const { buttons } = setup()
    act(() => {
      buttons[3].props.onPress()
    })
    expect(applicationService.repeatMode).toHaveBeenCalled()
  })

  it("shows the repeat-off icon when repeat is disabled", () => {
    const { buttons } = setup({ isRepeat: false })
    expect(buttons[3].props.icon).toBe("repeat-off")
  })

  it("shows the repeat icon when repeat is enabled", () => {
    const { buttons } = setup({ isRepeat: true })
    expect(buttons[3].props.icon).toBe("repeat")
  })

  it("labels every control for screen readers", () => {
    const { buttons, fab } = setup()
    buttons.forEach((b) => expect(b.props.accessibilityLabel).toBeTruthy())
    expect(fab.props.accessibilityLabel).toBe("Play")
  })
})
