import React, { memo, useEffect, useMemo, useRef } from "react"
import {
  FlatList,
  Image,
  Keyboard,
  RefreshControl,
  Text,
  TouchableOpacity,
  View
} from "react-native"
import { Bounce } from "react-native-animated-spinkit"
import TrackPlayer from "react-native-track-player"
import { screens } from "../api/base/constrants"
import { Song } from "../api/service/Payload.service"
import Show from "../components/Common/Show"
import SongRow from "../components/Common/SongRow"
import Category from "../components/Search/Category"
import Input from "../components/Search/Input"
import { TypedSelectorHook, useAppDispatch } from "../hooks/store.hook"
import { useFetchingState } from "../hooks/useFetchingState"
import { buildSearchRows } from "../helpers/searchResults"
import { useSearch } from "../hooks/useSearch"
import { useSearchCategory } from "../hooks/useSearchCategory"
import { useTheme } from "../hooks/useTheme"
import { sanitize } from "../services/sanitizer.service"
import { personalizedDynamic } from "../store/actions/SearchDynamic.action"
import { personalizedSearchedSong } from "../store/actions/searchedSong.action"
import { searchSongPagination } from "../store/actions/searchPagination.action"
import {
  centralQueue,
  SpecificQueue,
  updateQueue
} from "../store/slices/Queue.slice"
import { dynamicSearchData } from "../store/slices/searchDynamic.slice"
import { searchedSongData } from "../store/slices/searchedSong.slice"
export interface SearchedSongQueryParams {
  p: number
  q: string
  n: number
}
const Search = () => {
  const applicationQueue = TypedSelectorHook(centralQueue)
  const dispatch = useAppDispatch()
  const searchedData = TypedSelectorHook(searchedSongData)
  const dynamicData = TypedSelectorHook(dynamicSearchData)
  const theme = useTheme()
  const [category, updateCategory] = useSearchCategory()

  const flatListRef = useRef<FlatList>(null)
  const [searchQuery, updateQuery] = useSearch()
  const [isInitialSearch, updateInitial, isFetchingMore, updateFetchingMore] =
    useFetchingState()
  const changeQueueState = async (song: Song) => {
    try {
      if (searchedData.data?.songs) {
        if (applicationQueue.data.screenId != screens.searchScreenId) {
          await TrackPlayer.reset()
          await TrackPlayer.add(sanitize.songs([song]))
          await TrackPlayer.play()
          const newQueue: SpecificQueue = {
            screenId: screens.searchScreenId,
            isPlaying: true,
            song: sanitize.songs([song])[0]
          }
          dispatch(updateQueue(newQueue))
          return
        }
      }

      await TrackPlayer.add(sanitize.songs([song]))
      await TrackPlayer.skipToNext()
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    if (searchQuery.q.length <= 2) {
      return
    }
    updateInitial(true)
    if (searchQuery.p != 1) updateQuery({ ...searchQuery, p: 1 })
    const controller: AbortController = new AbortController()
    const signal: AbortSignal = controller.signal
    const handler = setTimeout(() => {
      dispatch(
        personalizedDynamic.searchDynamicHandler({
          query: searchQuery.q,
          signal
        })
      )
      dispatch(
        personalizedSearchedSong.getSearchedSongDetails({
          query: { ...searchQuery, p: 1 },
          signal
        })
      )
    }, 1000)
    return () => {
      clearTimeout(handler)
      controller.abort()
    }
  }, [searchQuery.q])

  const activeId = applicationQueue.data.song?.id
  const rows = useMemo(
    () => buildSearchRows(category, searchedData.data?.songs, dynamicData.data),
    [category, searchedData.data, dynamicData.data]
  )

  const handleLoadMore = () => {
    if (category !== "top" && category !== "songs") return
    if (isFetchingMore || searchedData.isLoading) return
    updateFetchingMore(true)
    const nextQuery = {
      ...searchQuery,
      p: searchQuery.p + 1
    }

    dispatch(
      searchSongPagination.getSearchedSongDetails({ query: nextQuery })
    ).finally(() => {
      updateQuery(nextQuery)
      updateFetchingMore(false)
    })
  }
  useEffect(() => {
    if (searchedData.data?.songs?.length && isInitialSearch) {
      flatListRef.current?.scrollToOffset({ animated: true, offset: 0 })
      updateInitial(false)
    }
  }, [searchedData.data])
  return (
    <View className="w-full h-screen flex items-center mb-20">
      <Input updateQuery={updateQuery} searchQuery={searchQuery} />
      <Category
        categoryData={dynamicData.data}
        selected={category}
        onSelect={updateCategory}
      />
      <Show isVisible={searchedData.isLoading}>
        <View
          style={{ backgroundColor: theme.background }}
          className="w-full h-screen flex items-center justify-center"
        >
          <Bounce size={140} color={theme.accent} />
        </View>
      </Show>
      <Show isVisible={!searchedData.isLoading}>
        <View className="w-full h-full ">
          <FlatList
            refreshControl={
              <RefreshControl refreshing={searchedData.isMoreLoading} />
            }
            ref={flatListRef}
            data={rows}
            keyExtractor={(item, index) => `${item.id}-${index}`}
            initialNumToRender={3}
            onScrollBeginDrag={Keyboard.dismiss}
            keyboardShouldPersistTaps="handled"
            maxToRenderPerBatch={9}
            contentContainerStyle={{ paddingTop: 10 }}
            removeClippedSubviews={true}
            windowSize={10}
            // ListFooterComponent={() => {
            //   return (
            //     <Show isVisible={searchedData.data != null && searchedData.data.songs.length>4}>
            //       <View className="w-full h-20 flex items-center justify-center mb-20">
            //         <Text className="text-white">Loading </Text>
            //       </View>
            //     </Show>
            //   )
            // }}
            onEndReachedThreshold={0.5}
            onEndReached={handleLoadMore}
            renderItem={({ item }) => (
              <SongRow
                title={item.title}
                subtitle={item.subtitle}
                artwork={item.image}
                isActive={item.id === activeId}
                disabled={!item.song}
                onPress={() => item.song && changeQueueState(item.song)}
              />
            )}
          />
        </View>
      </Show>
    </View>
  )
}
export default memo(Search)
