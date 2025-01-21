import React from 'react'
import { TouchableOpacity, View } from 'react-native'
import { Icons } from '../../constants/Icon'

interface Props {
    setIsVisible: (isVisible: boolean) => void
    flipCard: () => void
}

const PlayerHeader: React.FC<Props> = ({ setIsVisible, flipCard }) => {
    return (
        <View className="h-10 w-full flex items-center justify-between flex-row">
            <TouchableOpacity onPress={() => setIsVisible(false)}>
                <Icons.KeyboardDown name="keyboard-arrow-down" size={35} color={"white"} />
            </TouchableOpacity>
            <View className="flex flex-row h-full items-center justify-center">
                <TouchableOpacity onPress={() => flipCard()}>
                    <Icons.MoreIcon name="lyrics" size={20} color={"white"} className="mr-4" />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Icons.MoreIcon name="more-vert" size={25} color={"white"} />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default PlayerHeader