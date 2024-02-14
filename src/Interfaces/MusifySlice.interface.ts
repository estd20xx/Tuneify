export interface StoreSong {
    id: string;
    title: string;
    artist: string;
    artwork: string;
    url: string;
}

export interface LocalFileTypes {
    album: string
    artist: string
    cover: string
    duration: number
    title: string
    url: string
}
export interface InitialStateTypes {
    storeSong: StoreSong[],
    localFile: LocalFileTypes[],
    isUploaded: boolean
}