import {View, Text, FlatList, TouchableOpacity} from 'react-native'
import React, {useCallback} from 'react'
import {ChartsPropsTypes, ChartsTypes} from '../Types/Types'
import Image from 'react-native-fast-image'
const Charts: React.FC<ChartsPropsTypes> = ({data, topic}) => {
  const renderItem = useCallback(
    ({item}: {item: ChartsTypes}) => (
      <TouchableOpacity>
        <View className="  flex items-center justify-center w-36 ml-2">
          <View className=" h-36 w-36  rounded-3xl overflow-hidden">
            <Image
              source={{
                uri: item.image[2].link,
                headers: {Authorization: 'someAuthToken'},
                priority: Image.priority.normal,
                cache: Image.cacheControl.immutable,
              }}
              className="w-full h-full"
            />
          </View>
          <View className=" w-full h-9 flex items-center justify-center">
            <Text className="text-white text-xs tracking-wider font-semibold ">
              {item.title.length > 10
                ? item.title.slice(0, 14) + '..'
                : item.title}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    ),
    [],
  )
  return (
    <View className="w-full h-auto  ">
      <View className="w-full pl-3 h-10 flex items-center flex-row  mb-3">
        <Text className="text-lg text-white font-semib  old tracking-widest">
          {topic}
        </Text>
      </View>
      <FlatList
        horizontal
        data={data}
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.id}
        initialNumToRender={3}
        maxToRenderPerBatch={4}
        removeClippedSubviews={true}
        windowSize={4}
        renderItem={renderItem}
      />
    </View>
  )
}

export default Charts
