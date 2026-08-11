import {
  NavigationContainer as Container,
  DefaultTheme
} from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { MainNavigationItems } from "../constants/navigation"
import { useTheme } from "../hooks/useTheme"
const Stack = createNativeStackNavigator()
const MainNavigation = () => {
  const appTheme = useTheme()
  const theme = {
    ...DefaultTheme,
    colors: { ...DefaultTheme.colors, background: appTheme.background }
  }
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
