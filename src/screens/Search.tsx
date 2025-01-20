import React, { memo, useEffect, useRef, useState } from "react"
import { FlatList, Image, Keyboard, Text, TouchableOpacity, View } from "react-native"
import { Bounce } from "react-native-animated-spinkit"
import Show from "../components/Common/Show"
import Input from "../components/Search/Input"
import { TypedSelectorHook, useAppDispatch } from "../hooks/store.hook"
import { personalizedSearchedSong } from "../store/actions/searchedSong.action"
import { searchSongPagination } from "../store/actions/searchPagination.action"
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
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const [isInitialSearch, setIsInitialSearch] = useState(true);
  const [searchQuery, setSearchQuery] = useState<SearchedSongQueryParams>({
    p: 1,
    q: "",
    n: 50
  })
  useEffect(() => {
    if (searchQuery.q.length <= 2) {
      return
    }
    setIsInitialSearch(true);
    const controller: AbortController = new AbortController()
    const signal: AbortSignal = controller.signal
    const handler = setTimeout(() => {
      dispatch(personalizedSearchedSong.getSearchedSongDetails({ query: searchQuery, signal }))
    }, 1000)

    return () => {
      clearTimeout(handler)
      controller.abort()
    }
  }, [searchQuery.q])

  const handleLoadMore = () => {
    if (isFetchingMore || searchedData.isLoading) return;

    setIsFetchingMore(true);

    const nextQuery = {
      ...searchQuery,
      p: searchQuery.p + 1,
    };

    dispatch(
      searchSongPagination.getSearchedSongDetails({ query: nextQuery })
    ).finally(() => {
      setSearchQuery(nextQuery);
      setIsFetchingMore(false);
    });
  };

  useEffect(() => {
    if (searchedData.data?.songs?.length && isInitialSearch) {
      flatListRef.current?.scrollToOffset({ animated: true, offset: 0 })
      setIsInitialSearch(false);
    }
  }, [searchedData.data])
  return (
    <View className="w-full h-screen flex items-center mb-20">
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
            keyExtractor={(item, index) => `${item.id}-${index}`}
            initialNumToRender={3}
            onScrollBeginDrag={Keyboard.dismiss}
            keyboardShouldPersistTaps="handled"
            maxToRenderPerBatch={9}
            contentContainerStyle={{ paddingTop: 10 }}
            removeClippedSubviews={true}
            windowSize={10}
            ListFooterComponent={() => {
              return (
                <Show isVisible={searchedData.data != null}>
                  <View className="w-full h-20 flex items-center justify-center mb-20">
                    <Text className="text-white">Loading </Text>
                  </View>
                </Show>
              )
            }}
            onEndReachedThreshold={0.5}
            onEndReached={handleLoadMore}
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
