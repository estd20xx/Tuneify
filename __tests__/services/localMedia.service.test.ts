import fs from "react-native-fs"
import { musicService } from "../../src/services/localMedia.service"

jest.mock("react-native-fs", () => ({
  __esModule: true,
  default: {
    ExternalStorageDirectoryPath: "/storage/emulated/0",
    exists: jest.fn().mockResolvedValue(true),
    mkdir: jest.fn().mockResolvedValue(undefined),
    downloadFile: jest.fn()
  }
}))

jest.mock("../../src/native/MusicFiles", () => ({
  ApplicationCore: {
    getMusicFiles: jest.fn(),
    scanFile: jest.fn().mockResolvedValue(undefined)
  }
}))

const nativeFs = fs as jest.Mocked<any>

const song = {
  id: "a",
  title: "Some Song",
  artist: "Someone",
  artwork: "art",
  url: "https://cdn.test/song.mp3"
}

const flush = () => new Promise((resolve) => setImmediate(resolve))

beforeEach(() => {
  jest.clearAllMocks()
  global.requestAnimationFrame = ((cb: any) => cb(0)) as any
})

describe("downloadSong progress reporting", () => {
  it("reports a whole-number percentage while downloading", async () => {
    let onProgress: any
    nativeFs.downloadFile.mockImplementation((opts: any) => {
      onProgress = opts.progress
      return { promise: new Promise(() => {}) }
    })
    const update = jest.fn()
    const start = Date.now()
    jest.spyOn(Date, "now").mockReturnValue(start)
    await musicService.downloadSong(song as any, update)
    jest.spyOn(Date, "now").mockReturnValue(start + 5000)
    onProgress({ bytesWritten: 50, contentLength: 200 })
    expect(update).toHaveBeenCalledWith(25)
    jest.restoreAllMocks()
  })

  it("ignores progress events when the server omits a content length", async () => {
    let onProgress: any
    nativeFs.downloadFile.mockImplementation((opts: any) => {
      onProgress = opts.progress
      return { promise: new Promise(() => {}) }
    })
    const update = jest.fn()
    const start = Date.now()
    jest.spyOn(Date, "now").mockReturnValue(start)
    await musicService.downloadSong(song as any, update)
    jest.spyOn(Date, "now").mockReturnValue(start + 5000)
    onProgress({ bytesWritten: 50, contentLength: 0 })
    expect(update).not.toHaveBeenCalled()
    jest.restoreAllMocks()
  })

  it("never emits NaN as a progress value", async () => {
    let onProgress: any
    nativeFs.downloadFile.mockImplementation((opts: any) => {
      onProgress = opts.progress
      return { promise: new Promise(() => {}) }
    })
    const update = jest.fn()
    const start = Date.now()
    jest.spyOn(Date, "now").mockReturnValue(start)
    await musicService.downloadSong(song as any, update)
    jest.spyOn(Date, "now").mockReturnValue(start + 5000)
    onProgress({ bytesWritten: 10, contentLength: -1 })
    onProgress({ bytesWritten: 10, contentLength: 0 })
    const emitted = update.mock.calls.map((c) => c[0])
    expect(emitted.some((v) => Number.isNaN(v))).toBe(false)
    jest.restoreAllMocks()
  })
})

describe("downloadSong failure handling", () => {
  it("resets progress to zero when the download rejects", async () => {
    nativeFs.downloadFile.mockImplementation(() => ({
      promise: Promise.reject(new Error("network down"))
    }))
    const update = jest.fn()
    await musicService.downloadSong(song as any, update)
    await flush()
    expect(update).toHaveBeenCalledWith(0)
  })

  it("resets progress when the download cannot even start", async () => {
    nativeFs.downloadFile.mockImplementation(() => {
      throw new Error("no permission")
    })
    const update = jest.fn()
    await musicService.downloadSong(song as any, update)
    expect(update).toHaveBeenCalledWith(0)
  })

  it("leaves the button idle rather than stuck on a spinner", async () => {
    nativeFs.downloadFile.mockImplementation(() => ({
      promise: Promise.reject(new Error("boom"))
    }))
    const update = jest.fn()
    await musicService.downloadSong(song as any, update)
    await flush()
    const last = update.mock.calls[update.mock.calls.length - 1][0]
    expect(last).toBe(0)
  })
})

describe("downloadSong storage target", () => {
  it("creates the music directory when it is missing", async () => {
    nativeFs.exists.mockResolvedValue(false)
    nativeFs.downloadFile.mockImplementation(() => ({
      promise: new Promise(() => {})
    }))
    await musicService.downloadSong(song as any, jest.fn())
    expect(nativeFs.mkdir).toHaveBeenCalled()
  })

  it("writes the track into the music directory as an mp3", async () => {
    nativeFs.exists.mockResolvedValue(true)
    nativeFs.downloadFile.mockImplementation(() => ({
      promise: new Promise(() => {})
    }))
    await musicService.downloadSong(song as any, jest.fn())
    const opts = nativeFs.downloadFile.mock.calls[0][0]
    expect(opts.toFile).toBe("/storage/emulated/0/Music/Some Song.mp3")
    expect(opts.fromUrl).toBe(song.url)
  })
})
