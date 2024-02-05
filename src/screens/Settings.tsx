import { View, Text, ScrollView, RefreshControl } from 'react-native'
import React, { useCallback, useState } from 'react'

const Settings = () => {
  const [refreshing, seTFe] = useState(false)
  const wait = (timeout: number) => {
    return new Promise(resolve => setTimeout(resolve, timeout))
  }
  const onRefresh = useCallback(async () => {
    seTFe(true)
    wait(1200).then(()=>seTFe(false))
  }, [])
  return (
    <ScrollView refreshControl={
      <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
    }>
      <View className='bg-[#181a20] w-full h-screen flex items-center justify-center'>
        <Text className='text-white'>Settingssdds</Text>
      </View>
    </ScrollView>
  )
}

export default Settings