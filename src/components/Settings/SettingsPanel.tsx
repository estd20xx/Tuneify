import React, { memo } from "react"
import { ScrollView, View } from "react-native"
import { Button, Divider, Modal, Portal, Text } from "react-native-paper"
import { InfoSection } from "../../constants/settingsContent"
import { useMd3Colors } from "../../hooks/useMd3"

type Props = {
  isVisible: boolean
  title: string
  sections: InfoSection[]
  onClose: () => void
  children?: React.ReactNode
}

const SettingsPanel: React.FC<Props> = ({
  isVisible,
  title,
  sections,
  onClose,
  children
}) => {
  const md3 = useMd3Colors()
  return (
    <Portal>
      <Modal
        visible={isVisible}
        onDismiss={onClose}
        contentContainerStyle={{
          backgroundColor: md3.elevation.level3,
          marginHorizontal: 24,
          borderRadius: 28,
          paddingTop: 24,
          paddingHorizontal: 24,
          paddingBottom: 16,
          maxHeight: "80%"
        }}
      >
        <Text variant="headlineSmall" style={{ color: md3.onSurface }}>
          {title}
        </Text>
        <Divider style={{ marginTop: 16, backgroundColor: md3.outlineVariant }} />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{ paddingVertical: 16 }}>
            {sections.map((section) => (
              <View key={section.heading} style={{ marginBottom: 20 }}>
                <Text
                  variant="titleMedium"
                  style={{ color: md3.primary, marginBottom: 4 }}
                >
                  {section.heading}
                </Text>
                <Text
                  variant="bodyMedium"
                  style={{ color: md3.onSurfaceVariant, lineHeight: 20 }}
                >
                  {section.body}
                </Text>
              </View>
            ))}
            {children}
          </View>
        </ScrollView>
        <View style={{ alignItems: "flex-end" }}>
          <Button mode="text" onPress={onClose} textColor={md3.primary}>
            Close
          </Button>
        </View>
      </Modal>
    </Portal>
  )
}

export default memo(SettingsPanel)
