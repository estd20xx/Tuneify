import {Dispatch, UnknownAction} from "@reduxjs/toolkit"

export interface ISetting {
  changeProfileImage: (dispatch: Dispatch<UnknownAction>) => Promise<void>
}
