import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { SplashScreenPropsTypes } from '../Types/Types'
import Toast from 'react-native-toast-message'
const Splash: React.FC<SplashScreenPropsTypes> = ({ navigation }) => {

  useEffect(() => {
    const timeOut = setTimeout(() => {
      navigation.push("onboarding")
    }, 1000);
    return () => { clearTimeout(timeOut) }
  }, [])
  return (
    <View className='w-full h-screen flex items-center justify-center bg-gray-800'>
      <Toast />
      <Text className='text-xl font-semibold text-white'>Welcome Screen </Text>
    </View>
  )
}
export default Splash
