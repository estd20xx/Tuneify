import {PermissionsAndroid} from "react-native"
import {Ipermission} from "../Interfaces/Permission.interface"
export default class PermissionService implements Ipermission {
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
