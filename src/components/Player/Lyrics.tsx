import React, { useState } from 'react';
import { Animated, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const Lyrics = () => {
    const [isFlipped, setIsFlipped] = useState(false);
    const [flipAnim, setFlipANimation] = useState(new Animated.Value(0));
    const flipCard = () => {
        Animated.timing(flipAnim, {
            toValue: isFlipped ? 0 : 180,
            duration: 500,
            useNativeDriver: true,
        }).start(() => {
            setIsFlipped(!isFlipped);
        });
    }
    const frontInterpolate = flipAnim.interpolate({
        inputRange: [0, 180],
        outputRange: ['0deg', '180deg'],
    })
    const backInterpolate = flipAnim.interpolate({
        inputRange: [0, 180],
        outputRange: ['180deg', '360deg'],
    })
    const frontAnimatedStyle = {
        transform: [{ rotateY: frontInterpolate }],
    }
    const backAnimatedStyle = {
        transform: [{ rotateY: backInterpolate }],
    }
    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={frontAnimatedStyle}
                onPress={flipCard}>
                <Text style={styles.cardText}>Front</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.cardBack, backAnimatedStyle]}
                onPress={flipCard}>
                <Text style={[styles.cardText, styles.cardTextBack]}>Back</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    card: {
        position: "absolute",
        width: 200,
        height: 300,
        backgroundColor: '#AD6A99',
        justifyContent: 'center',
        alignItems: 'center',
        backfaceVisibility: 'hidden',
        top: 100
    },
    cardBack: {

        backgroundColor: '#f9c21d',

    },
    cardText: {
        fontSize: 24,
        color: '#fff',
    },
    cardTextBack: {
        color: '#000',
    },
});

export default Lyrics;
