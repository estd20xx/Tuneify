
import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { tabBar } from '../data/data';
import Header from '../components/Header';
const Tab = createMaterialTopTabNavigator();
const TabBar = () => {
    return (
        <>
            <Header />
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
                {tabBar.map((bar) => {
                    return (
                        <Tab.Screen name={bar.name} component={bar.component} key={bar.name} />
                    )
                })}
            </Tab.Navigator>
        </>
    )
}
export default TabBar