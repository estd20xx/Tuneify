import { View, Text, Image, TouchableOpacity, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { OnBoardingDataTypes, OnBoardingPropsTypes } from '../../Types/Types'
import onboardHelper from '../../helpers/onboarding.helper'
import { onboardingData } from '../../data/data'
const Onboading: React.FC<OnBoardingPropsTypes> = ({ navigation }) => {
  const [nre, setNre] = useState<number>(0)
  const [d, setD] = useState<OnBoardingDataTypes>(onboardingData[nre])
  useEffect(() => {
    setD(onboardingData[nre])
  }, [nre])
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
        <Image source={{ uri: "https://firebasestorage.googleapis.com/v0/b/threads-890e1.appspot.com/o/pexels-photo-3756767.jpeg?alt=media&token=40a0a408-9fa3-4e2d-96c2-c15abc3b8ed1" }} className='w-full h-full' />
      </View>
      <View className='w-full h-[45%] bg-[#181a20] absolute bottom-0 rounded-t-[50px] pt-10 flex items-center'>
        <View className='w-full  h-auto py-2 flex items-center justify-center mt-3 '>
          <Text className='text-white text-4xl tracking-widest font-medium'>{d.first}</Text>
          <Text className='text-white text-4xl tracking-widest font-medium'>{d.second}</Text>
          <Text className='text-white text-4xl tracking-widest font-medium'>{d.third}</Text>
        </View>
        <View className='w-1/2 h-5  mt-5 flex flex-row items-center justify-center'>
          <View className={`${nre == 0 ? "w-14" : "w-5"} h-3 rounded-full duration-1000  bg-[#ff8216] ml-1`}></View>
          <View className={`${nre == 1 ? "w-14" : "w-5"} h-3 rounded-full duration-1000 bg-[#ff8216] ml-1`}></View>
          <View className={`${nre == 2 ? "w-14" : "w-5"} h-3 rounded-full duration-1000 bg-[#ff8216] ml-1`}></View>
        </View>
        <TouchableOpacity className='bg-[#ff8216] absolute bottom-12 w-11/12 flex items-center justify-center py-3 rounded-3xl' onPress={() => onboardHelper.onboardHandler(setNre, nre, navigation)}>
          <Text className='text-white text-xl' >Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default Onboading