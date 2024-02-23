import {
    Text,
    TouchableOpacity,
    Image,
} from 'react-native'
import React, { useEffect, useState } from 'react'
import SongPlayer from './SongPlayer'
import { Track, usePlaybackState, State, useTrackPlayerEvents, PlaybackState } from 'react-native-track-player'
import { View } from 'react-native-animatable'
import { Icons } from '../../constants/Icon'
import { TuneifyData } from '../../store/Tuneify'
import TuneifyService from '../../services/Tuneify.service'
import { lyricsApi } from '../../api/api'
import { TypedSelectorHook } from '../../hooks/store.hook'
const service = new TuneifyService(lyricsApi)
const BottomPlayer = () => {
    const data = TypedSelectorHook(TuneifyData)
    const [isVisible, setIsVisible] = useState(false)
    const [cTrack, setCTrack] = useState<Track>()
    const playbackState: PlaybackState | { state: undefined } = usePlaybackState();
    useEffect(() => {
        if (data.storeSong.length > 0) {
            service.setUpPlayer(data, setCTrack)
        }
    }, [data])
    useTrackPlayerEvents(service.getEvent(), (event: any) => {
        event.state == State.Ready && service.handleBottomCondition(setCTrack)
    })
    return (
        <>
            {cTrack &&
                <View>
                    <TouchableOpacity
                        activeOpacity={1}
                        style={{
                            width: '100%',
                            height: 70,
                            position: 'absolute',
                            bottom: 0,
                            backgroundColor: '#2D3250',
                            flexDirection: 'row',
                            alignItems: 'center',
                            paddingLeft: 20,
                            paddingRight: 20,
                            justifyContent: 'space-between',
                        }} onPress={() => {
                            setIsVisible(true)
                        }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Image
                                source={{ uri: cTrack?.artwork }}
                                style={{ width: 50, height: 50, borderRadius: 5 }}
                            />
                            <View style={{ marginLeft: 10 }}>
                                <Text className='text-white text-[14px] mb-1'>{cTrack.title}</Text>
                                <Text style={{ color: 'white', fontSize: 10 }}>{cTrack.artist}</Text>
                            </View>
                        </View>
                        <TouchableOpacity onPress={() => service.playPauseAction(playbackState)}>
                            {playbackState.state == "playing" ?
                                <Icons.PlayIcon name='pause' color={"white"} size={30} /> :
                                <Icons.PlayIcon name='play' color={"white"} size={30} />
                            }
                        </TouchableOpacity>
                    </TouchableOpacity>
                    <SongPlayer
                        isVisible={isVisible}
                        onClose={() => {
                            setIsVisible(false)
                        }}
                    />
                </View>
            }
        </>
    );
};

export default BottomPlayer