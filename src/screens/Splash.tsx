import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { SplashScreenPropsTypes } from '../Types/Types'
import Toast from 'react-native-toast-message'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { checkLocal, musifyData } from '../store/Musify'
import { RootState } from '../store/store'
import LocalMediaService from '../services/localMedia.service';
import PermissionService from '../services/permission.service'
const permission = new PermissionService()
const musicService = new LocalMediaService()
const Splash: React.FC<SplashScreenPropsTypes> = ({ navigation }) => {
  const dispatch = useDispatch()
  const TypedHook: TypedUseSelectorHook<RootState> = useSelector
  const storeData = TypedHook(musifyData)
  const fn = async () => {
    try {
      const per = await permission.askPermission()
      if (per) { musicService.getLocalmedia(dispatch) }
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
    <View className='w-full h-screen flex items-center justify-center bg-gray-800'>
      <Toast />
      <Text className='text-xl font-semibold text-white'>Welcome Screen </Text>
    </View>
  )
}
export default Splash
