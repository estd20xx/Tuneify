import React from "react"
import { Pressable, TextInput, View } from "react-native"
import { Icons } from "../../constants/Icon"
import { SearchedSongQueryParams } from "../../screens/Search"
interface InputComponentProps {
  setSearchQuery: (update: (prev: SearchedSongQueryParams) => SearchedSongQueryParams) => void
  handleSearch: (state: SearchedSongQueryParams) => void
  searchQuery: SearchedSongQueryParams
}
const Input: React.FC<InputComponentProps> = ({ setSearchQuery, handleSearch, searchQuery }) => {
  return (
    <View className=" h-11 w-[95%] rounded-md overflow-hidden  flex-row bg-slate-700 ">
      <TextInput
        className="w-[88%] text-white pl-3"
        placeholder="Search"
        placeholderTextColor={"white"}
        value={searchQuery.q}
        keyboardType="name-phone-pad"
        onChangeText={(e) => setSearchQuery((prev: SearchedSongQueryParams) => ({ ...prev, q: e }))}
        returnKeyType="search"
        returnKeyLabel="search"
        onSubmitEditing={() => handleSearch(searchQuery)}
      />
      <Pressable className="h-full  w-10 flex items-center justify-center">
        <Icons.PlayIcon
          name="close"
          size={20}
          color={"white"}
          onPress={() => setSearchQuery((prev: SearchedSongQueryParams) => ({ ...prev, q: "" }))}
        />
      </Pressable>
    </View>
  )
}

export default Input
