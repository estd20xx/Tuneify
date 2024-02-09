import { View, Text, FlatList, Image } from 'react-native'
import React from 'react'
import { PlaylistDataProps } from '../Types/Types'
const Playlist: React.FC<PlaylistDataProps> = ({ data, topic }) => {
    return (
        <View className='w-full h-auto    '>
            <View className='w-full pl-3 h-10 flex items-center flex-row  mb-3'>
                <Text className='text-lg text-white font-semibold tracking-widest'>{topic}</Text>
            </View>
            <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={data}
                keyExtractor={(item) => item.id}
                initialNumToRender={3}
                renderItem={({ item }) => {
                    return (
                        <View className=' h-full flex items-center juc w-36 ml-2'>
                            <View className=' h-36 w-36  rounded-full overflow-hidden'>
                                <Image source={{ uri: item.image[2].link }} className='w-full h-full' />
                            </View>
                            <View className=' w-full h-9 flex items-center justify-center'>
                                <Text className='text-white text-xs tracking-wider font-semibold '>
                                    {item.title.length > 10 ? item.title.slice(0, 11) + ".." : item.title}
                                </Text>
                            </View>
                        </View>
                    )
                }}
            />
        </View>
    )
}

export default Playlist