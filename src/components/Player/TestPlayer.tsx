import React from 'react';
import { Button, StyleSheet, View } from 'react-native';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withTiming
} from 'react-native-reanimated';

export default function RandomFlexReanimated() {
    const flex1 = useSharedValue(1);
    const flex2 = useSharedValue(2);

    const animatedStyles1 = useAnimatedStyle(() => ({
        flex: flex1.value,
    }));
    const animatedStyles2 = useAnimatedStyle(() => ({
        flex: flex2.value,
    }));

    const onPress = () => {
        flex1.value = withTiming(Math.floor(Math.random() * 10 + 1));
        flex2.value = withTiming(Math.floor(Math.random() * 10 + 1));
    };

    return (
        <View style={styles.container}>
            <Animated.View style={[styles.box1, animatedStyles1]} />
            <Button title="toggle  flex  values" onPress={onPress} />
            <Animated.View style={[styles.box2, animatedStyles2]} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    box1: {
        backgroundColor: 'red',
    },
    box2: {
        backgroundColor: 'green',
    },
});
