import {
  NavigationContainer as Container,
  DefaultTheme
} from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { MainNavigationItems } from "../constants/navigation"
const Stack = createNativeStackNavigator()
const theme = DefaultTheme
theme.colors.background = "#1b1002"
const MainNavigation = () => {
  return (
    <Container theme={theme}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {MainNavigationItems.map((cn) => {
          return (
            <Stack.Screen
              name={cn.name}
              component={cn.component}
              options={{
                headerShown: false,
                animation: "fade_from_bottom",
                presentation: "fullScreenModal"
              }}
              key={cn.name}
            />
          )
        })}
      </Stack.Navigator>
    </Container>
  )
}
export default MainNavigation
