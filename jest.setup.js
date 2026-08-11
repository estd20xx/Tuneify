require("react-native-gesture-handler/jestSetup")

jest.mock("react-native-reanimated", () =>
  require("react-native-reanimated/mock")
)

jest.mock("react-native-mmkv", () => {
  const store = new Map()
  return {
    MMKV: class {
      set(key, value) {
        store.set(key, value)
      }
      getString(key) {
        return store.get(key)
      }
      delete(key) {
        store.delete(key)
      }
    }
  }
})

jest.mock("react-native-splash-screen", () => ({
  __esModule: true,
  default: { hide: jest.fn(), show: jest.fn() }
}))

jest.mock("react-native-gzip", () => ({
  deflate: jest.fn().mockResolvedValue(""),
  inflate: jest.fn().mockResolvedValue("")
}))

jest.mock("react-native-fs", () => ({
  __esModule: true,
  default: {
    ExternalStorageDirectoryPath: "/storage",
    DocumentDirectoryPath: "/docs",
    exists: jest.fn().mockResolvedValue(true),
    mkdir: jest.fn().mockResolvedValue(undefined),
    readFile: jest.fn().mockResolvedValue(""),
    writeFile: jest.fn().mockResolvedValue(undefined),
    downloadFile: jest.fn(() => ({ promise: new Promise(() => {}) }))
  }
}))

jest.mock("react-native-track-player", () => {
  const Enum = new Proxy({}, { get: (_, key) => String(key) })
  return {
    __esModule: true,
    default: {
      setupPlayer: jest.fn().mockResolvedValue(undefined),
      updateOptions: jest.fn().mockResolvedValue(undefined),
      add: jest.fn().mockResolvedValue(undefined),
      reset: jest.fn().mockResolvedValue(undefined),
      play: jest.fn().mockResolvedValue(undefined),
      pause: jest.fn().mockResolvedValue(undefined),
      skip: jest.fn().mockResolvedValue(undefined),
      skipToNext: jest.fn().mockResolvedValue(undefined),
      skipToPrevious: jest.fn().mockResolvedValue(undefined),
      seekTo: jest.fn().mockResolvedValue(undefined),
      setRepeatMode: jest.fn().mockResolvedValue(undefined),
      getQueue: jest.fn().mockResolvedValue([]),
      getActiveTrack: jest.fn().mockResolvedValue(null),
      getActiveTrackIndex: jest.fn().mockResolvedValue(0),
      registerPlaybackService: jest.fn(),
      addEventListener: jest.fn()
    },
    useProgress: () => ({ position: 0, duration: 0, buffered: 0 }),
    usePlaybackState: () => ({ state: undefined }),
    useTrackPlayerEvents: jest.fn(),
    Event: Enum,
    State: {
      None: "none",
      Ready: "ready",
      Playing: "playing",
      Paused: "paused",
      Stopped: "stopped",
      Buffering: "buffering",
      Connecting: "connecting",
      Loading: "loading",
      Ended: "ended",
      Error: "error"
    },
    Capability: Enum,
    RepeatMode: { Off: 0, Track: 1, Queue: 2 },
    AppKilledPlaybackBehavior: Enum
  }
})

jest.mock("react-native-qrcode-scanner", () => "QRCodeScanner")
jest.mock("react-native-qrcode-svg", () => "QRCode")
jest.mock("react-native-fast-image", () => {
  const FastImage = "FastImage"
  FastImage.priority = { high: "high" }
  FastImage.cacheControl = { immutable: "immutable" }
  return { __esModule: true, default: FastImage }
})
jest.mock("react-native-camera", () => ({
  RNCamera: { Constants: { FlashMode: { torch: "torch", off: "off" } } }
}))

jest.mock("@react-native-community/slider", () => "Slider")
jest.mock("react-native-text-ticker", () => "TextTicker")

jest.mock("react-native-document-picker", () => ({
  __esModule: true,
  default: {
    pickSingle: jest.fn().mockResolvedValue({ uri: "file://picked.png" }),
    types: { images: "images" }
  }
}))

jest.mock("react-native-safe-area-context", () => {
  const React = require("react")
  const inset = { top: 24, right: 0, bottom: 0, left: 0 }
  const frame = { x: 0, y: 0, width: 390, height: 844 }
  const InsetsContext = React.createContext(inset)
  const FrameContext = React.createContext(frame)
  return {
    SafeAreaProvider: ({ children }) => children,
    SafeAreaConsumer: InsetsContext.Consumer,
    SafeAreaInsetsContext: InsetsContext,
    SafeAreaFrameContext: FrameContext,
    SafeAreaView: ({ children }) => children,
    initialWindowMetrics: { insets: inset, frame },
    useSafeAreaInsets: () => inset,
    useSafeAreaFrame: () => frame
  }
})

const mockIcon = (name) => ({ __esModule: true, default: name })

jest.mock("react-native-vector-icons/MaterialIcons", () =>
  mockIcon("MaterialIcons")
)
jest.mock("react-native-vector-icons/MaterialCommunityIcons", () =>
  mockIcon("MaterialCommunityIcons")
)
jest.mock("react-native-vector-icons/Octicons", () => mockIcon("Octicons"))
jest.mock("react-native-vector-icons/Ionicons", () => mockIcon("Ionicons"))
jest.mock("react-native-vector-icons/AntDesign", () => mockIcon("AntDesign"))
jest.mock("react-native-vector-icons/Feather", () => mockIcon("Feather"))
jest.mock("react-native-vector-icons/Entypo", () => mockIcon("Entypo"))

jest.mock("react-native/Libraries/Animated/NativeAnimatedHelper")
