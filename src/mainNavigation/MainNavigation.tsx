import React from 'react'
import { NavigationContainer as Container } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { MainNavigationItems } from '../data/data'
const Stack = createNativeStackNavigator()
const MainNavigation = () => {
  return (
    <Container>
      <Stack.Navigator >
        {MainNavigationItems.map((cn) => {
          return (
            <Stack.Screen name={cn.name} component={cn.component} options={{ headerShown: false }} key={cn.name} />
          )
        })}
      </Stack.Navigator>
    </Container>
  )
}
export default MainNavigation