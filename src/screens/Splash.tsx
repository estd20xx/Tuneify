import {View} from "react-native"
import React, {useEffect} from "react"
import {SplashScreenPropsTypes} from "../Types/Types"
import {checkLocal, tuneifyOfflines} from "../store/slices/offline.slice"
import LocalMediaService from "../services/localMedia.service"
import PermissionService from "../services/permission.service"
import {TypedSelectorHook, useAppDispatch} from "../hooks/store.hook"
import {Chase} from "react-native-animated-spinkit"
const permission = new PermissionService()
const musicService = new LocalMediaService()
const Splash: React.FC<SplashScreenPropsTypes> = ({navigation}) => {
  const dispatch = useAppDispatch()
  const storeData = TypedSelectorHook(tuneifyOfflines)
  const fn = async () => {
    try {
      const per = await permission.askPermission()
      if (per) {
        musicService.getLocalmedia(dispatch)
      }
      dispatch(checkLocal(true))
      navigation.navigate("onboarding")
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    storeData.isUploaded ? navigation.navigate("bottom") : fn()
  }, [])
  return (
    <View className="w-full h-screen flex items-center justify-center bg-black">
      <Chase size={140} color="#ff8216" />
    </View>
  )
}
export default Splash
