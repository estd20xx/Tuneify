import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
const TestComp = () => {
  return (
    <View>
      <TouchableOpacity className='px-4 py-3 bg-purple-400 mt-5 rounded-lg' >
        <Text className='text-white'>Toggle Drawer</Text>
      </TouchableOpacity>
    </View>
  )
}

export default TestComp