import { Dispatch, UnknownAction } from "@reduxjs/toolkit"
import ImagePicker from "react-native-document-picker"
import { SettingInterface } from "../Interfaces/setting.interface"
import { changeProfile } from "../store/slices/user.slice"
import appNotification from "./appNotification.service"
export default class SettingService implements SettingInterface {
  public changeProfileImage = async (
    dispatch: Dispatch<UnknownAction>
  ): Promise<void> => {
    try {
      const userImage = await ImagePicker.pickSingle({
        type: ImagePicker.types.images
      })
      dispatch(changeProfile(userImage.uri))
    } catch (error) {
      appNotification.errorMessage("error", "something bad happens")
    }
  }
}
