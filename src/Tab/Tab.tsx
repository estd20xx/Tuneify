import { View, Text } from 'react-native'
import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Suggested from '../screens/Home/Suggested';
import Songs from '../screens/Home/Songs';
import Artists from '../screens/Home/Artists';
import Albums from '../screens/Home/Albums';
import Folders from '../screens/Home/Folders';
const Tab = createMaterialTopTabNavigator();
const TabBar = () => {
    return (
        <Tab.Navigator screenOptions={{
            tabBarScrollEnabled: true,
            tabBarActiveTintColor: "#ff8216",
            tabBarInactiveTintColor: "#a1a0a3",
            tabBarIndicatorStyle: {
                backgroundColor: "#ff8216",
                height: 4,
            },
            tabBarStyle: {
                backgroundColor: "#181a20",
                zIndex: 1
            },
            tabBarItemStyle: {
                width: 90,
                zIndex: 999
            },
            tabBarLabelStyle: {
                fontSize: 11,
                marginLeft: -10
            }
        }}>
            <Tab.Screen name="Suggested" component={Suggested} />
            <Tab.Screen name="Songs" component={Songs} />
            <Tab.Screen name="Artists" component={Artists} />
            <Tab.Screen name="Albums" component={Albums} />
            <Tab.Screen name="Folders" component={Folders} />
        </Tab.Navigator>
    )
}

export default TabBar