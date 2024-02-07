import { View, Text, ScrollView, Image, Animated } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { SongsTypes } from '../../Types/Types'
import SongService from '../../services/songs.service';
import { songsApi } from '../../api/api';
import { Icons } from '../../constants/Icon';
const service = new SongService(songsApi)
const cardHeight = 96
const padding = 5
const offset = cardHeight + padding
const Songs = () => {
  const scrollY = useRef(new Animated.Value(0)).current
  const [sng, setSng] = useState<SongsTypes[]>([])
  useEffect(() => {
    service.getSongs(setSng)
  }, [])
  return (
    <View className='bg-[#181a20] w-full h-auto pt-2 pb-14' >
      <ScrollView showsVerticalScrollIndicator={false}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], {
          useNativeDriver: false
        })}
      >
        {sng.map((currentSong, index) => {
          const inputRange = [offset * index, offset * index + offset]
          const outputRange1 = [1, 0]
          const outputRange2 = [1, offset / 2]
          const scale = scrollY.interpolate({
            inputRange,
            outputRange: outputRange1,
            extrapolate: "clamp"
          })
          const translateY = scrollY.interpolate({
            inputRange,
            outputRange: outputRange2,
            extrapolate: "clamp"
          })
          const opacity = scale
          return (
            <Animated.View key={currentSong.id}
              style={{ opacity, transform: [{ translateY }, { scale }] }}
              className={`w-full h-[96px]  mb-2 flex flex-row`}>
              <View className='w-4/5  h-full pl-3 flex flex-row'>
                <View className='w-24 rounded-lg overflow-hidden'>
                  <Image source={{ uri: currentSong.image[2].link }} className='h-full' />
                </View>
                <View className='w-[70%]  h-full pl-3 flex justify-center '>
                  <Text className='text-white text-[16px] font-semibold tracking-wider'>{currentSong.label}</Text>
                  <Text className='text-[#a1a0a3] text-sm tracking-wider mt-1'>{currentSong.primaryArtists}</Text>
                </View>
              </View>
              <View className='w-1/5 h-full flex items-center justify-evenly flex-row'>
                <Icons.PlayIcon name='play-circle-sharp' size={36} color={"#ff8216"} />
                <Icons.MoreIcon name='more-vert' size={30} color={"white"} />
              </View>
            </Animated.View>
          )
        })
        }
      </ScrollView>
    </View >
  )
}
export default Songs