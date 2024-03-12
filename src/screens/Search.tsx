import {FlatList, Text, TouchableOpacity, View} from "react-native"
import React, {useCallback, useState} from "react"
import Input from "../components/Search/Input"
import {TypedSelectorHook} from "../hooks/store.hook"
import {tuneifySongs} from "../store/slices/song.slice"
import {StoreSongTypes} from "../Interfaces/tuneifySlice.interface"
import axios from "axios"
import {useDebounce} from "../hooks/useDebounce"
const Search = () => {
  const {debouncedValue, isloading} = useDebounce("ok", 2)
  const data = TypedSelectorHook(tuneifySongs)
  console.log(data.songs.length)
  const [searchQuery, setSearchQuery] = useState<string>("")
  const handleSearch = async () => {
    try {
      const data = await axios.get("")
      console.log(data.data)
    } catch (error) {
      console.log(error)
    }
  }
  const renderItem = useCallback(
    ({item}: {item: StoreSongTypes}) => (
      <TouchableOpacity className="w-full bg-red-500 h-16  mt-2  flex flex-row items-center">
        <Text>{item.title}</Text>
      </TouchableOpacity>
    ),
    []
  )
  return (
    <View className="w-full h-screen flex items-center ">
      <Input
        setSearchQuery={setSearchQuery}
        handleSearch={handleSearch}
        searchQuery={searchQuery}
      />
      {/* <View className="w-full h-full ">
        <FlatList
          data={data.songs}
          keyExtractor={item => item.url}
          initialNumToRender={3}
          showsVerticalScrollIndicator={false}
          maxToRenderPerBatch={4}
          contentContainerStyle={{ paddingTop: 10 }}
          removeClippedSubviews={true}
          windowSize={1}
          renderItem={renderItem}
        />
      </View> */}
    </View>
  )
}
export default Search
