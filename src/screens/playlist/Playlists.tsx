import { Plus } from "lucide-react-native"
import React, { memo } from "react"
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native"
import { Icons } from "../../constants/Icon"
import { TypedSelectorHook } from "../../hooks/store.hook"
import { customePlaylist } from "../../store/slices/offlinePlaylist.slice"
const Playlists = () => {
  const offlinePlaylist = TypedSelectorHook(customePlaylist)
  return (
    <View className="w-full h-screen flex  justify-center flex-row">
      <FlatList
        data={offlinePlaylist.playlist}
        keyExtractor={(item, index) => item[0].name}
        initialNumToRender={3}
        showsVerticalScrollIndicator={false}
        maxToRenderPerBatch={4}
        contentContainerStyle={{ paddingBottom: 80 }}
        removeClippedSubviews={true}
        ListHeaderComponent={() =>
          <View>
            <Text className="text-white text-2xl font-['400'] ml-5 border-b-[1px] border-gray-500">
              {offlinePlaylist.playlist.length} Playlists
            </Text>
            <View
              style={{
                width: "100%",
                height: 60,
                flexDirection: "row",
                paddingLeft: 18,
                paddingRight: 5,
                marginTop: 10,
                alignItems: "center",
              }}
            >
              <TouchableOpacity
                className="h-14 w-14 rounded-full bg-orange-500 flex items-center justify-center">
                <Plus color={"#FFF"} />
              </TouchableOpacity>
              <Text className="text-xl text-white ml-3">Add New Playlist</Text>
            </View>
          </View>
        }
        windowSize={10}
        renderItem={({ item, index }) => {
          const { name, songs } = item[0]
          return (
            <TouchableOpacity
              style={{
                width: "100%",
                height: 60,
                flexDirection: "row",
                justifyContent: "space-between",
                paddingLeft: 2,
                paddingRight: 5,
                marginTop: 10
              }}
            >
              <View className="w-4/5  h-full pl-3 flex flex-row ">
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
              </View>
              <View className=" w-1/5 h-full flex items-center justify-end flex-row pr-3">
                <Icons.MoreIcon
                  name="more-vert"
                  size={25}
                  color={"#bababa"}
                />
              </View>
            </TouchableOpacity>
          )
        }}
      />
    </View>
  )
}
export default memo(Playlists)
