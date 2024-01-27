import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import axios from "axios"
const Suggested = () => {
  const getData = async () => {
    try {
      const result = await axios.get("https://www.jiosaavn.com/album/kun-faya-kun-lofi-version-/B2H,91yobww_")
      console.log(result.data)
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
    </ScrollView>
  )
}
export default Suggested