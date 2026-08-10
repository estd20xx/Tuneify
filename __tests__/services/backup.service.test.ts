import {
  BACKUP_VERSION,
  buildBackup,
  parseBackup
} from "../../src/services/backup.service"

jest.mock("react-native-fs", () => ({
  __esModule: true,
  default: {
    DocumentDirectoryPath: "/docs",
    writeFile: jest.fn().mockResolvedValue(undefined),
    readFile: jest.fn(),
    exists: jest.fn()
  }
}))

const song = (id: string) => ({
  id,
  title: `t-${id}`,
  artist: `a-${id}`,
  artwork: `art-${id}`,
  url: `u-${id}`
})

describe("buildBackup", () => {
  it("stamps the current backup version", () => {
    expect(buildBackup([], []).version).toBe(BACKUP_VERSION)
  })

  it("carries playlists and favourites through", () => {
    const playlists = [[{ name: "Rock", songs: [song("a")] }]]
    const result = buildBackup(playlists, [song("b")])
    expect(result.playlists).toEqual(playlists)
    expect(result.favourites.map((s) => s.id)).toEqual(["b"])
  })

  it("tolerates missing collections", () => {
    const result = buildBackup(undefined as any, undefined as any)
    expect(result.playlists).toEqual([])
    expect(result.favourites).toEqual([])
  })
})

describe("parseBackup", () => {
  it("round-trips a backup it produced", () => {
    const built = buildBackup([[{ name: "Rock", songs: [song("a")] }]], [])
    expect(parseBackup(JSON.stringify(built))).toEqual(built)
  })

  it("rejects malformed json", () => {
    expect(parseBackup("{not json")).toBeNull()
  })

  it("rejects a backup from a different version", () => {
    const built = buildBackup([], [])
    const bumped = { ...built, version: 99 }
    expect(parseBackup(JSON.stringify(bumped))).toBeNull()
  })

  it("rejects an object missing the playlists array", () => {
    expect(
      parseBackup(JSON.stringify({ version: BACKUP_VERSION, favourites: [] }))
    ).toBeNull()
  })

  it("rejects a bare string", () => {
    expect(parseBackup(JSON.stringify("hello"))).toBeNull()
  })
})
