import React, { memo, useState } from "react"
import {
  Alert,
  ImageBackground,
  ScrollView,
  TextInput,
  TouchableOpacity
} from "react-native"
import { View } from "react-native-animatable"
import Modal from "react-native-modal"
import { Text } from "react-native-paper"
import { TypedSelectorHook, useAppDispatch } from "../../hooks/store.hook"
import { StoreSongTypes } from "../../Interfaces/tuneifySlice.interface"
import {
  addSongToPlaylist,
  customePlaylist,
  newPlaylist
} from "../../store/slices/offlinePlaylist.slice"
import Show from "../Common/Show"
type Props = {
  isVisible: boolean
  togglePlayist: () => void
  song: StoreSongTypes
}
const SideModal: React.FC<Props> = ({ isVisible, togglePlayist, song }) => {
  const offlinePlaylist = TypedSelectorHook(customePlaylist)
  const dispatch = useAppDispatch()
  const [isInput, setIsInput] = useState<boolean>(false)
  const [playlistName, setPlaylistName] = useState<string>("")
  const handleCustom = (name: string) => {
    if (playlistName.length == 0) {
      setIsInput(false)
      Alert.alert("Empty name!", "Enter name of playlist")
      return
    }
    dispatch(
      newPlaylist([
        {
          name,
          songs: [song]
        }
      ])
    )
    setIsInput(false)
    setPlaylistName("")
  }
  return (
    <Modal
      isVisible={isVisible}
      onBackButtonPress={togglePlayist}
      className="w-full h-screen relative -left-5"
    >
      <Show isVisible={isInput}>
        <View className="bg-[#313c56c6] h-36 w-full absolute top-10 rounded-md  items-center justify-center blur-lg z-30">
          <TextInput
            value={playlistName}
            onChangeText={(e) => setPlaylistName(e)}
            className="h-11 w-[88%] bg-white rounded-md text-black"
          />
          <View className="flex items-center justify-evenly flex-row w-full">
            <TouchableOpacity
              className="py-3 bg-red-500 w-32 items-center mt-3 rounded-md"
              onPress={() => setIsInput(false)}
            >
              <Text className="text-white">Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="py-3 bg-[#1c0b18] w-32 items-center mt-3 rounded-md"
              onPress={() => handleCustom(playlistName)}
            >
              <Text className="text-white">Create</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Show>
      <View className="w-full h-[70%] bg-slate-950 absolute bottom-0 rounded-t-3xl border-t-2 border-slate-300">
        <View className="w-full p-2 overflow-hidden z-10">
          <Text className="text-2xl font-['500'] border-b-2 border-gray-300 text-white mb-2 self-center">
            Playlists
          </Text>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View className="w-full pb-32  flex items-center  gap-2 justify-evenly flex-row flex-wrap  overflow-hidden">
              {offlinePlaylist.playlist.map((playlist, index) => {
                const { name, songs } = playlist[0]
                return (
                  <TouchableOpacity
                    key={name.concat(String(index))}
                    className="w-[30%] h-36 mt-2 bg-black items-center justify-center rounded-xl overflow-hidden"
                    onPress={() => [
                      dispatch(addSongToPlaylist({ song, index })),
                      togglePlayist()
                    ]}
                  >
                    <ImageBackground
                      source={{ uri: songs[0].artwork }}
                      className="w-full h-full absolute opacity-25 z-10 "
                      resizeMode="cover"
                    />
                    <Text className="z-20 text-white font-['300']">{name}</Text>
                  </TouchableOpacity>
                )
              })}
            </View>
          </ScrollView>
        </View>
        <View className="h-20 w-full bg-[#201b18] absolute -bottom-5 flex items-center justify-evenly flex-row z-20">
          <TouchableOpacity
            className="w-2/5 rounded-md bg-[#302625] py-3 flex items-center justify-center"
            onPress={togglePlayist}
          >
            <Text>cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="w-2/5 rounded-md bg-secondary py-3 flex items-center justify-center"
            onPress={() => setIsInput(true)}
          >
            <Text>New</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  )
}
export default memo(SideModal)
