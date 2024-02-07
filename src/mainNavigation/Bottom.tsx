import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, { ElementRef, useEffect, useRef } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import * as Animatable from 'react-native-animatable';
import { TabArr } from '../data/Icon';
const Tab = createBottomTabNavigator();
const IanimationValue = {
  0: { scale: 0 },
  0.3: { scale: .3 },
  0.5: { scale: .5 },
  0.8: { scale: .8 },
  1: { scale: 1 },
}
const DanimationValue = {
  0: { scale: 1 },
  0.3: { scale: .8 },
  0.5: { scale: .5 },
  0.8: { scale: .3 },
  1: { scale: 0 },
}
const TabButton = (props: any) => {
  const { item, onPress, accessibilityState } = props;
  const focused = accessibilityState.selected;
  const viewRef = useRef<ElementRef<"view"> | any>(null);
  const textViewRef = useRef<ElementRef<"view"> | any>(null);
  const iconRef = useRef<ElementRef<"view"> | any>(null)
  useEffect(() => {
    if (focused) {
      viewRef.current?.animate(IanimationValue);
      textViewRef.current?.animate(IanimationValue);
      iconRef.current?.animate(IanimationValue);
    } else {
      viewRef.current?.animate(DanimationValue);
      textViewRef.current?.animate(DanimationValue);
    }
  }, [focused])

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={1}
      style={[styles.container, { flex: focused ? 1 : 0.65 }]}>
      <View>
        <Animatable.View
          ref={viewRef}
          style={[StyleSheet.absoluteFillObject, { backgroundColor: item.active, borderRadius: 16 }]} />
        <View style={[styles.btn, {}]}>
          <Animatable.View ref={iconRef} className=''>
            {focused ?
              <item.Active name={item.activeName} size={item.activeSize} color={focused ? "#fff" : "orange"} /> :
              <item.Inactive name={item.inactiveName} size={item.inactiveSize} color={focused ? "#fff" : "orange"} />
            }
          </Animatable.View>
          <Animatable.View
            ref={textViewRef}>
            {focused && <Text style={{
              color: "white", paddingHorizontal: 8
            }}>{item.name}</Text>}
          </Animatable.View>
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default function AnimTab3() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          height: 60,
          position: 'absolute',
          bottom: 16,
          right: 16,
          left: 16,
          borderRadius: 16,
          backgroundColor: "#181a20"
        }
      }}
    >
      {TabArr.map((item, index) => {
        return (
          <Tab.Screen key={index} name={item.name} component={item.component}
            options={{
              tabBarShowLabel: false,
              tabBarButton: (props) => <TabButton {...props} item={item} />
            }}
          />
        )
      })}
    </Tab.Navigator>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    borderRadius: 16,
  }
})