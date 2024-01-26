import { View, Text, StatusBar } from 'react-native'
import React from 'react'

const App = () => {
  return (
    <>
      <StatusBar backgroundColor={"rgb(255,255,255)"} barStyle={"dark-content"} />
      <View className='w-full h-screen bg-green-800'>
        <Text>App</Text>
      </View>
    </>
  )
}

export default App