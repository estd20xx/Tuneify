import React from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withTiming
} from 'react-native-reanimated'
export default function RandomFlexReanimated() {
    const flex1 = useSharedValue(0.5);
    const flex2 = useSharedValue(0.5);
    const animatedStyles1 = useAnimatedStyle(() => ({
        flex: flex1.value,
    }))
    const animatedStyles2 = useAnimatedStyle(() => ({
        flex: flex2.value,
    }))
    const onPress = () => {
        flex1.value = withTiming(0.4);
        flex2.value = withTiming(0.1);
    }
    return (
        <View className='bg-green-400 h-36 w-full '>
            <Animated.View style={[styles.box1, animatedStyles1]} >
            </Animated.View>
            <TouchableOpacity onPress={onPress} className='absolute top-2'>
                <Text> Toggle</Text>
            </TouchableOpacity>
            <Animated.View style={[styles.box2, animatedStyles2]} />
        </View>
    )
}
const styles = StyleSheet.create({
    container: {

    },
    box1: {
        backgroundColor: 'red',
    },
    box2: {
        backgroundColor: 'green',
    },
})
