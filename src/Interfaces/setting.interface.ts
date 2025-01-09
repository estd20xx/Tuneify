import { Dispatch, UnknownAction } from "@reduxjs/toolkit"

export interface SettingInterface {
  changeProfileImage: (dispatch: Dispatch<UnknownAction>) => Promise<void>
}
