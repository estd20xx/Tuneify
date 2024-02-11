export interface StoreSong {
    id: string;
    title: string;
    artist: string;
    artwork: string;
    url: string;
}
export interface InitialStateTypes {
    storeSong: StoreSong[]
}