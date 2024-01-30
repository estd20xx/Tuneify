import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import AppleMusic from "react-native-vector-icons/FontAwesome6"
import SearchIcon from "react-native-vector-icons/Feather"
const Header = () => {
    return (
        <View className='bg-[#181a20] w-full h-16 flex items-center justify-between flex-row' >
            <View className='h-full w-44 flex items-center flex-row justify-evenly'>
                <AppleMusic name='music' size={30} color={"#ff8216"} />
                <Text className='text-white text-2xl font-extrabold tracking-widest'>Musify</Text>
            </View>
            <View className=' h-full w-20 flex items-center justify-center'>
                <TouchableOpacity>
                    <SearchIcon name='search' size={30} color={"white"} />
                </TouchableOpacity>
            </View>
        </View>
    )
}
export default Header