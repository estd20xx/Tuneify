import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { useDispatch, TypedUseSelectorHook, useSelector } from 'react-redux'
import { RootState } from '../store/store'
import { musifyData } from '../store/Musify'
import { UserFavouritesTypes } from '../Interfaces/musifySlice.interface'
import { Icons } from '../constants/Icon'
const Favourites = () => {
  const dispatch = useDispatch()
  const TypedHook: TypedUseSelectorHook<RootState> = useSelector
  const data = TypedHook(musifyData)
  const [favData, setFavData] = useState<UserFavouritesTypes[]>(data.favouritesData)
  return (
    <View className='w-full h-screen flex items-center justify-center'>
      <ScrollView>
        <View className='w-full h-20  flex flex-row items-center justify-evenly'>
          <TouchableOpacity className='bg-[#ff8216] h-11 w-32 rounded-full flex items-center justify-center flex-row'>
            <Image source={require("../assets/images/suffle.png")} style={{ tintColor: "white", width: 30, height: 30, marginRight: 3 }} />
            <Text className='text-white text-xl' >Suffle</Text>
          </TouchableOpacity>
          <TouchableOpacity className='bg-[#35383f] h-11 w-36 rounded-full flex items-center justify-center flex-row'>
            <Icons.PlayIcon name='play' color={"white"} size={20} className='mr-1' />
            <Text className='text-white text-xl' >Play</Text>
          </TouchableOpacity>
        </View>
        {favData.map((item) => {
          return (
            <TouchableOpacity
              style={
                {
                  width: '100%',
                  height: 60,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingLeft: 2,
                  paddingRight: 5,
                  marginTop: 10,
                }
              }
              key={item.id}
            >
              <View className='w-4/5  h-full pl-3 flex flex-row '>
                <View className='w-full rounded-lg overflow-hidden '>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Image
                      source={{ uri: item.artwork }}
                      style={{ width: 60, height: 60, borderRadius: 5 }}
                    />
                    <View style={{ marginLeft: 10 }}>
                      <Text style={{ color: 'white', fontSize: 14 }}>{item.title}</Text>
                      <Text style={{ color: '#d0d0d1', fontSize: 10, marginTop: 1 }}>
                        {item.artist}
                      </Text>
                    </View>

                  </View>
                </View>
              </View>
              <View className=' w-1/5 h-full flex items-center justify-end flex-row pr-3'>
                <Icons.MoreIcon name='more-vert' size={25} color={"#bababa"} />
              </View>
            </TouchableOpacity>
          )
        })}
      </ScrollView>
    </View>
  )
}
export default Favourites