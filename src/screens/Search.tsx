import React, { memo, useCallback, useEffect, useRef, useState } from "react"
import { FlatList, Image, Keyboard, Text, TouchableOpacity, View } from "react-native"
import { Bounce } from "react-native-animated-spinkit"
import { Song } from "../api/service/Payload.service"
import Input from "../components/Search/Input"
import Show from "../components/Show"
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
  const flatListRef = useRef<FlatList>(null)
  const [searchQuery, setSearchQuery] = useState<SearchedSongQueryParams>({
    p: 1,
    q: "",
    n: 50
  })
  const handleSearch = async (query: SearchedSongQueryParams) => {
    if (query.q.length < 2) {
      return
    }
    console.log("clicked : " + searchedData.isLoading)
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
  useEffect(() => {
    if (searchedData.data?.songs?.length) {
      flatListRef.current?.scrollToOffset({ animated: true, offset: 0 })
    }
  }, [searchedData.data])
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
      <Input setSearchQuery={setSearchQuery} searchQuery={searchQuery} />
      <Show isVisible={searchedData.isLoading}>
        <View className="w-full h-screen flex items-center justify-center bg-black">
          <Bounce size={140} color="#ff8216" />
        </View>
      </Show>
      <Show isVisible={!searchedData.isLoading}>
        <View className="w-full h-full ">
          <FlatList
            ref={flatListRef}
            data={searchedData.data?.songs}
            keyExtractor={(item) => item.id}
            initialNumToRender={3}
            onScrollBeginDrag={Keyboard.dismiss}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
            maxToRenderPerBatch={9}
            contentContainerStyle={{ paddingTop: 10 }}
            removeClippedSubviews={true}
            windowSize={10}
            renderItem={renderItem}
            ListEmptyComponent={
              <View className="w-full h-14 flex items-center justify-center">
                <Text className="text-gray-500 text-lg">No songs found</Text>
              </View>
            }
          />
        </View>
      </Show>
    </View>
  )
}
export default memo(Search)
