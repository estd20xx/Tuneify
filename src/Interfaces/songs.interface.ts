import {  SongsTypes } from "../Types/Types"
export interface Isongs {
    readonly getUrl: () => string;
    getSongs: (setSng: (songs: SongsTypes[]) => void) => Promise<void>
}