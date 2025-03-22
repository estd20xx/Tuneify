import React, { memo } from "react"
import { Text, TouchableOpacity, View } from "react-native"
import { DynamicResponse } from "../../api/interface/Dynamic.interface"
import { useSearchCategory } from "../../hooks/useSearchCategory"
type Props = {
  categoryData: Readonly<DynamicResponse | null>
}
const Category: React.FC<Props> = ({ categoryData }) => {
  const [category, updateCategory] = useSearchCategory()
  return (
    <View className="w-full  flex items-center justify-start flex-row  py-2 pl-2">
      {Object.keys(categoryData || {}).map((current, index) => {
        return (
          <TouchableOpacity
            key={current}
            onPress={() => updateCategory(index)}
            className={`py-1 mr-2 items-center justify-center px-4 rounded-xl border-[1px] ${
              category == index && "bg-green-600"
            } border-gray-700`}
          >
            <Text className={`capitalize text-white`}>{current}</Text>
          </TouchableOpacity>
        )
      })}
    </View>
  )
}
export default memo(Category)
