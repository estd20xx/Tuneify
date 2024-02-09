import React from 'react';
import { Dimensions, Image, StyleSheet, Text, View } from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';
import Animated, {
    Extrapolation,
    interpolate,
    useAnimatedGestureHandler,
    useAnimatedStyle,
    useDerivedValue,
    useSharedValue,
    withSpring
} from 'react-native-reanimated';

const { width } = Dimensions.get('screen');

const minHeight = 70;
const maxHeight = width / 2;

const minWidth = width / 3;
const maxWidth = width;

export default function YoutubeVideoReanimated() {
    const containerHeight = useSharedValue(0);
    const translateY = useSharedValue(0);

    const movableHeight = useDerivedValue(() => {
        return containerHeight.value - minHeight;
    });

    // move video container
    const eventHandler = useAnimatedGestureHandler({
        onStart: (event, ctx) => {
            ctx.startY = translateY.value;
        },
        onActive: (event, ctx: any) => {
            let newValue = event.translationY + ctx.startY;
            if (newValue > movableHeight.value) newValue = movableHeight.value;
            if (newValue < 0) newValue = 0;
            translateY.value = newValue;
        },
        onEnd: (evt, ctx) => {
            if (evt.velocityY < -20 && translateY.value > 0)
                translateY.value = withSpring(0, springConfig(evt.velocityY));
            else if (evt.velocityY > 20 && translateY.value < movableHeight.value)
                translateY.value = withSpring(
                    movableHeight.value,
                    springConfig(evt.velocityY),
                );
            else if (translateY.value < movableHeight.value / 2)
                translateY.value = withSpring(0, springConfig(evt.velocityY));
            else
                translateY.value = withSpring(
                    movableHeight.value,
                    springConfig(evt.velocityY),
                );
        },
    });

    // style to set height/width of video container
    const animatedSize = useAnimatedStyle(() => {
        return {
            height: interpolate(
                translateY.value,
                [0, movableHeight.value - minHeight, movableHeight.value],
                [maxHeight, minHeight * 2, minHeight],
                {
                    extrapolateLeft: Extrapolation.CLAMP,
                    extrapolateRight: Extrapolation.CLAMP,
                },
            ),
            width: interpolate(
                translateY.value,
                [movableHeight.value - minHeight, movableHeight.value],
                [maxWidth, minWidth],
                {
                    extrapolateLeft: Extrapolation.CLAMP,
                    extrapolateRight: Extrapolation.CLAMP,
                },
            ),
        };
    });

    // style to move the entire video container
    const animatedTransform = useAnimatedStyle(() => {
        return {
            transform: [{ translateY: translateY.value }],
        };
    });

    return (
        <View
            style={styles.container}
            onLayout={e => (containerHeight.value = e.nativeEvent.layout.height)}>
            {/* <ScrollView /> //set your contents in the main view */}
            <Animated.View style={[styles.subContainer, animatedTransform]}>
                <PanGestureHandler onGestureEvent={eventHandler}>
                    <Animated.View style={styles.viedeoContainer}>
                        <Animated.View style={[styles.viedeo, animatedSize]}>
                            <Image
                                style={styles.img}
                                resizeMode="cover"
                                source={{
                                    uri: 'https://miro.medium.com/max/1024/1*v_QLdhh1TMmuxGXw-h_IDw.png',
                                }}
                            />
                        </Animated.View>
                    </Animated.View>
                </PanGestureHandler>
                <Text style={styles.txt}>Swipe down</Text>
                {/* <ScrollView /> //set your contents below video */}

            </Animated.View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#999',
        overflow: 'hidden',
    },
    subContainer: {
        flex: 1,
        backgroundColor: '#fff',
    },
    viedeoContainer: {
        width: '100%',
        backgroundColor: '#ccc',
    },
    viedeo: {
        backgroundColor: '#000',
    },
    img: {
        height: '100%',
        width: '100%',
    },
    txt: {
        textAlign: 'center',
        margin: 20,
    },
});

const springConfig = (velocity: any) => {
    'worklet';
    return {
        stiffness: 1000,
        damping: 500,
        mass: 3,
        overshootClamping: true,
        restDisplacementThreshold: 0.01,
        restSpeedThreshold: 0.01,
        velocity,
    };
};
