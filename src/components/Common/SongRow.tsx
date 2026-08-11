import React, { memo } from "react"
import { Image, View } from "react-native"
import { IconButton, List } from "react-native-paper"
import { useMd3Colors } from "../../hooks/useMd3"

type Props = {
  title: string
  subtitle: string
  artwork: string
  isActive?: boolean
  onPress?: () => void
  onMenuPress?: () => void
  disabled?: boolean
}

const SongRow: React.FC<Props> = ({
  title,
  subtitle,
  artwork,
  isActive = false,
  onPress,
  onMenuPress,
  disabled = false
}) => {
  const md3 = useMd3Colors()
  return (
    <List.Item
      title={title}
      description={subtitle}
      disabled={disabled}
      onPress={onPress}
      titleNumberOfLines={1}
      descriptionNumberOfLines={1}
      titleStyle={{
        color: isActive ? md3.primary : md3.onSurface,
        fontSize: 16
      }}
      descriptionStyle={{ color: md3.onSurfaceVariant, fontSize: 13 }}
      style={{
        paddingLeft: 12,
        paddingRight: 4,
        backgroundColor: isActive ? md3.secondaryContainer : "transparent"
      }}
      left={() => (
        <View
          style={{
            width: 52,
            height: 52,
            borderRadius: 8,
            overflow: "hidden",
            backgroundColor: md3.surfaceVariant,
            alignSelf: "center"
          }}
        >
          <Image
            source={{ uri: artwork }}
            style={{ width: "100%", height: "100%" }}
            resizeMode="cover"
          />
        </View>
      )}
      right={() =>
        onMenuPress ? (
          <IconButton
            icon="dots-vertical"
            size={20}
            iconColor={md3.onSurfaceVariant}
            onPress={onMenuPress}
            accessibilityLabel="More options"
          />
        ) : null
      }
    />
  )
}

export default memo(SongRow)
