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
    <View className='bg-[#181a20] w-full h-auto pt-2' >
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
              style={{
                opacity,
                transform: [{ translateY }, { scale }],
                width: '100%',
                height: 50,
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingLeft: 2,
                paddingRight: 5,
                marginTop: 10,
              }}
            >
              <View className='w-4/5  h-full pl-3 flex flex-row '>
                <View className='w-full rounded-lg overflow-hidden '>

                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Image
                      source={{ uri: currentSong.image[2].link }}
                      style={{ width: 50, height: 50, borderRadius: 5 }}
                    />
                    <View style={{ marginLeft: 10 }}>
                      <Text style={{ color: 'white' }}>{currentSong.label}</Text>
                      <Text style={{ color: 'white', fontSize: 10 }}>
                        {currentSong.primaryArtists}
                      </Text>
                    </View>

                  </View>

                </View>
              </View>
              <View className='w-1/5 h-full flex items-center justify-evenly flex-row'>
                {/* {index == currentIndex && State.Playing == playbackState && (
                  
                    )} */}

                <Image
                  source={require('../../../src/assets/images/playing.png')}
                  style={{
                    width: 18,
                    height: 18,
                    tintColor: 'white',
                    marginLeft: 20,
                  }}
                />
                <Icons.MoreIcon name='more-vert' size={25} color={"#bababa"} />
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