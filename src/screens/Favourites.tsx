import React, { memo } from "react"
import { FlatList, Image, ScrollView, Text, TouchableOpacity, View } from "react-native"
import { Icons } from "../constants/Icon"
import { TypedSelectorHook } from "../hooks/store.hook"
import { tuneifyFavourites } from "../store/slices/favourite.slice"
const screenId = "favourites"
const Favourites = () => {
  const data = TypedSelectorHook(tuneifyFavourites)
  return (
    <View className="w-full h-screen flex items-center justify-center pb-20 ">
      <ScrollView>
        <View className="w-full  h-20  flex flex-row items-center justify-evenly">
          <TouchableOpacity className="bg-themeOrange h-8 px-10 rounded-full flex items-center justify-center flex-row">
            <Image
              source={require("../assets/images/suffle.png")}
              style={{
                tintColor: "white",
                width: 20,
                height: 20,
                marginRight: 3
              }}
            />
            <Text className="text-white text-base font-[400]">Suffle</Text>
          </TouchableOpacity>
          <TouchableOpacity className="bg-[#35383f] h-8 px-10 rounded-full flex items-center justify-center flex-row">
            <Icons.PlayIcon name="play" color={"white"} size={20} className="mr-1" />
            <Text className="text-white text-base font-[400]">Play</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={data.favouriteData}
          keyExtractor={(item) => item.id}
          initialNumToRender={3}
          showsVerticalScrollIndicator={false}
          maxToRenderPerBatch={4}
          contentContainerStyle={{ paddingBottom: 80 }}
          removeClippedSubviews={true}
          scrollEnabled={false}
          windowSize={10}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                style={{
                  width: "100%",
                  height: 60,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  paddingLeft: 2,
                  paddingRight: 5,
                  marginTop: 10
                }}
              >
                <View className="w-[90%]  h-full pl-3 flex flex-row ">
                  <View className="w-full rounded-lg overflow-hidden ">
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                      <Image
                        source={{ uri: item?.artwork }}
                        style={{ width: 60, height: 60, borderRadius: 5 }}
                      />
                      <View style={{ marginLeft: 10 }}>
                        <Text
                          style={{
                            color: "white",
                            fontSize: 14,
                            fontFamily: "400"
                          }}
                        >
                          {item.title.slice(0, 40)}
                        </Text>
                        <Text
                          style={{
                            color: "#d0d0d1",
                            fontSize: 10,
                            marginTop: 1,
                            fontFamily: "300"
                          }}
                        >
                          {item.artist}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
                <View className="w-[10%] h-full flex items-center justify-end flex-row pr-3">
                  <Icons.MoreIcon name="more-vert" size={25} color={"#bababa"} />
                </View>
              </TouchableOpacity>
            )
          }}
        />
      </ScrollView>
    </View>
  )
}
export default memo(Favourites)
