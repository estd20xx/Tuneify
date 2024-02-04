import { View, Text, FlatList, ScrollView, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import homeHelper from '../../helpers/suggestedHelper'
import { SongsTypes } from '../../Types/Types'
import SortIcon from "react-native-vector-icons/FontAwesome";
import PlayIcon from "react-native-vector-icons/Ionicons";
import MoreIcon from "react-native-vector-icons/MaterialIcons";
const Songs = () => {
  const [ttls, setTson] = useState<number>(0)
  const [sng, setSng] = useState<SongsTypes[]>([])
  const getData = async () => {
    try {
      const getRelateedSongs = await homeHelper.getData(`https://musify-api-red-gula.vercel.app/search/songs?query=codependent`)
      // console.log(getRelateedSongs.data.results)
      setSng(getRelateedSongs.data.results)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    getData()
  }, [])
  return (
    <View className='bg-[#181a20] w-full h-auto pt-2'>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className='w-full h-14  flex  flex-row'>
          <View className='w-1/2  h-full flex justify-center pl-3'>
            <Text className=' text-white text-xl font-semibold'>560 Songs</Text>
          </View>
          <View className='w-1/2 h-full flex items-center justify-end flex-row pr-3'>
            <Text className='mr-2 text-[#ff8216] text-lg font-semibold'>Ascending</Text>
            <SortIcon name='sort' color={"#ff8216"} size={17} />
          </View>
        </View>
        {sng.map((currentSong) => {
          return (
            <View key={currentSong.id} className='w-full h-24  mb-2 flex flex-row'>
              <View className='w-4/5  h-full pl-3 flex flex-row'>
                <View className='w-24 rounded-lg overflow-hidden'>
                  <Image source={{ uri: currentSong.image[2].link }} className='h-full' />
                </View>
                <View className='w-[70%]  h-full pl-3 flex justify-evenly'>
                  <Text className='text-white text-lg font-semibold tracking-wider'>{currentSong.label}</Text>
                  <Text className='text-[#a1a0a3] tracking-wider'>{currentSong.primaryArtists}</Text>
                </View>
              </View>
              <View className='w-1/5 h-full flex items-center justify-evenly flex-row'>
                <PlayIcon name='play-circle-sharp' size={36} color={"#ff8216"} />
                <MoreIcon name='more-vert' size={30} color={"white"} />
              </View>
            </View>
          )
        })}
      </ScrollView>
    </View>
  )
}

export default Songs