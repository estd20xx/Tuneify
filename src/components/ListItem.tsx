import React from "react"
import {View, Text, ViewToken, Image, StyleSheet} from "react-native"
import Animated, {useAnimatedStyle, withTiming} from "react-native-reanimated"
import {Icons} from "../constants/Icon"
import {State, usePlaybackState} from "react-native-track-player"
import {TypedSelectorHook} from "../hooks/store.hook"
import {tunifyChild} from "../store/slices/childState.slice"
import CoverImage from "react-native-fast-image"
import {SongsTypes} from "../Interfaces/songs.interface"
type ListItemProps = {
  viewableItems: Animated.SharedValue<ViewToken[]>
  item: SongsTypes
  id: string
  currentId: string
}
const ListItem: React.FC<ListItemProps> = React.memo(
  ({item, viewableItems, id, currentId}) => {
    const state = TypedSelectorHook(tunifyChild)
    const playbackState = usePlaybackState()
    const rStyle = useAnimatedStyle(() => {
      const isVisible = Boolean(
        viewableItems.value
          .filter(item => item.isViewable)
          .find(viewableItem => viewableItem.item.id === item.id),
      )
      return {
        opacity: withTiming(isVisible ? 1 : 0),
        transform: [
          {
            scale: withTiming(isVisible ? 1 : 0.6),
          },
        ],
      }
    }, [])

    return (
      <Animated.View
        style={[
          {
            width: "100%",
            height: 60,
            flexDirection: "row",
            justifyContent: "space-between",
            paddingLeft: 2,
            paddingRight: 5,
            marginTop: 10,
            // backgroundColor: "red"
          },
          rStyle,
        ]}>
        <View className="w-4/5  h-full pl-3 flex flex-row  ">
          <View className="w-full rounded-lg overflow-hidden ">
            <View style={{flexDirection: "row", alignItems: "center"}}>
              <CoverImage
                source={{
                  uri: item.image[2].link,
                  headers: {Authorization: "songs"},
                  priority: CoverImage.priority.high,
                  cache: CoverImage.cacheControl.immutable,
                }}
                style={{width: 60, height: 60, borderRadius: 5}}
              />
              <View style={{marginLeft: 10}}>
                <Text
                  style={{
                    color:
                      id == currentId && state.isPlaying ? "#16FF00" : "white",
                    fontSize: 16,
                    fontFamily: "400",
                  }}>
                  {item.name}
                </Text>
                <Text
                  style={{
                    color: "#d0d0d1",
                    fontSize: 12,
                    marginTop: 2,
                    fontFamily: "200",
                  }}>
                  {item.primaryArtists}
                </Text>
              </View>
            </View>
          </View>
        </View>
        <View className=" w-1/5 h-full flex items-center justify-end flex-row pr-3">
          <Icons.MoreIcon name="more-vert" size={25} color={"#bababa"} />
        </View>
      </Animated.View>
    )
  },
)
const styles = StyleSheet.create({
  name: {
    color: "white",
    fontSize: 14,
    fontFamily: "Outfit-Black",
  },
})
export default ListItem
