import { Camera, Plus, Share } from "lucide-react-native"
import React, { memo, useState } from "react"
import {
  Alert,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View
} from "react-native"
import "text-encoding"
import QrCode from "../../components/playlist/QrCode"
import { TypedSelectorHook, useAppDispatch } from "../../hooks/store.hook"
import {
  customePlaylist,
  deletePlaylist
} from "../../store/slices/offlinePlaylist.slice"
import { sharePlaylist } from "../../store/slices/share.slice"
const Playlists = () => {
  const offlinePlaylist = TypedSelectorHook(customePlaylist)
  const dispatch = useAppDispatch()
  const [isVisible, setIsVisible] = useState<boolean>(false)

  const handlePlaylistCreation = () => {}

  return (
    <View className="w-full h-screen flex  justify-center flex-row">
      <QrCode isVisible={isVisible} onpress={() => setIsVisible(!isVisible)} />
      <FlatList
        data={offlinePlaylist.playlist}
        keyExtractor={(item) => item[0].name}
        initialNumToRender={3}
        showsVerticalScrollIndicator={false}
        maxToRenderPerBatch={4}
        contentContainerStyle={{ paddingBottom: 80 }}
        removeClippedSubviews={true}
        ListHeaderComponent={() => (
          <View>
            <View className="flex justify-between flex-row pr-3 border-b">
              <Text className="text-white text-2xl font-['400'] ml-5 pb-2">
                {offlinePlaylist.playlist.length} Playlists
              </Text>
              <TouchableOpacity
                onPress={() =>
                  Alert.alert("Developer Message", "work is in progress...")
                }
              >
                <Camera size={25} color={"#fff"} />
              </TouchableOpacity>
            </View>
            <View
              style={{
                width: "100%",
                height: 60,
                flexDirection: "row",
                paddingLeft: 18,
                paddingRight: 5,
                marginTop: 10,
                alignItems: "center"
              }}
            >
              <TouchableOpacity
                className="h-14 w-14 rounded-full bg-orange-500 flex items-center justify-center"
                onPress={() => handlePlaylistCreation()}
              >
                <Plus color={"#FFF"} />
              </TouchableOpacity>
              <Text className="text-xl text-white ml-3">Add New Playlist</Text>
            </View>
          </View>
        )}
        windowSize={10}
        renderItem={({ item, index }) => {
          const { name, songs } = item[0]
          return (
            <View className="w-full h-16 flex justify-between flex-row px-5 mt-2">
              <TouchableOpacity
                className="w-4/5 h-full flex flex-row "
                onLongPress={() => {
                  Alert.alert(
                    "Delete Playlist",
                    "Are you sure you want to delete your existing playlist? \n\nNote: This will remove all saved songs from related playlists.",
                    [
                      {
                        text: "Cancel",
                        onPress: () => console.log("Cancel Pressed"),
                        style: "default"
                      },
                      {
                        text: "OK",
                        onPress: () => dispatch(deletePlaylist(index)),
                        style: "destructive"
                      }
                    ]
                  )
                }}
              >
                <View className="w-full rounded-lg overflow-hidden ">
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center"
                    }}
                  >
                    <Image
                      source={{
                        uri: songs[0].artwork
                      }}
                      style={{
                        width: 60,
                        height: 60,
                        borderRadius: 17
                      }}
                    />
                    <View style={{ marginLeft: 10 }}>
                      <Text
                        style={{
                          color: "white",
                          fontSize: 14,
                          fontFamily: "400"
                        }}
                      >
                        {name?.length > 45 ? name.slice(0, 45) + "..." : name}
                      </Text>
                      <Text
                        style={{
                          color: "#d0d0d1",
                          fontSize: 12,
                          marginTop: 2,
                          fontFamily: "300"
                        }}
                      >
                        {songs.length} songs
                      </Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => [
                  dispatch(sharePlaylist(item[0])),
                  setIsVisible(!isVisible)
                ]}
              >
                <Share size={25} color={"#bababa"} />
              </TouchableOpacity>
            </View>
          )
        }}
      />
    </View>
  )
}
export default memo(Playlists)
