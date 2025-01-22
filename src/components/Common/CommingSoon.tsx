import React from 'react'
import { Image, View } from 'react-native'
import tempImage from "../../assets/images/commingSoon.png"
const localImage = Image.resolveAssetSource(tempImage).uri
const CommingSoon = () => {
    return (
        <View className="w-full h-screen flex items-center mt-20">
            <View className="w-full h-1/2 flex items-center justify-center">
                <Image
                    source={{ uri: localImage }}
                    className="h-full w-full"
                    resizeMode="contain"
                />
            </View>
        </View>
    )
}

export default CommingSoon