import { memo, useState } from "react"
import {
  Alert,
  BackHandler,
  FlatList,
  Image,
  Share,
  Switch,
  Text,
  TouchableOpacity,
  View
} from "react-native"
import UserImage from "react-native-fast-image"
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
import { useTheme } from "../../hooks/useTheme"
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

const Settings = () => {
  const settingData = TypedSelectorHook(tuneifyUser)
  const dispatch = useAppDispatch()
  const preferences = TypedSelectorHook(appSettings)
  const playlists = TypedSelectorHook(customePlaylist)
  const favourites = TypedSelectorHook(tuneifyFavourites)
  const theme = useTheme()
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
        message: `Tuneify ${APP_VERSION} - a user friendly music player for your device.`
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
    <View className="w-full h-screen ">
      <View className="w-full  h-auto flex items-center flex-row justify-center">
        <Text className="  text-white text-base tracking-wider font-['400']">
          Setting
        </Text>
      </View>
      <View className="w-full h-20 overflow-hidden flex items-center flex-row pl-2">
        <TouchableOpacity
          className="-z-30"
          onPress={() => settingService.changeProfileImage(dispatch)}
        >
          <UserImage
            source={{
              uri: settingData.image,
              priority: UserImage.priority.high,
              cache: UserImage.cacheControl.immutable
            }}
            className="h-16 w-16 rounded-full"
          />
        </TouchableOpacity>
        <Text className=" ml-3 text-white font-['300'] text-xl">
          {settingData.userName}
        </Text>
      </View>

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
        <View className="flex-row items-center justify-between py-2">
          <Text className="text-gray-200 text-base font-['300']">
            In-app notifications
          </Text>
          <Switch
            value={preferences.notifications}
            onValueChange={() => {
              dispatch(toggleNotifications())
            }}
            trackColor={{ true: theme.accent, false: "#4b4b4b" }}
            thumbColor={"#ffffff"}
          />
        </View>
        <View className="flex-row items-center justify-between py-2">
          <Text className="text-gray-200 text-base font-['300']">
            Prefer high quality audio
          </Text>
          <Switch
            value={preferences.highQuality}
            onValueChange={() => {
              dispatch(toggleHighQuality())
            }}
            trackColor={{ true: theme.accent, false: "#4b4b4b" }}
            thumbColor={"#ffffff"}
          />
        </View>
      </SettingsPanel>
      <SettingsPanel
        isVisible={panel === "language"}
        title="Language"
        sections={[]}
        onClose={closePanel}
      >
        {LANGUAGES.map((language) => (
          <TouchableOpacity
            key={language}
            className="py-3 border-b border-[#2c2c2c]"
            onPress={() => dispatch(changeLanguage(language))}
          >
            <Text
              className="text-base capitalize font-['300']"
              style={{
                color:
                  preferences.language === language
                    ? theme.accent
                    : theme.textMuted
              }}
            >
              {language}
            </Text>
          </TouchableOpacity>
        ))}
      </SettingsPanel>
      <SettingsPanel
        isVisible={panel === "accent-color"}
        title="Accent Color"
        sections={[]}
        onClose={closePanel}
      >
        <View className="flex-row flex-wrap justify-start py-2">
          {ACCENTS.map((accent) => (
            <TouchableOpacity
              key={accent}
              onPress={() => dispatch(changeAccent(accent))}
              style={{
                backgroundColor: accent,
                borderWidth: preferences.accent === accent ? 3 : 0,
                borderColor: "#ffffff"
              }}
              className="h-12 w-12 rounded-full mr-3 mb-3"
            />
          ))}
        </View>
      </SettingsPanel>
      <FlatList
        data={settingsData}
        keyExtractor={(item) => String(item.command)}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              style={{
                width: "95%",
                height: 50,
                flexDirection: "row",
                alignItems: "center",
                paddingLeft: 2,
                paddingRight: 5,
                marginTop: 4,
                alignSelf: "center"
              }}
              onPress={() => handleCommand(item.command)}
            >
              <Image
                source={item.leftIcon}
                style={{ tintColor: "#d0d0d1" }}
                className="h-5 w-5"
              />
              <Text className="ml-4 text-gray-300 text-base font-['300'] tracking-widest">
                {item.title}
              </Text>
            </TouchableOpacity>
          )
        }}
      />
    </View>
  )
}
export default memo(Settings)
