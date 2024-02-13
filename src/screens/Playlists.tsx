import { View, Text, PermissionsAndroid, Button } from 'react-native'
import React from 'react'


import { addLocalFiles } from '../store/Musify';
import { Song } from 'react-native-get-music-files/lib/typescript/src/NativeTurboSongs';
const Playlists = () => {
  
  return (
    <View className='bg-[#181a20] w-full h-screen flex items-center justify-center'>
      <Text className='text-white'>Playlists</Text>
    </View>
  )
}

export default Playlists