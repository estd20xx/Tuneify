import { View, Text, TouchableOpacity, StatusBar, Platform, PermissionsAndroid } from 'react-native'
import React, { useEffect, useState } from 'react'
import { OnBoardingDataTypes, OnBoardingPropsTypes } from '../../Types/Types'
import OnboadringService from '../../services/onboarding.service'
const service = new OnboadringService(onBoardImageApi)
import { onboardingData } from '../../constants/naviG'
import * as Animatable from 'react-native-animatable';
import { onBoardImageApi } from '../../api/api'
import { useDispatch } from 'react-redux';
import { getAll, SortSongFields, SortSongOrder } from "react-native-get-music-files";
import { addLocalFiles } from '../../store/Musify'
import { Song } from 'react-native-get-music-files/lib/typescript/src/NativeTurboSongs'
const AnimatedButton = Animatable.createAnimatableComponent(TouchableOpacity)
const Onboading: React.FC<OnBoardingPropsTypes> = ({ navigation }) => {
  const [nre, setNre] = useState<number>(0)
  const [d, setD] = useState<OnBoardingDataTypes>(onboardingData[nre])
  const dispatch = useDispatch()
  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_MEDIA_AUDIO);
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        getAllSongOffline()
      } else {
        console.log("Access Denied")
      }
    } catch (err) {
      console.warn(err);
    }
  }

  const getAllSongOffline = async () => {
    try {
      const songsOrError = await getAll({
        limit: 30,
        offset: 0,
        coverQuality: 50,
        minSongDuration: 1000,
        sortBy: SortSongFields.TITLE,
        sortOrder: SortSongOrder.DESC,
      })
      const data: Song[] = [...songsOrError]
      if (data) {
        dispatch(addLocalFiles(data))
      }
    } catch (error) {

    }
  }
  useEffect(() => {
    setD(onboardingData[nre])
    requestCameraPermission()
  }, [nre])
  useEffect(() => {
    if (Platform.OS === "android") {
      StatusBar.setBackgroundColor("#e28f22");
    }
  }, [])
  return (
    <View className='w-full h-screen bg-[#181a20]'>
      <View className='w-full h-[80%] overflow-hidden'>
        <Animatable.Image animation="zoomInUp" source={{ uri: service.getOnboardImage() }} className='w-full h-full' />
      </View>
      <View className='w-full h-[45%] bg-[#181a20] absolute bottom-0 rounded-t-[50px] pt-10 flex items-center'>
        <View className='w-full  h-auto py-2 flex items-center justify-center mt-3 '>
          <Animatable.Text animation={"slideInLeft"} duration={1200} className='text-white text-4xl tracking-widest font-medium'>{d.first}</Animatable.Text>
          <Animatable.Text animation={"slideInLeft"} duration={1700} className='text-white text-4xl tracking-widest font-medium'>{d.second}</Animatable.Text>
          <Animatable.Text animation={"slideInLeft"} duration={2200} className='text-white text-4xl tracking-widest font-medium'>{d.third}</Animatable.Text>
        </View>
        <View className='w-1/2 h-5  mt-5 flex flex-row items-center justify-center'>
          <View className={`${nre == 0 ? "w-14" : "w-5"} h-3 rounded-full duration-1000  bg-[#ff8216] ml-1`}></View>
          <View className={`${nre == 1 ? "w-14" : "w-5"} h-3 rounded-full duration-1000 bg-[#ff8216] ml-1`}></View>
          <View className={`${nre == 2 ? "w-14" : "w-5"} h-3 rounded-full duration-1000 bg-[#ff8216] ml-1`}></View>
        </View>
        <AnimatedButton animation={"slideInUp"} className='bg-[#ff8216] absolute bottom-12 w-11/12 flex items-center justify-center py-3 rounded-3xl' onPress={() => service.onboardHandler(setNre, nre, navigation)}>
          <Text className='text-white text-xl' >Next</Text>
        </AnimatedButton>
      </View>
    </View>
  )
}
export default Onboading