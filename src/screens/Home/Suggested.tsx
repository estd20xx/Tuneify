import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import axios from "axios"
const Suggested = () => {
  const [albums, setAlbums] = useState()
  const getData = async () => {
    try {
      const result = await axios.get("https://saavn.me/modules?language=hindi,english,nepali")
      console.log(result.data.data.albums[3].image[2].link)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <ScrollView>
      <View className='bg-[#181a20] w-full h-screen flex items-center justify-center'>
        <TouchableOpacity className=' bg-green-500 h-10 px-5 flex items-center justify-center rounded-lg ' onPress={getData}>
          <Text className='text-white'>Suggested</Text>
        </TouchableOpacity>
      </View>
      <View className='w-full h-screen'></View>
    </ScrollView>
  )
}
export default Suggested