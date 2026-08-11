import { memo, useState } from "react"
import { Alert, BackHandler, ScrollView, Share, View } from "react-native"
import {
  Avatar,
  Divider,
  List,
  RadioButton,
  Switch,
  Text
} from "react-native-paper"
import SettingsPanel from "../../components/Settings/SettingsPanel"
import { settingsData } from "../../constants/Settings"
import {
  ABOUT_CONTENT,
  APP_VERSION,
  CHANGELOG_CONTENT,
  FAQ_CONTENT,
  InfoSection,
  PRIVACY_CONTENT
} from "../../constants/settingsContent"
import { TypedSelectorHook, useAppDispatch } from "../../hooks/store.hook"
import { useMd3Colors } from "../../hooks/useMd3"
import appNotification from "../../services/appNotification.service"
import { backupService, buildBackup } from "../../services/backup.service"
import SettingService from "../../services/setting.service"
import {
  addUserFavouritesData,
  tuneifyFavourites
} from "../../store/slices/favourite.slice"
import {
  customePlaylist,
  importPlaylist
} from "../../store/slices/offlinePlaylist.slice"
import {
  ACCENTS,
  appSettings,
  changeAccent,
  changeLanguage,
  LANGUAGES,
  toggleHighQuality,
  toggleNotifications
} from "../../store/slices/settings.slice"
import { tuneifyUser } from "../../store/slices/user.slice"

const settingService = new SettingService()

const INFO_PANELS: Record<string, InfoSection[]> = {
  about: ABOUT_CONTENT,
  log: CHANGELOG_CONTENT,
  privacy: PRIVACY_CONTENT,
  faq: FAQ_CONTENT
}

const ICONS: Record<string, string> = {
  general: "tune",
  backup: "cloud-upload-outline",
  notification: "bell-outline",
  language: "translate",
  "accent-color": "palette-outline",
  share: "share-variant-outline",
  log: "history",
  privacy: "shield-lock-outline",
  faq: "help-circle-outline",
  about: "information-outline",
  quit: "logout"
}

const Settings = () => {
  const settingData = TypedSelectorHook(tuneifyUser)
  const dispatch = useAppDispatch()
  const preferences = TypedSelectorHook(appSettings)
  const playlists = TypedSelectorHook(customePlaylist)
  const favourites = TypedSelectorHook(tuneifyFavourites)
  const md3 = useMd3Colors()
  const [panel, setPanel] = useState<string>("")

  const closePanel = () => setPanel("")

  const handleBackup = async () => {
    const ok = await backupService.save(
      buildBackup(playlists.playlist, favourites.favouriteData)
    )
    if (!ok) {
      appNotification.errorMessage("Backup failed", "Could not write the file")
      return
    }
    appNotification.successMessage(
      "Backup saved",
      `${playlists.playlist.length} playlists, ${favourites.favouriteData.length} favourites`
    )
  }

  const handleRestore = async () => {
    const data = await backupService.load()
    if (!data) {
      appNotification.errorMessage("No backup", "Nothing to restore yet")
      return
    }
    data.playlists.forEach((entry) => {
      if (entry?.[0]) dispatch(importPlaylist(entry[0]))
    })
    data.favourites.forEach((song) => dispatch(addUserFavouritesData(song)))
    appNotification.successMessage("Restored", "Your library is back")
  }

  const handleShareApp = async () => {
    try {
      await Share.share({
        message: `Tuneify ${APP_VERSION} - free music, audio books and offline playlists.`
      })
    } catch (error) {
      appNotification.errorMessage("Could not share", "Try again")
    }
  }

  const handleCommand = (command: String) => {
    switch (command) {
      case "quit":
        BackHandler.exitApp()
        return
      case "share":
        handleShareApp()
        return
      case "backup":
        Alert.alert("Backup", "Save a copy of your library or restore it.", [
          { text: "Cancel", style: "cancel" },
          { text: "Restore", onPress: handleRestore },
          { text: "Save", onPress: handleBackup }
        ])
        return
      default:
        setPanel(String(command))
    }
  }

  const panelTitle = (): string => {
    const found = settingsData.find((item) => item.command === panel)
    return found ? String(found.title) : ""
  }

  return (
    <View style={{ flex: 1, backgroundColor: md3.background }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingHorizontal: 24,
            paddingTop: 16,
            paddingBottom: 24
          }}
        >
          <Avatar.Image
            size={64}
            source={{ uri: settingData.image }}
            onTouchEnd={() => settingService.changeProfileImage(dispatch)}
          />
          <View style={{ marginLeft: 16, flex: 1 }}>
            <Text variant="titleLarge" style={{ color: md3.onSurface }}>
              {settingData.userName}
            </Text>
            <Text variant="bodyMedium" style={{ color: md3.onSurfaceVariant }}>
              Tuneify {APP_VERSION}
            </Text>
          </View>
        </View>
        <Divider style={{ backgroundColor: md3.outlineVariant }} />
        <List.Section>
          {settingsData.map((item) => (
            <List.Item
              key={String(item.command)}
              title={String(item.title)}
              titleStyle={{ color: md3.onSurface }}
              left={(props) => (
                <List.Icon
                  {...props}
                  icon={ICONS[String(item.command)] ?? "circle-small"}
                  color={md3.onSurfaceVariant}
                />
              )}
              onPress={() => handleCommand(item.command)}
            />
          ))}
        </List.Section>
        <View style={{ height: 140 }} />
      </ScrollView>

      <SettingsPanel
        isVisible={Boolean(INFO_PANELS[panel])}
        title={panelTitle()}
        sections={INFO_PANELS[panel] ?? []}
        onClose={closePanel}
      />

      <SettingsPanel
        isVisible={panel === "general" || panel === "notification"}
        title={panel === "notification" ? "Notification" : "General Settings"}
        sections={[]}
        onClose={closePanel}
      >
        <List.Item
          title="In-app notifications"
          titleStyle={{ color: md3.onSurface }}
          right={() => (
            <Switch
              value={preferences.notifications}
              onValueChange={() => {
                dispatch(toggleNotifications())
              }}
            />
          )}
        />
        <List.Item
          title="Prefer high quality audio"
          titleStyle={{ color: md3.onSurface }}
          right={() => (
            <Switch
              value={preferences.highQuality}
              onValueChange={() => {
                dispatch(toggleHighQuality())
              }}
            />
          )}
        />
      </SettingsPanel>

      <SettingsPanel
        isVisible={panel === "language"}
        title="Language"
        sections={[]}
        onClose={closePanel}
      >
        <RadioButton.Group
          value={preferences.language}
          onValueChange={(value) => dispatch(changeLanguage(value))}
        >
          {LANGUAGES.map((language) => (
            <RadioButton.Item
              key={language}
              label={language.charAt(0).toUpperCase() + language.slice(1)}
              value={language}
              labelStyle={{ color: md3.onSurface }}
            />
          ))}
        </RadioButton.Group>
      </SettingsPanel>

      <SettingsPanel
        isVisible={panel === "accent-color"}
        title="Accent Color"
        sections={[]}
        onClose={closePanel}
      >
        <View style={{ flexDirection: "row", flexWrap: "wrap", paddingTop: 8 }}>
          {ACCENTS.map((accent) => (
            <Avatar.Icon
              key={accent}
              size={56}
              icon={preferences.accent === accent ? "check" : "blank"}
              color={md3.onPrimary}
              style={{ backgroundColor: accent, marginRight: 12, marginBottom: 12 }}
              onTouchEnd={() => dispatch(changeAccent(accent))}
            />
          ))}
        </View>
      </SettingsPanel>
    </View>
  )
}
export default memo(Settings)
