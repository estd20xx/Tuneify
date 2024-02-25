import {View, Pressable} from "react-native"
import React from "react"
import {TextInput} from "react-native-paper"
import {Icons} from "../../constants/Icon"
interface InputComponentProps {
  setSearchQuery: (value: string) => void
  handleSearch: () => void
  searchQuery: string
}
const Input: React.FC<InputComponentProps> = ({
  setSearchQuery,
  handleSearch,
  searchQuery,
}) => {
  return (
    <View className=" h-14 w-11/12 rounded-full overflow-hidden  flex-row bg-[#2D3250]">
      <TextInput
        className="bg-[#2D3250] w-[88%] text-white"
        placeholder="Search"
        placeholderTextColor={"white"}
        textColor="white"
        value={searchQuery}
        keyboardType="name-phone-pad"
        onChangeText={e => setSearchQuery(e)}
        returnKeyType="search"
        returnKeyLabel="search"
        onSubmitEditing={handleSearch}
      />
      <Pressable className="h-full  w-10 flex items-center justify-center">
        <Icons.PlayIcon
          name="close"
          size={20}
          color={"white"}
          onPress={() => setSearchQuery("")}
        />
      </Pressable>
    </View>
  )
}

export default Input
