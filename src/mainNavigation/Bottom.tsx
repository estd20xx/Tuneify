import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TabItems } from '../constants/naviG';
import { ItemTypes } from '../Types/Types';
const Tab = createBottomTabNavigator();
import { component } from '../constants/screens';
const BottomNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          height: 60,
          position: 'absolute',
          backgroundColor: "#1c1e24",
          borderTopWidth: 0
        }
      }}
    >
      {TabItems.map((item: ItemTypes) => {
        return (
          <Tab.Screen key={item.name} name={item.name} component={item.component}
            options={{
              tabBarShowLabel: false,
              tabBarButton: (props) => <component.TabButton {...props} item={item} />
            }}
          />
        )
      })}
    </Tab.Navigator>
  )
}

export default BottomNavigation