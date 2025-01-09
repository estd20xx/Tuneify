import { Dispatch, UnknownAction } from "@reduxjs/toolkit"
export interface LocalMediaInterface {
  getLocalmedia: (dispatch: Dispatch<UnknownAction>) => Promise<boolean>
}
