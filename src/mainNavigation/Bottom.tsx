import React from 'react'
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { View } from 'react-native'
import { bottomTab } from '../data/data'
const Tab = createBottomTabNavigator()
const BottomNavigation = () => {
  return (
    <Tab.Navigator screenOptions={{ tabBarShowLabel: false, tabBarActiveTintColor: "white", tabBarInactiveTintColor: "#ff8216", tabBarStyle: { backgroundColor: "#181a20", height: 55 } }}   >
      {bottomTab.map((cTab, index) => {
        return (
          <Tab.Screen name={cTab.name} component={cTab.component} options={{
            headerShown: false, tabBarIcon: ({ color, focused }) => {
              return (
                <>
                  {
                    focused ?
                      <View className='bg-[#ff8216] h-[80%] w-full flex items-center justify-center rounded-md duration-500'>
                        <cTab.Active name={cTab.activeName} color={color} size={cTab.activeSize} />
                      </View> :
                      <cTab.Inactive name={cTab.inactiveName} size={cTab.inactiveSize} color={color} />
                  }
                </>
              )
            }
          }} key={index} />
        )
      })}
    </Tab.Navigator >
  )
}
export default BottomNavigation