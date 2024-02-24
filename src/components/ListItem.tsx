import React from "react"
import {View, Text, ViewToken, Image} from "react-native"
import Animated, {useAnimatedStyle, withTiming} from "react-native-reanimated"
import {Icons} from "../constants/Icon"
import {SongsTypes} from "../Types/Types"
import {State, usePlaybackState} from "react-native-track-player"

type ListItemProps = {
  viewableItems: Animated.SharedValue<ViewToken[]>
  item: SongsTypes
  index: number
  currentIndex: number
}
const ListItem: React.FC<ListItemProps> = React.memo(
  ({item, viewableItems, index, currentIndex}) => {
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
              <Image
                source={{uri: item.image[2].link}}
                style={{width: 60, height: 60, borderRadius: 5}}
              />
              <View style={{marginLeft: 10}}>
                <Text style={{color: "white", fontSize: 14}}>{item.name}</Text>
                <Text style={{color: "#d0d0d1", fontSize: 10, marginTop: 1}}>
                  {item.primaryArtists}
                </Text>
              </View>
            </View>
          </View>
        </View>
        <View className=" w-1/5 h-full flex items-center justify-end flex-row pr-3">
          {index == currentIndex && State.Playing == playbackState.state && (
            <Image
              source={require("../assets/images/playing.png")}
              style={{
                width: 18,
                height: 18,
                tintColor: "white",
                marginLeft: 20,
              }}
            />
          )}
          <Icons.MoreIcon name="more-vert" size={25} color={"#bababa"} />
        </View>
      </Animated.View>
    )
  },
)
export default ListItem
