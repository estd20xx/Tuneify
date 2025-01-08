import React, { useEffect, useState } from "react"
import { Text, TouchableOpacity } from "react-native"
import { View } from "react-native-animatable"
import Image from "react-native-fast-image"
import {
  PlaybackState,
  State,
  Track,
  usePlaybackState,
  useTrackPlayerEvents
} from "react-native-track-player"
import { lyricsApi } from "../../api/api"
import { Icons } from "../../constants/Icon"
import { TypedSelectorHook, useAppDispatch } from "../../hooks/store.hook"
import TuneifyService from "../../services/Tuneify.service"
import { centralQueue } from "../../store/slices/new/Queue.slice"
import { tuneifySongs } from "../../store/slices/song.slice"
import Show from "../Show"
import SongPlayer from "./SongPlayer"
const service = new TuneifyService(lyricsApi)
const BottomPlayer = () => {
  const dispatch = useAppDispatch()
  const data = TypedSelectorHook(tuneifySongs)
  const state = TypedSelectorHook(centralQueue)
  const [isVisible, setIsVisible] = useState(false)
  const [cTrack, setCTrack] = useState<Track>()
  const playbackState: PlaybackState | { state: undefined } = usePlaybackState()
  const applicationQueue = TypedSelectorHook(centralQueue)
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
            className="absolute h-14 w-full bottom-0 flex flex-row items-center justify-center px-3 bg-[#2D3250]"
            activeOpacity={1}
            onPress={() => {
              setIsVisible(true)
            }}
          >
            <View className="flex flex-row items-center h-full w-11/12 overflow-hidden">
              <Image
                source={{
                  uri: cTrack?.artwork ? cTrack?.artwork : cTrack?.cover,
                  headers: { Authorization: "songs" },
                  priority: Image.priority.high,
                  cache: Image.cacheControl.immutable
                }}
                style={{ width: 50, height: 50, borderRadius: 5 }}
              />
              <View style={{ marginLeft: 10 }}>
                <Text className="text-white  mb-1 text-sm font-['500']  tracking-wider">
                  {cTrack.title!.length > 32 ? cTrack.title?.slice(0, 32) + "..." : cTrack.title}
                </Text>
                <Text className="text-gray-200 text-[9px] font-['300']">
                  {cTrack.artist!.length > 60 ? cTrack.artist?.slice(0, 62) + "..." : cTrack.artist}
                </Text>
              </View>
            </View>
            <TouchableOpacity
              onPress={() => service.playPauseAction(playbackState, state, dispatch)}
            >
              <Show isVisible={state.data?.isPlaying ?? false}>
                <Icons.PlayIcon name="pause" color={"white"} size={20} />
              </Show>
              <Show isVisible={!state.data?.isPlaying}>
                <Icons.PlayIcon name="play" color={"white"} size={20} />
              </Show>
            </TouchableOpacity>
          </TouchableOpacity>
          <SongPlayer isVisible={isVisible} setIsVisible={setIsVisible} />
        </View>
      )}
    </>
  )
}

export default BottomPlayer
