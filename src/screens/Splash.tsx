import React, { memo, useEffect } from "react"
import { View } from "react-native"
import { Chase } from "react-native-animated-spinkit"
import { SplashScreenPropsTypes } from "../Types/Types"
import { TypedSelectorHook, useAppDispatch } from "../hooks/store.hook"
import { musicService } from "../services/localMedia.service"
import PermissionService from "../services/permission.service"
import { accepted, tuneifyOfflines } from "../store/slices/offline.slice"
const permission = new PermissionService()
const Splash: React.FC<SplashScreenPropsTypes> = ({ navigation }) => {
  const dispatch = useAppDispatch()
  const offline = TypedSelectorHook(tuneifyOfflines)
  // TODO : need to optimize it
  const fn = async () => {
    try {
      const per = await permission.askPermission()
      if (per) {
        await musicService.getLocalmedia(dispatch)
        navigation.navigate("onboarding")
        dispatch(accepted(true))
        return
      }
      navigation.navigate("onboarding")
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    offline.isAccepted ? navigation.navigate("bottom") : fn()
  }, [])
  return (
    <View className="w-full h-screen flex items-center justify-center bg-black">
      <Chase size={140} color="#ff8216" />
    </View>
  )
}
export default memo(Splash)
