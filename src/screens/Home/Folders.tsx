import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { musifyData } from '../../store/Musify'
import { TypedSelectorHook } from '../../hooks/store.hook'
const Folders = () => {
  const localFile = TypedSelectorHook(musifyData)
  return (
    <View className='bg-[#181a20] w-full h-auto'>
      <FlatList
        data={localFile.localFile}
        keyExtractor={(item) => item.url}
        initialNumToRender={3}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity className='w-full h-16  mt-2 flex flex-row items-center'>
              <View className='h-16 w-20  pl-2'>
                <Image source={require("../../assets/images/new.png")} className='h-16 w-16 rounded-md' />
              </View>
              <View className='w-4/5'>
                <Text style={{ fontSize: 14, color: "white" }}>{item.title}</Text>
                <Text style={{ fontSize: 10, color: "#d0d0d1" }}>{item.artist}</Text>
              </View>
            </TouchableOpacity>
          )
        }}
      />
    </View>
  )
}
export default Folders