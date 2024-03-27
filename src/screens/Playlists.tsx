import {View, Text, FlatList, TouchableOpacity, Image} from "react-native"
import React, {useEffect, useState} from "react"
import {HomeService} from "../api/service/home.service"
import {HomeDataResponse} from "../api/interface/module.interface"
const service = new HomeService()
const Playlists = () => {
  const [data, setData] = useState<HomeDataResponse>()
  const getDa = async () => {
    try {
      const data = await service.getHomeData()
      setData(data)
    } catch (error) {
      console.log("error frontend")
    }
  }
  useEffect(() => {
    getDa()
  }, [])
  return (
    <View className="w-full h-auto">
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={data?.tuneifyTrendingAlbumsResponse}
        initialNumToRender={3}
        maxToRenderPerBatch={4}
        removeClippedSubviews={true}
        windowSize={4}
        renderItem={({item}) => {
          console.log(item)
          return (
            <TouchableOpacity
              className={`flex items-center justify-center ml-2 `}>
              <View className=" h-36 w-36  rounded-3xl overflow-hidden">
                <Image
                  source={{uri: item.artwork[2].link}}
                  className="w-full h-full"
                />
              </View>
              <View className=" w-full h-9 flex items-center justify-center ">
                <Text className="text-white text-xs font-['500'] tracking-wider  ">
                  {item.title.length > 10
                    ? item.title.slice(0, 14) + ".."
                    : item.title}
                </Text>
              </View>
            </TouchableOpacity>
          )
        }}
      />
    </View>
  )
}

export default Playlists
