import React, { useEffect, useState } from "react"
import { Text, TouchableOpacity } from "react-native"
import { View } from "react-native-animatable"
import Image from "react-native-fast-image"
import { PlaybackState, Track, usePlaybackState } from "react-native-track-player"
import { lyricsApi } from "../../api/api"
import { Icons } from "../../constants/Icon"
import { TypedSelectorHook, useAppDispatch } from "../../hooks/store.hook"
import { StoreSongTypes } from "../../Interfaces/tuneifySlice.interface"
import TuneifyService from "../../services/Tuneify.service"
import { centralQueue } from "../../store/slices/new/Queue.slice"
import Show from "../Show"
import SongPlayer from "./SongPlayer"
const service = new TuneifyService(lyricsApi)
const BottomPlayer = () => {
  const dispatch = useAppDispatch()
  const [isVisible, setIsVisible] = useState(false)
  const [cTrack, setCTrack] = useState<Track>()
  const [currentTrack, setCurrentTrack] = useState<StoreSongTypes>()
  const playbackState: PlaybackState | { state: undefined } = usePlaybackState()
  const applicationQueue = TypedSelectorHook(centralQueue)
  useEffect(() => {
    if (applicationQueue.data?.songs) {
      service.setUpPlayer(applicationQueue.data?.songs)
    }
  }, [applicationQueue.data])
  useEffect(() => {
    if (applicationQueue.data?.songs) {
      setCurrentTrack(applicationQueue.data.songs[applicationQueue.data.currentSongIndex])
    }
  }, [applicationQueue])
  return (
    <>
      {currentTrack && (
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
                  uri: currentTrack?.artwork ? cTrack?.artwork : cTrack?.cover,
                  headers: { Authorization: "songs" },
                  priority: Image.priority.high,
                  cache: Image.cacheControl.immutable
                }}
                style={{ width: 50, height: 50, borderRadius: 5 }}
              />
              <View style={{ marginLeft: 10 }}>
                <Text className="text-white  mb-1 text-sm font-['500']  tracking-wider">
                  {currentTrack?.title!.length > 32
                    ? currentTrack.title?.slice(0, 32) + "..."
                    : currentTrack.title}
                </Text>
                <Text className="text-gray-200 text-[9px] font-['300']">
                  {currentTrack.artist!.length > 60
                    ? currentTrack.artist?.slice(0, 62) + "..."
                    : currentTrack.artist}
                </Text>
              </View>
            </View>
            <TouchableOpacity
              onPress={() => service.playPauseAction(playbackState, applicationQueue, dispatch)}
            >
              <Show isVisible={applicationQueue.data?.isPlaying ?? false}>
                <Icons.PlayIcon name="pause" color={"white"} size={20} />
              </Show>
              <Show isVisible={!applicationQueue.data?.isPlaying}>
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
