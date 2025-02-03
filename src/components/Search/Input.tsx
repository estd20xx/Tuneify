import React, { memo } from "react"
import { Keyboard, Pressable, TextInput, View } from "react-native"
import { Icons } from "../../constants/Icon"
import { SearchedSongQueryParams } from "../../screens/Search"
import Show from "../Common/Show"
interface InputComponentProps {
  updateQuery: (prev: SearchedSongQueryParams) => void
  searchQuery: SearchedSongQueryParams
}
const Input: React.FC<InputComponentProps> = ({ updateQuery, searchQuery }) => {
  return (
    <View className=" h-11 w-[95%] rounded-md overflow-hidden  flex-row bg-[#2f271b] ">
      <TextInput
        className="w-[88%] text-white pl-3"
        placeholder="Search"
        placeholderTextColor={"white"}
        value={searchQuery.q}
        keyboardType="name-phone-pad"
        onChangeText={(e) => updateQuery({ ...searchQuery, q: e })}
        returnKeyType="search"
        returnKeyLabel="search"
        onSubmitEditing={() => Keyboard.dismiss()}
      />
      <Show isVisible={searchQuery.q.length > 2}>
        <Pressable className="h-full  w-10 flex items-center justify-center">
          <Icons.PlayIcon
            name="close"
            size={20}
            color={"white"}
            onPress={() => updateQuery({ ...searchQuery, q: "" })}
          />
        </Pressable>
      </Show>
    </View>
  )
}

export default memo(Input)
