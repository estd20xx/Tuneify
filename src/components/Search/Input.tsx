import React from "react"
import { Pressable, TextInput, View } from "react-native"
import { Icons } from "../../constants/Icon"
interface InputComponentProps {
  setSearchQuery: (value: string) => void
  handleSearch: () => void
  searchQuery: string
}
const Input: React.FC<InputComponentProps> = ({ setSearchQuery, handleSearch, searchQuery }) => {
  return (
    <View className=" h-11 w-[95%] rounded-md overflow-hidden  flex-row bg-slate-700 ">
      <TextInput
        className="w-[88%] text-white pl-3"
        placeholder="Search"
        placeholderTextColor={"white"}
        value={searchQuery}
        keyboardType="name-phone-pad"
        onChangeText={(e) => setSearchQuery(e)}
        returnKeyType="search"
        returnKeyLabel="search"
        onSubmitEditing={handleSearch}
      />
      <Pressable className="h-full  w-10 flex items-center justify-center">
        <Icons.PlayIcon name="close" size={20} color={"white"} onPress={() => setSearchQuery("")} />
      </Pressable>
    </View>
  )
}

export default Input
