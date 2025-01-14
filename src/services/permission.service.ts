import { PermissionsAndroid } from "react-native"
import { PermissionInterface } from "../Interfaces/Permission.interface"
export default class PermissionService implements PermissionInterface {
  public askPermission = async (): Promise<boolean> => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_MEDIA_AUDIO
      )
      return granted === PermissionsAndroid.RESULTS.GRANTED
    } catch (err) {
      return false
    }
  }
}
