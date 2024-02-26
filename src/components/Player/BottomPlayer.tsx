import {Text, TouchableOpacity} from "react-native"
import React, {useEffect, useState} from "react"
import Image from "react-native-fast-image"
import SongPlayer from "./SongPlayer"
import {
  Track,
  usePlaybackState,
  State,
  useTrackPlayerEvents,
  PlaybackState,
} from "react-native-track-player"
import {View} from "react-native-animatable"
import {Icons} from "../../constants/Icon"
import {tuneifySongs} from "../../store/slices/song.slice"
import TuneifyService from "../../services/Tuneify.service"
import {lyricsApi} from "../../api/api"
import {TypedSelectorHook, useAppDispatch} from "../../hooks/store.hook"
const service = new TuneifyService(lyricsApi)
import {tunifyChild} from "../../store/slices/childState.slice"
const BottomPlayer = () => {
  const dispatch = useAppDispatch()
  const data = TypedSelectorHook(tuneifySongs)
  const state = TypedSelectorHook(tunifyChild)
  const [isVisible, setIsVisible] = useState(false)
  const [cTrack, setCTrack] = useState<Track>()
  const playbackState: PlaybackState | {state: undefined} = usePlaybackState()
  useEffect(() => {
    if (data.songs.length > 0) {
      service.setUpPlayer(data)
    }
  }, [data])
  useTrackPlayerEvents(service.getEvent(), (event: any) => {
    event.state == State.Ready && service.handleBottomCondition(setCTrack)
  })
  return (
    <>
      {cTrack && (
        <View>
          <TouchableOpacity
            activeOpacity={1}
            style={{
              width: "100%",
              height: 70,
              position: "absolute",
              bottom: 0,
              backgroundColor: "#2D3250",
              flexDirection: "row",
              alignItems: "center",
              paddingLeft: 20,
              paddingRight: 20,
              justifyContent: "space-between",
            }}
            onPress={() => {
              setIsVisible(true)
            }}>
            <View className="flex flex-row  w-11/12 overflow-hidden">
              <Image
                source={{
                  uri: cTrack?.artwork,
                  headers: {Authorization: "songs"},
                  priority: Image.priority.high,
                  cache: Image.cacheControl.immutable,
                }}
                style={{width: 50, height: 50, borderRadius: 5}}
              />
              <View style={{marginLeft: 10}}>
                <Text className="text-white  mb-1 text-sm font-['500']  tracking-wider">
                  {cTrack.title}
                </Text>
                <Text className="text-gray-200 text-[9px] font-['300']">
                  {cTrack.artist!.length > 60
                    ? cTrack.artist?.slice(0, 62) + "..."
                    : cTrack.artist}
                </Text>
              </View>
            </View>
            <TouchableOpacity
              onPress={() =>
                service.playPauseAction(playbackState, state, dispatch)
              }>
              {state.isPlaying ? (
                <Icons.PlayIcon name="pause" color={"white"} size={30} />
              ) : (
                <Icons.PlayIcon name="play" color={"white"} size={30} />
              )}
            </TouchableOpacity>
          </TouchableOpacity>
          <SongPlayer
            isVisible={isVisible}
            onClose={() => {
              setIsVisible(false)
            }}
          />
        </View>
      )}
    </>
  )
}

export default BottomPlayer
