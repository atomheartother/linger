import React, {PropsWithChildren} from 'react';
import {useTrackPlayer} from '../context/playerContext';
import {Pressable, Text, View} from 'react-native';
import TrackPlayer, {
  State,
  Track,
  useActiveTrack,
  usePlaybackState,
} from 'react-native-track-player';
import {useNavigation} from '@react-navigation/native';
import IconButton from './IconButton';
import {ControlsContainer} from '../containers';
import FakeAlbumArt from './FakeAlbumArt';
import RepeatIcon from './RepeatIcon';
import ProgressIndicator from './ProgressIndicator';

type PlayingProps = {
  playing: Track;
};

function Playing({playing}: PlayingProps) {
  const navigation = useNavigation();
  const {state: playbackState} = usePlaybackState();
  const trackPlayer = useTrackPlayer();
  return (
    <View>
      <ProgressIndicator />
      <Pressable onPress={() => navigation.navigate('Player')}>
        <View
          style={{
            padding: 8,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              flex: 1,
              gap: 8,
            }}>
            <FakeAlbumArt iconSize="medium" />
            <View style={{flex: 1}}>
              <Text>{playing.title}</Text>
            </View>
          </View>
          <ControlsContainer>
            <IconButton
              icon={playbackState === State.Playing ? 'pause' : 'play-arrow'}
              size={24}
              onPress={() =>
                playbackState === State.Playing
                  ? TrackPlayer.pause()
                  : TrackPlayer.play()
              }
            />
            <RepeatIcon trackPlayer={trackPlayer} />
          </ControlsContainer>
        </View>
      </Pressable>
    </View>
  );
}

export default function PlayingWrapper({children}: PropsWithChildren) {
  const track = useActiveTrack();
  return (
    <View style={{flex: 1}}>
      {children}
      {track && <Playing playing={track} />}
    </View>
  );
}
