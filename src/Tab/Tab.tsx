import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Suggested from '../screens/Home/Suggested';
import Songs from '../screens/Home/Songs';
import Artists from '../screens/Home/Artists';
import Albums from '../screens/Home/Albums';
import Folders from '../screens/Home/Folders';
import AppleMusic from "react-native-vector-icons/FontAwesome6"
import SearchIcon from "react-native-vector-icons/Feather"
import * as Animatable from 'react-native-animatable';
const Tab = createMaterialTopTabNavigator();
const TabBar = () => {
    return (
        <>
            <View className='bg-[#181a20] w-full h-16 flex items-center justify-between flex-row' >
                <View className='h-full w-44 flex items-center flex-row justify-evenly'>
                    <AppleMusic name='music' size={30} color={"#ff8216"} />
                    <Animatable.Text animation="pulse" iterationCount={"infinite"} className='text-white text-2xl font-extrabold tracking-widest'>Musify</Animatable.Text>
                </View>
                <View className=' h-full w-20 flex items-center justify-center'>
                    <TouchableOpacity>
                        <SearchIcon name='search' size={30} color={"white"} />
                    </TouchableOpacity>
                </View>
            </View>
            <Tab.Navigator screenOptions={{
                tabBarScrollEnabled: true,
                tabBarActiveTintColor: "#ff8216",
                tabBarInactiveTintColor: "#a1a0a3",
                tabBarIndicatorStyle: {
                    backgroundColor: "#ff8216",
                    height: 4,
                    marginBottom: -2.2,
                    borderRadius: 50
                },
                tabBarStyle: {
                    backgroundColor: "#181a20",
                    zIndex: 1,
                    borderBottomWidth: 1,
                    borderBottomColor: "#a1a0a3"
                },
                tabBarItemStyle: {
                    width: 90,

                },
                tabBarLabelStyle: {
                    fontSize: 11,
                    marginLeft: -10,
                    fontWeight: "700"
                }
            }}>
                <Tab.Screen name="Suggested" component={Suggested} />
                <Tab.Screen name="Songs" component={Songs} />
                <Tab.Screen name="Artists" component={Artists} />
                <Tab.Screen name="Albums" component={Albums} />
                <Tab.Screen name="Folders" component={Folders} />
            </Tab.Navigator>
        </>
    )
}
export default TabBar