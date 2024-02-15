import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Icons } from '../constants/Icon'
const Header = () => {
    return (
        <View className='bg-[#181a20] w-full h-16 flex items-center justify-between flex-row' >
            <View className='h-full w-44 flex items-center flex-row justify-evenly'>
                <Icons.AppleMusic name='music' size={30} color={"#ff8216"} />
                <Text className='text-white text-2xl font-extrabold tracking-widest'>TeroGula</Text>
            </View>
            <View className=' h-full w-20 flex items-center justify-center'>
                <TouchableOpacity>
                    <Icons.SearchIcon name='search' size={30} color={"white"} />
                </TouchableOpacity>
            </View>
        </View>
    )
}
export default Header