import React, { memo, useState } from "react"
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native"
const Albums = () => {
  const [files, setFiles] = useState<any>([])
  const getMusicFiles = async () => {
    try {
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <View className="h-screen w-full flex items-center justify-center">
      <TouchableOpacity className="px-10 py-3 bg-black rounded-lg" onPress={getMusicFiles}>
        <Text>Get Music</Text>
      </TouchableOpacity>
      <FlatList
        data={files}
        keyExtractor={(item, index) => item.id}
        initialNumToRender={3}
        showsVerticalScrollIndicator={false}
        maxToRenderPerBatch={4}
        contentContainerStyle={{ paddingBottom: 80 }}
        removeClippedSubviews={true}
        windowSize={10}
        renderItem={({ item, index }) => {
          console.log(item.artwork)
          return (
            <TouchableOpacity className="w-full h-16 mt-2 flex flex-row items-center">
              <View className="h-16 w-20  pl-2">
                <Image source={{ uri: item.artwork }} className="h-16 w-16 rounded-md" />
              </View>
              <View className="w-4/5 ">
                <Text
                  style={{
                    fontSize: 14,
                    fontFamily: "500",
                    color: "#FFF"
                  }}
                >
                  {item.title.slice(0, 40)}
                </Text>
                <Text
                  style={{
                    fontSize: 10,
                    color: "#d0d0d1",
                    fontFamily: "200"
                  }}
                >
                  {item.artist}
                </Text>
              </View>
            </TouchableOpacity>
          )
        }}
      />
    </View>
  )
}
export default memo(Albums)
