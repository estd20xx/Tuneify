import React, { memo, useCallback, useEffect, useState } from "react"
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native"
import { Song } from "../api/service/Payload.service"
import Input from "../components/Search/Input"
import { TypedSelectorHook, useAppDispatch } from "../hooks/store.hook"
import { personalizedSearchedSong } from "../store/actions/searchedSong.action"
import { searchedSongData } from "../store/slices/new/searchedSong.slice"
export interface SearchedSongQueryParams {
  p: number
  q: string
  n: number
}
const Search = () => {
  const dispatch = useAppDispatch()
  const searchedData = TypedSelectorHook(searchedSongData)
  const [searchQuery, setSearchQuery] = useState<SearchedSongQueryParams>({
    p: 1,
    q: "",
    n: 50
  })
  const handleSearch = async (query: SearchedSongQueryParams) => {
    if (query.q.length < 2) {
      return
    }
    dispatch(personalizedSearchedSong.getSearchedSongDetails(query))
  }
  useEffect(() => {
    const handler = setTimeout(() => {
      handleSearch(searchQuery)
    }, 1000)
    return () => {
      clearTimeout(handler)
    }
  }, [searchQuery])
  const renderItem = useCallback(
    ({ item }: { item: Song; index: number }) => (
      <TouchableOpacity className="w-full h-16 mt-2 flex flex-row items-center">
        <View className="h-16 w-20  pl-2">
          <Image source={{ uri: item.image[1].link }} className="h-16 w-16 rounded-md" />
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
          data={searchedData.data?.songs}
          keyExtractor={(item) => item.id}
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
