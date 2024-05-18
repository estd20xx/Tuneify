import { View, Image as Img } from 'react-native'
import React from 'react'
import notFoundImage from "../assets/images/not-found.png"
const notFound = Img.resolveAssetSource(notFoundImage).uri
import Image from "react-native-fast-image"
const NotFound = () => {
    return (
        <View className=" h-1/2 w-full flex items-center p-20 ">
            <Image
                source={{
                    uri: notFound,
                    headers: { Authorization: "not found" },
                    priority: Image.priority.high,
                    cache: Image.cacheControl.immutable,
                }}
                className="h-full w-full"
            />
        </View>
    )
}
export default NotFound