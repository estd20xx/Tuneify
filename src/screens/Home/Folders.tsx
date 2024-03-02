import {View, Text, FlatList, TouchableOpacity} from "react-native"
import React, {useCallback} from "react"
import {tuneifyOfflines} from "../../store/slices/offline.slice"
import {TypedSelectorHook, useAppDispatch} from "../../hooks/store.hook"
import {LocalFileTypes} from "../../Interfaces/tuneifySlice.interface"
import Image from "react-native-fast-image"
import TrackPlayer from "react-native-track-player"
import {
  addTrackId,
  addTrackIndex,
  tunifyCurrentTrack,
} from "../../store/slices/currentTrack.slice"
const Folders = () => {
  const testId = "1212"
  const localFile = TypedSelectorHook(tuneifyOfflines)
  const dispatch = useAppDispatch()
  const current = TypedSelectorHook(tunifyCurrentTrack)
  const InitialiseThisOne = async (index: number) => {
    try {
      if (current.trackId == testId) {
        await TrackPlayer.skip(index)
        dispatch(addTrackIndex(index))
      } else {
        await TrackPlayer.reset()
        await TrackPlayer.setQueue(localFile.LocalSong)
        await TrackPlayer.skip(index)
        await TrackPlayer.play()
        dispatch(addTrackId(testId), addTrackIndex(index))
      }
    } catch (error) {
      console.log(error)
    }
  }
  const renderItem = useCallback(
    ({item, index}: {item: LocalFileTypes; index: number}) => (
      <TouchableOpacity
        className="w-full h-16  mt-2  flex flex-row items-center"
        onPress={() => InitialiseThisOne(index)}>
        <View className="h-16 w-20  pl-2">
          <Image
            source={{
              uri: item.cover,
              headers: {Authorization: "deviceImage"},
              priority: Image.priority.high,
              cache: Image.cacheControl.immutable,
            }}
            className="h-16 w-16 rounded-md"
          />
        </View>
        <View className="w-4/5 ">
          <Text
            style={{
              fontSize: 15,
              fontFamily: "500",
              color:
                index == current.index && testId == current.trackId
                  ? "#16FF00"
                  : "#FFF",
            }}>
            {item.title.length > 45
              ? item.title.slice(0, 45) + "..."
              : item.title}
          </Text>
          <Text style={{fontSize: 10, color: "#d0d0d1", fontFamily: "200"}}>
            {item.artist}
          </Text>
        </View>
      </TouchableOpacity>
    ),
    [],
  )
  return (
    <View className=" w-full h-auto">
      <FlatList
        data={localFile.LocalSong}
        keyExtractor={item => item.url}
        initialNumToRender={3}
        showsVerticalScrollIndicator={false}
        maxToRenderPerBatch={4}
        contentContainerStyle={{paddingBottom: 80}}
        removeClippedSubviews={true}
        windowSize={10}
        renderItem={renderItem}
      />
    </View>
  )
}
export default Folders
