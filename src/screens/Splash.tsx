import {View, Image} from "react-native"
import React, {useEffect} from "react"
import {SplashScreenPropsTypes} from "../Types/Types"
import {checkLocal, tuneifyOfflines} from "../store/slices/offline.slice"
import LocalMediaService from "../services/localMedia.service"
import PermissionService from "../services/permission.service"
import {TypedSelectorHook, useAppDispatch} from "../hooks/store.hook"
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
    storeData.isUploaded ? navigation.navigate("onboarding") : fn()
  }, [])
  return (
    <View className="w-full h-screen flex items-center justify-center bg-black">
      <Image source={require("../assets/images/launch_screen.png")} />
    </View>
  )
}
export default Splash
