import React from "react"
import { Image, Text, TouchableOpacity, View, ViewToken } from "react-native"
import Animated, { useAnimatedStyle, withTiming } from "react-native-reanimated"
import { Song } from "../../api/service/Payload.service"
import { Icons } from "../../constants/Icon"

import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger
} from "react-native-popup-menu"
type ListItemProps = {
  viewableItems: Animated.SharedValue<ViewToken[]>
  item: Song
  id: string
  onpress: () => void
}
const ListItem: React.FC<ListItemProps> = React.memo(
  ({ item, viewableItems, id, onpress }) => {
    const rStyle = useAnimatedStyle(() => {
      const isVisible = Boolean(
        viewableItems.value
          .filter((item) => item.isViewable)
          .find((viewableItem) => viewableItem.item.id === item.id)
      )
      return {
        opacity: withTiming(isVisible ? 1 : 0),
        transform: [
          {
            scale: withTiming(isVisible ? 1 : 0.6)
          }
        ]
      }
    }, [])
    return (
      <Animated.View
        key={id}
        style={[
          {
            width: "100%",
            height: 60,
            flexDirection: "row",
            justifyContent: "space-between",
            paddingLeft: 2,
            paddingRight: 5,
            marginTop: 10
          },
          rStyle
        ]}
      >
        <TouchableOpacity onPress={onpress}>
          <View className="w-[90%]  h-full pl-3 flex flex-row  ">
            <View className="w-full rounded-lg overflow-hidden ">
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Image
                  source={{ uri: item.image[2].link }}
                  style={{ width: 60, height: 60, borderRadius: 17 }}
                />
                <View style={{ marginLeft: 10 }}>
                  <Text
                    style={{
                      color: id == item.id ? "#16FF00" : "white",
                      fontSize: 14,
                      fontFamily: "400"
                    }}
                  >
                    {item.title.slice(0, 40) + "..."}
                  </Text>
                  <Text
                    style={{
                      color: "#d0d0d1",
                      fontSize: 12,
                      marginTop: 2,
                      fontFamily: "200"
                    }}
                  >
                    {item.artist}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          className="w-[10%] h-full flex items-center justify-end flex-row pr-3"
          onPress={() => console.log("clicled")}
        >
          <Menu onSelect={(value) => console.log(value)}>
            <MenuTrigger>
              <Icons.MoreIcon name="more-vert" size={25} color={"#bababa"} />
            </MenuTrigger>
            <MenuOptions>
              <MenuOption
                style={{ backgroundColor: "black" }}
                value={"edit"}
                text="Edit"
              />
              <MenuOption
                style={{ backgroundColor: "black" }}
                value={"delete"}
                text="Delete"
              />
            </MenuOptions>
          </Menu>
        </TouchableOpacity>
      </Animated.View>
    )
  }
)
export default ListItem
