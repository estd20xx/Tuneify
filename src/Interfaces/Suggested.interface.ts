import { AlbumTypes,Http, TrendingAlbumTypes, TrendingSongTypes ,ChartsTypes, PlaylistTypes } from "../Types/Types"

export default interface Isuggested {
    wait: (timeout: number) => Promise<void>
    randomGenerator: (initial: number, final: number) => number
    http: (url: string) => Promise<Http>
    getSuggestedData: (
        setAlbums: (albums: AlbumTypes[]) => void,
        setPlst: (playlist: PlaylistTypes[]) => void,
        setChst: (charts: ChartsTypes[]) => void,
        setLd: (ld: boolean) => void,
        setTrndSong: (trndSong: TrendingSongTypes[]) => void,
        setTrndAlb: (trndAlbum: TrendingAlbumTypes[]) => void)
        => void
}
