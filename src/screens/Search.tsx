import React, { memo, useCallback, useState } from "react"
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native"
import Input from "../components/Search/Input"
import { TypedSelectorHook } from "../hooks/store.hook"
import { useDebounce } from "../hooks/useDebounce"
import { StoreSongTypes } from "../Interfaces/tuneifySlice.interface"
import { tuneifySongs } from "../store/slices/song.slice"
const Search = () => {
  const { debouncedValue, isloading } = useDebounce("ok", 2)
  const data = TypedSelectorHook(tuneifySongs)
  const [searchQuery, setSearchQuery] = useState<string>("")
  const handleSearch = async () => {
    try {
      console.log(searchQuery)
    } catch (error) {
      console.log(error)
    }
  }
  const renderItem = useCallback(
    ({ item, index }: { item: StoreSongTypes; index: number }) => (
      <TouchableOpacity className="w-full h-16 mt-2 flex flex-row items-center">
        <View className="h-16 w-20  pl-2">
          <Image source={{ uri: item.artwork }} className="h-16 w-16 rounded-md" />
        </View>
        <View className="w-4/5 ">
          <Text
            style={{
              fontSize: 15,
              fontFamily: "500",
              color: "#FFF"
            }}
          >
            {item.title?.length > 45 ? item.title.slice(0, 45) + "..." : item.title}
          </Text>
          <Text style={{ fontSize: 10, color: "#d0d0d1", fontFamily: "200" }}>{item.artist}</Text>
        </View>
      </TouchableOpacity>
    ),
    []
  )
  return (
    <View className="w-full h-screen flex items-center">
      <Input
        setSearchQuery={setSearchQuery}
        handleSearch={handleSearch}
        searchQuery={searchQuery}
      />
      <View className="w-full h-full ">
        <FlatList
          data={data.songs}
          keyExtractor={(item) => item.url}
          initialNumToRender={3}
          showsVerticalScrollIndicator={false}
          maxToRenderPerBatch={4}
          contentContainerStyle={{ paddingTop: 10 }}
          removeClippedSubviews={true}
          windowSize={1}
          renderItem={renderItem}
        />
      </View>
    </View>
  )
}
export default memo(Search)
