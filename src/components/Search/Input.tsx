import React, { memo } from "react"
import { Keyboard } from "react-native"
import { Searchbar } from "react-native-paper"
import { useMd3Colors } from "../../hooks/useMd3"
import { SearchedSongQueryParams } from "../../screens/Search"

interface InputComponentProps {
  updateQuery: (prev: SearchedSongQueryParams) => void
  searchQuery: SearchedSongQueryParams
}

const Input: React.FC<InputComponentProps> = ({ updateQuery, searchQuery }) => {
  const md3 = useMd3Colors()
  return (
    <Searchbar
      placeholder="Search songs, artists, albums"
      value={searchQuery.q}
      onChangeText={(text) => updateQuery({ ...searchQuery, q: text })}
      onClearIconPress={() => updateQuery({ ...searchQuery, q: "" })}
      onSubmitEditing={() => Keyboard.dismiss()}
      returnKeyType="search"
      elevation={0}
      style={{
        marginHorizontal: 16,
        marginTop: 8,
        borderRadius: 28,
        backgroundColor: md3.surfaceVariant
      }}
      inputStyle={{ color: md3.onSurface, minHeight: 0 }}
      placeholderTextColor={md3.onSurfaceVariant}
      iconColor={md3.onSurfaceVariant}
    />
  )
}

export default memo(Input)
