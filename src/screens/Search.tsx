import React, { memo, useEffect, useRef, useState } from "react"
import { FlatList, Image, Keyboard, Text, TouchableOpacity, View } from "react-native"
import { Bounce } from "react-native-animated-spinkit"
import Show from "../components/Common/Show"
import Input from "../components/Search/Input"
import { TypedSelectorHook, useAppDispatch } from "../hooks/store.hook"
import { personalizedSearchedSong } from "../store/actions/searchedSong.action"
import { searchedSongData } from "../store/slices/searchedSong.slice"
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
  useEffect(() => {
    if (searchQuery.q.length <= 2) {
      return
    }

    const controller: AbortController = new AbortController()
    const signal: AbortSignal = controller.signal

    const handler = setTimeout(() => {
      dispatch(personalizedSearchedSong.getSearchedSongDetails({ query: searchQuery, signal }))
    }, 1000)

    return () => {
      clearTimeout(handler)
      controller.abort()
    }
  }, [searchQuery])
  useEffect(() => {
    if (searchedData.data?.songs?.length) {
      flatListRef.current?.scrollToOffset({ animated: true, offset: 0 })
    }
  }, [searchedData.data])
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
            onEndReachedThreshold={0.5}
            onEndReached={() => {
              console.log("end reached ")
            }}
            renderItem={({ item }) => {
              return (
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
                    <Text style={{ fontSize: 10, color: "#d0d0d1", fontFamily: "200" }}>
                      {item.artist}
                    </Text>
                  </View>
                </TouchableOpacity>
              )
            }}
          />
        </View>
      </Show>
    </View>
  )
}
export default memo(Search)
