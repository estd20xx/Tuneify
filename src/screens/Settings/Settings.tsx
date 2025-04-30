import Slider from "@react-native-community/slider"
import { memo } from "react"
import {
  BackHandler,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View
} from "react-native"
import UserImage from "react-native-fast-image"
import Toast from "react-native-toast-message"
import { settingsData } from "../../constants/Settings"
import { TypedSelectorHook, useAppDispatch } from "../../hooks/store.hook"
import SettingService from "../../services/setting.service"
import {
  bottomPlayer,
  changePosition
} from "../../store/slices/bottomPlayer.slice"
import { tuneifyUser } from "../../store/slices/user.slice"
const settingService = new SettingService()
const Settings = () => {
  const settingData = TypedSelectorHook(tuneifyUser)
  const dispatch = useAppDispatch()
  const bottomPlayerPosition = TypedSelectorHook(bottomPlayer)
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

      <View className="w-full h-auto my-5">
        <Text className="self-center my-2 text-lg">Position Bottom Player</Text>
        <Slider
          minimumValue={54}
          maximumValue={100}
          value={bottomPlayerPosition.value}
          minimumTrackTintColor="#ff8216"
          maximumTrackTintColor="#d0d0d1"
          thumbTintColor="#ff8216"
          onSlidingComplete={(e: number) => dispatch(changePosition(e))}
        />
      </View>
      <Toast />
      <FlatList
        data={settingsData}
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
              onPress={() => item.command == "quit" && BackHandler.exitApp()}
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
