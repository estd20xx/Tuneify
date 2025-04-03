import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { PayloadService } from "../../api/service/Payload.service";
type Prop = {
    identifier: string
}
interface AudioDetails {
    name: string;
    source: string;
    creator: string;
    title: string;
    track: string;
    album: string;
    genre: string;
    bitrate: string;
    length: string;
    format: string;
    original: string;
    mtime: string;
    size: string;
    md5: string;
    crc32: string;
    sha1: string;
}
type AudioDetailsResponse = {
    result: Array<AudioDetails>
}
class AudioBookeDetails extends PayloadService {
    public getAudioBookDetails = createAsyncThunk("/audioBookeDetails", async (prop: Prop, ASYNC) => {
        try {
            const response = await axios.get<AudioDetailsResponse>(`https://archive.org/metadata/${prop.identifier}/files?output=json`)
            const responseData = response.data.result.filter((current) => current.source == "original" && current.track != null)
            console.log(prop.identifier)
            console.log(responseData[0].name)
        } catch (error: any) {
            return ASYNC.rejectWithValue(error?.message)
        }
    })
}

export const audioBookDetails = new AudioBookeDetails()