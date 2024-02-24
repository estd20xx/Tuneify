import React, {useEffect} from 'react'
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs'
import {tabBar} from '../constants/naviG'
import {component} from '../constants/screens'
import {Platform, StatusBar} from 'react-native'
const Tab = createMaterialTopTabNavigator()
const TabBar = () => {
  useEffect(() => {
    if (Platform.OS === 'android') {
      StatusBar.setBackgroundColor('#181a20')
    }
  }, [])
  return (
    <>
      {/* <component.CHeader /> */}
      <Tab.Navigator
        screenOptions={{
          tabBarScrollEnabled: true,
          tabBarActiveTintColor: '#ff8216',
          tabBarInactiveTintColor: '#a1a0a3',
          tabBarIndicatorStyle: {
            backgroundColor: '#ff8216',
            height: 4,
            marginBottom: -2.2,
            borderRadius: 50,
          },
          tabBarStyle: {
            backgroundColor: '#181a20',
            zIndex: 1,
            borderBottomWidth: 1,
            borderBottomColor: '#a1a0a3',
          },
          tabBarItemStyle: {
            width: 90,
          },
          tabBarLabelStyle: {
            fontSize: 11,
            marginLeft: -10,
            fontWeight: '700',
          },
        }}>
        {tabBar.map(bar => {
          return (
            <Tab.Screen
              name={bar.name}
              component={bar.component}
              key={bar.name}
            />
          )
        })}
      </Tab.Navigator>
    </>
  )
}
export default TabBar
