import React, { ElementRef, memo, useEffect, useRef } from "react"
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import * as Animatable from "react-native-animatable"
import { DanimationValue, IanimationValue } from "../constants/animation"
const TabButton = (props: any) => {
  const { item, onPress, accessibilityState } = props
  const focused = accessibilityState.selected
  const viewRef = useRef<ElementRef<"view"> | any>(null)
  const textViewRef = useRef<ElementRef<"view"> | any>(null)
  const iconRef = useRef<ElementRef<"view"> | any>(null)
  useEffect(() => {
    if (focused) {
      viewRef.current?.animate(IanimationValue)
      textViewRef.current?.animate(IanimationValue)
      iconRef.current?.animate(IanimationValue)
    } else {
      viewRef.current?.animate(DanimationValue)
      textViewRef.current?.animate(DanimationValue)
    }
  }, [focused])

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={1}
      style={[{ flex: focused ? 1 : 0.65 }]}
      className="justify-center items-center"
    >
      <View>
        <Animatable.View
          ref={viewRef}
          style={[
            StyleSheet.absoluteFillObject,
            { backgroundColor: item.active, borderRadius: 16 },
          ]}
        />
        <View
          style={[
            {
              flexDirection: "row",
              alignItems: "center",
              padding: 8,
              borderRadius: 16,
            },
            { backgroundColor: "rgba(28,28,28,.7)" },
          ]}
        >
          <Animatable.View ref={iconRef} className="">
            {focused ? (
              <item.Active
                name={item.activeName}
                size={item.activeSize}
                color={focused ? "#fff" : "orange"}
              />
            ) : (
              <item.Inactive
                name={item.inactiveName}
                size={item.inactiveSize}
                color={focused ? "#fff" : item.active}
              />
            )}
          </Animatable.View>
          <Animatable.View ref={textViewRef}>
            {focused && (
              <Text
                style={{
                  color: "white",
                  paddingHorizontal: 8,
                }}
              >
                {item.name}
              </Text>
            )}
          </Animatable.View>
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default memo(TabButton)
