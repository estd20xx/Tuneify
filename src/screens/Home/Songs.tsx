import { View, Text, ScrollView, Image, Animated, Pressable, TouchableOpacity } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { SongsTypes } from '../../Types/Types'
import SongService from '../../services/songs.service';
import { songsApi } from '../../api/api';
import { Icons } from '../../constants/Icon';
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux"
import { RootState } from '../../store/store';
import { addSongList, musifyData } from '../../store/Musify';
import TrackPlayer from 'react-native-track-player';
import { State, usePlaybackState, useProgress } from 'react-native-track-player';
const service = new SongService(songsApi)
const cardHeight = 96
const padding = 5
const offset = cardHeight + padding
const AnimatedComp = Animated.createAnimatedComponent(TouchableOpacity)
const Songs = () => {
  const dispatch = useDispatch()
  const [currentIndex, setCurrentIndex] = useState(0);
  const playbackState = usePlaybackState();
  const progress = useProgress();
  const scrollY = useRef(new Animated.Value(0)).current
  const [sng, setSng] = useState<SongsTypes[]>([])
  useEffect(() => {
    service.getSongs(setSng)
  }, [])
  useEffect(() => {
    if (sng) {
      dispatch(addSongList(sng))
    }
  }, [sng])
  useEffect(() => {
    if (State.Playing == playbackState.state) {
      if (progress.position.toFixed(0) == progress.duration.toFixed(0)) {
        if (currentIndex < 20) {
          setCurrentIndex(currentIndex + 1);
        }
      }
    }
  }, [progress]);
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
            <AnimatedComp key={currentSong.id}
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
              onPress={async () => {
                await TrackPlayer.pause();
                await TrackPlayer.skip(index);
                await TrackPlayer.play();
                setCurrentIndex(index);
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
                      <Text style={{ color: 'white' }}>{currentSong.name}</Text>
                      <Text style={{ color: 'white', fontSize: 10 }}>
                        {currentSong.primaryArtists}
                      </Text>
                    </View>

                  </View>

                </View>
              </View>
              <View className=' w-1/5 h-full flex items-center justify-end flex-row pr-3'>
                {index == currentIndex && State.Playing == playbackState.state && (
                  <Image
                    source={require('../../../src/assets/images/playing.png')}
                    style={{
                      width: 18,
                      height: 18,
                      tintColor: 'white',
                      marginLeft: 20,
                    }}
                  />
                )}
                <Icons.MoreIcon name='more-vert' size={25} color={"#bababa"} />
              </View>
            </AnimatedComp>
          )
        })
        }
      </ScrollView>
    </View >
  )
}
export default Songs