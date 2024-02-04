import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { OnBoardingPropsTypes } from '../../Types/Types'
const ListeningImage = "../../assets/images/Listening.png"
const Onboading: React.FC<OnBoardingPropsTypes> = ({ navigation }) => {
  return (
    <View className='w-full h-screen bg-[#181a20]'>
      <View className='w-full h-[80%] overflow-hidden'>
        <View className=' h-4/6 w-full absolute flex items-center justify-center'>
          <View className='bg-[#ff8216] w-3/4 h-4/6 rounded-full'></View>
          <View className='bg-[#ffb473] w-9 h-9 rounded-full absolute top-16 left-3'></View>
          <View className='bg-[#ffb473] w-9 h-9 rounded-full absolute  right-2'></View>
          <View className='bg-[#ffb473] w-4 h-4 rounded-full absolute top-1 right-1/2'></View>
          <View className='bg-[#ffb473] w-2 h-2 rounded-full absolute top-10 right-28'></View>
          <View className='bg-[#ffb473] w-2 h-2 rounded-full absolute top-10 left-28'></View>
        </View>
        <Image source={require(ListeningImage)} className='w-full h-full' />
      </View>
      <View className='w-full h-[45%] bg-[#181a20] absolute bottom-0 rounded-t-[50px] pt-10 flex items-center'>
        <View className='w-full  h-auto py-2 flex items-center justify-center mt-3 '>
          <Text className='text-white text-4xl tracking-widest font-medium'>User friendly mp3</Text>
          <Text className='text-white text-4xl tracking-widest font-medium'>music player for</Text>
          <Text className='text-white text-4xl tracking-widest font-medium'>your device</Text>
        </View>
        <TouchableOpacity className='bg-[#ff8216] absolute bottom-12 w-11/12 flex items-center justify-center py-3 rounded-3xl'>
          <Text className='text-white text-xl' onPress={() => navigation.navigate("bottom")}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default Onboading