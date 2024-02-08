import { TabItems } from '../constants/naviG';
import { ItemTypes } from '../Types/Types';
import { createMaterialBottomTabNavigator } from 'react-native-paper/react-navigation';
const Tab = createMaterialBottomTabNavigator();
const BottomNavigations = () => {
  return (
    <Tab.Navigator
      activeColor="#F90716"
      inactiveColor="#ff8216"
      barStyle={{ backgroundColor: "#0c0c0c" }}
      backBehavior={"history"}
      shifting={true}
    >
      {TabItems.map((item: ItemTypes) => {
        return (
          <Tab.Screen name={item.name} component={item.component} key={item.name}
            options={{
              tabBarIcon: ({ color }) => (
                <item.Active name={item.activeName} color={color} size={26} />
              ),
            }}
          />
        )
      })}
    </Tab.Navigator>
  )
}

export default BottomNavigations