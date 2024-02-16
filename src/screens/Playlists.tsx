import { View, TouchableOpacity, TextInput, TextInputChangeEventData, NativeSyntheticEvent } from 'react-native'
import React, { useState } from 'react'
import { Button, Dialog, Portal, Text } from 'react-native-paper'
import { Icons } from '../constants/Icon'
const Playlists = () => {
  const [isVisible, setVisible] = useState<boolean>(false)
  const [plyts, setPlyst] = useState<string>("")
  const showDialog = () => setVisible(true)
  const hideDialog = () => setVisible(false)
  return (
    <View className='bg-[#181a20] w-full h-screen flex items-center justify-center'>
      <TouchableOpacity onPress={showDialog}>
        <Icons.HomeIcon name='plus' size={35} color={"white"} />
      </TouchableOpacity>
      <Portal>
        <Dialog visible={isVisible} onDismiss={hideDialog} style={{ backgroundColor: "#2D3250" }}>
          <Dialog.Title className='text-white'>Name of Playlist</Dialog.Title>
          <TextInput value={plyts} onChangeText={(e) => setPlyst(e)} className='border-b-2 px-2 caret-white text-white' />
          <Dialog.Actions>
            <Button className='text-white' onPress={hideDialog}>Done</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  )
}
export default Playlists