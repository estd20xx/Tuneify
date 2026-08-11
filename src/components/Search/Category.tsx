import React, { memo } from "react"
import { ScrollView } from "react-native"
import { Chip } from "react-native-paper"
import { DynamicResponse } from "../../api/interface/Dynamic.interface"
import { useMd3Colors } from "../../hooks/useMd3"

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

const Category: React.FC<Props> = ({ selected, onSelect }) => {
  const md3 = useMd3Colors()
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{
        paddingHorizontal: 16,
        paddingVertical: 12,
        gap: 8
      }}
    >
      {SEARCH_CATEGORIES.map((current) => {
        const isActive = selected === current
        return (
          <Chip
            key={current}
            selected={isActive}
            showSelectedCheck={isActive}
            onPress={() => onSelect(current)}
            style={{
              backgroundColor: isActive
                ? md3.secondaryContainer
                : "transparent",
              borderColor: md3.outline
            }}
            textStyle={{
              color: isActive ? md3.onSecondaryContainer : md3.onSurfaceVariant,
              textTransform: "capitalize"
            }}
            mode={isActive ? "flat" : "outlined"}
          >
            {current}
          </Chip>
        )
      })}
    </ScrollView>
  )
}
export default memo(Category)
