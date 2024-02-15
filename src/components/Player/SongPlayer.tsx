import {
    Text, TouchableOpacity, Image, StatusBar, View,
    ScrollView, Animated,
} from 'react-native';
import React, { useEffect, useState, useCallback } from 'react';
import Modal from 'react-native-modal';
import LinearGradient from 'react-native-linear-gradient';
import TrackPlayer, { Track, usePlaybackState, useProgress, useTrackPlayerEvents, State } from 'react-native-track-player';
import { Icons } from '../../constants/Icon';
import Slider from "@react-native-community/slider"
import MusifyService from '../../services/Musify.service'
import { lyricsApi } from '../../api/api';
const service = new MusifyService(lyricsApi)
import { useDispatch } from 'react-redux';
import { addUserFavouritesData } from '../../store/Musify';
const SongPlayer = ({ isVisible, onClose, }: { isVisible: any, onClose: any }) => {
    const dispatch = useDispatch()
    const [isFlipped, setIsFlipped] = useState(false)
    const [flip, setFlip] = useState(new Animated.Value(0))
    const [currentTrack, setCurrentTrrack] = useState<Track>()
    const [colors, setColors] = useState<string[]>([])
    const [lyric, setLyric] = useState<string>("We are working on it.! 💻")
    const playbackState = usePlaybackState()
    const progress = useProgress()

    const FavouriteHandler = () => {
        dispatch(addUserFavouritesData(currentTrack!))
    }
    const flipCard = useCallback(() => {
        Animated.timing(flip, {
            toValue: isFlipped ? 0 : 180,
            duration: 500,
            useNativeDriver: true,
        }).start(() => {
            setIsFlipped(!isFlipped);
        });
    }, [isFlipped])
    const frontInterpolate = flip.interpolate({
        inputRange: [0, 180],
        outputRange: ['0deg', '180deg'],
    })
    const backInterpolate = flip.interpolate({
        inputRange: [0, 180],
        outputRange: ['180deg', '360deg'],
    })
    const frontAnimatedStyle = {
        transform: [{ rotateY: frontInterpolate }]
    }
    const backAnimatedStyle = {
        transform: [{ rotateY: backInterpolate }],
    }
    useEffect(() => {
        service.handleBottomCondition(setCurrentTrrack)
    }, [])
    const format = (seconds: number) => {
        let mins = Math.floor(seconds / 60)
            .toString()
            .padStart(2, '0')
        let secs = (Math.trunc(seconds) % 60).toString().padStart(2, '0')
        return `${mins}:${secs}`
    }
    useTrackPlayerEvents(service.getEvent(), (event: any) => {
        if (event.state == State.Playing) {
            service.handleBottomCondition(setCurrentTrrack)
            service.getLyrics(setLyric)
            setColors(service.getGradient())
        }
    })
    return (
        <Modal isVisible={isVisible} style={{ margin: 0 }}>
            <StatusBar backgroundColor={colors[0]} />
            <LinearGradient
                colors={colors}
                style={{ flex: 1 }}>
                <View className='w-full h-screen  px-3'>
                    <View className=' h-10 w-full flex items-center justify-between flex-row'>
                        <TouchableOpacity onPress={() => { onClose() }}>
                            <Icons.KeyboardDown name='keyboard-arrow-down' size={35} color={"white"} />
                        </TouchableOpacity>
                        <View className='flex flex-row h-full items-center justify-center'>
                            <TouchableOpacity onPress={() => flipCard()}>
                                <Icons.MoreIcon name='lyrics' size={20} color={"white"} className='mr-4' />
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Icons.MoreIcon name='more-vert' size={25} color={"white"} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View className=' relative h-1/2 w-full flex items-center justify-center '>
                        <Animated.View
                            style={[frontAnimatedStyle, { backfaceVisibility: "hidden" }]}
                            className=' w-[85%] h-80  justify-center items-center rounded-xl overflow-hidden'>
                            <Image source={{ uri: currentTrack?.artwork }} className='h-full w-full' />
                        </Animated.View>
                        <Animated.View
                            style={[backAnimatedStyle, { backfaceVisibility: "hidden" }]}
                            className='flex absolute w-[85%] h-80 bg-[#2D3250] justify-center items-center rounded-xl '
                        >
                            {lyric.length > 15 ?
                                <ScrollView showsVerticalScrollIndicator={false}>
                                    <Text className='text-white text-lg min-h-[100px]  px-5 flex items-center justify-center '>{lyric}</Text>
                                </ScrollView> :
                                <Text className='absolute top-52 left-0 '>{lyric}</Text>
                            }
                        </Animated.View>
                    </View>
                    <View className='w-full mt-5 h-auto' >
                        <View className=' flex items-center justify-between flex-row px-3 '>
                            <View className=' py-2'>
                                <Text className='text-white text-xl mb-1'>{currentTrack?.title}</Text>
                                <Text className='text-white text-sm'>{currentTrack?.artist}</Text>
                            </View>
                            <TouchableOpacity onPress={FavouriteHandler}>
                                <Icons.HomeIcon name='heart-fill' size={20} color={"#FF0060"} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View className='w-full  mt-5 py-2'>
                        <Slider
                            minimumValue={0}
                            maximumValue={progress.duration}
                            value={progress.position}
                            minimumTrackTintColor="#FFFFFF"
                            maximumTrackTintColor="#fff"
                            onSlidingComplete={(e) => {
                                TrackPlayer.seekTo(e)
                            }}
                        />
                        <View
                            style={{
                                width: '90%',
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignSelf: 'center',
                            }}>
                            <Text style={{ color: 'white' }}>{format(progress.position)}</Text>
                            <Text style={{ color: 'white' }}>{format(progress.duration)}</Text>
                        </View>
                    </View>
                    <View className=' h-10 overflow-hidden w-full flex items-center justify-between flex-row mt-3 px-4'>
                        <TouchableOpacity>
                            <Image source={require("../../assets/images/suffle.png")} style={{ width: 30, height: 30, tintColor: '#bababa' }} />
                        </TouchableOpacity>
                        <View className=' w-[40%] flex items-center justify-evenly flex-row'>
                            <Icons.KeyboardDown name='skip-previous' color={"white"} size={30}
                                onPress={() => [TrackPlayer.skipToPrevious(), service.handleBottomCondition(setCurrentTrrack)]}
                            />
                            <TouchableOpacity onPress={() => service.playPauseAction(playbackState)} >
                                {playbackState.state == "playing" ?
                                    <Icons.PlayIcon name='pause' color={"white"} size={30} /> :
                                    <Icons.PlayIcon name='play' color={"white"} size={30} />
                                }
                            </TouchableOpacity>
                            <Icons.KeyboardDown name='skip-next' color={"white"} size={30}
                                onPress={() => [TrackPlayer.skipToNext(), service.handleBottomCondition(setCurrentTrrack)]}
                            />
                        </View>
                        <Icons.SearchIcon name='repeat' color={"#bababa"} size={25} />
                    </View>
                </View>

            </LinearGradient>
        </Modal>
    )
}
export default SongPlayer
