import React, { memo } from "react"
import { Text, TouchableOpacity, View } from "react-native"
import { DynamicResponse } from "../../api/interface/Dynamic.interface"
import { useTheme } from "../../hooks/useTheme"

export const SEARCH_CATEGORIES = [
  "top",
  "songs",
  "artists",
  "playlists",
  "albums"
] as const

export type SearchCategory = (typeof SEARCH_CATEGORIES)[number]

type Props = {
  categoryData: Readonly<DynamicResponse | null>
  selected: SearchCategory
  onSelect: (category: SearchCategory) => void
}

const Category: React.FC<Props> = ({ categoryData, selected, onSelect }) => {
  const theme = useTheme()
  return (
    <View className="w-full  flex items-center justify-start flex-row  py-2 pl-2">
      {SEARCH_CATEGORIES.map((current) => {
        const isActive = selected === current
        return (
          <TouchableOpacity
            key={current}
            onPress={() => onSelect(current)}
            style={{
              backgroundColor: isActive ? theme.accent : "transparent",
              borderColor: isActive ? theme.accent : "#4b4b4b"
            }}
            className="py-1 mr-2 items-center justify-center px-4 rounded-xl border-[1px]"
          >
            <Text className="capitalize text-white">{current}</Text>
          </TouchableOpacity>
        )
      })}
    </View>
  )
}
export default memo(Category)
