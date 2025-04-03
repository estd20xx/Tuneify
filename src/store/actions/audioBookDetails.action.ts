import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import {
  audioBaseApiAudio,
  audioBookImageBaseUrl,
  audioMetaDataFileType,
  baseApiMetaData
} from "../../api/base/constrants"
import { PayloadService } from "../../api/service/Payload.service"
type Prop = {
  identifier: string
  creator: string
}
interface AudioDetails {
  name: string
  source: string
  creator: string
  title: string
  track: string
  album: string
  genre: string
  bitrate: string
  length: string
  format: string
  original: string
  mtime: string
  size: string
  md5: string
  crc32: string
  sha1: string
}
type AudioDetailsResponse = {
  result: Array<AudioDetails>
}
class AudioBookeDetails extends PayloadService {
  public getAudioBookDetails = createAsyncThunk(
    "/audioBookeDetails",
    async (prop: Prop, ASYNC) => {
      try {
        const response = await axios.get<AudioDetailsResponse>(
          `${baseApiMetaData}${prop.identifier}${audioMetaDataFileType}`
        )
        return response.data.result
          .filter(
            (current) => current.source == "original" && current.track != null
          )
          .map((after) => {
            return {
              id: prop.identifier.concat(after.name),
              title: after.title || "not found",
              artist: prop.creator,
              artwork: audioBookImageBaseUrl.concat(prop.identifier),
              url: `${audioBaseApiAudio}${prop.identifier}/${after.name}`
            }
          })
      } catch (error: any) {
        return ASYNC.rejectWithValue(error?.message)
      }
    }
  )
}
export const audioBookDetails = new AudioBookeDetails()
