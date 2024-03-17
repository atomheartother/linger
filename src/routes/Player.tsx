import React from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParams} from './types';
import {Pressable, View, useWindowDimensions} from 'react-native';
import {useTheme} from '@react-navigation/native';
import FakeAlbumArt from '../components/FakeAlbumArt';
import MUIIcon from 'react-native-vector-icons/MaterialIcons';
import TrackPlayer, {
  State,
  useActiveTrack,
  usePlaybackState,
} from 'react-native-track-player';
import {ListItemMainContent} from '../texts';
import ProgressIndicator from '../components/ProgressIndicator';
import {ControlsContainer} from '../containers';
import IconButton from '../components/IconButton';

export default function Player({
  navigation,
}: NativeStackScreenProps<RootStackParams>) {
  const {colors} = useTheme();
  const {width} = useWindowDimensions();
  const track = useActiveTrack();
  const {state} = usePlaybackState();

  if (!track) {
    return null;
  }
  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'column',
        backgroundColor: colors.background,
        alignItems: 'center',
      }}>
      <View style={{height: 40}} />
      <View
        style={{
          paddingHorizontal: 20,
          alignItems: 'center',
        }}>
        <FakeAlbumArt iconSize="large" width={width - 20} height={width - 20} />
      </View>
      <View
        style={{
          flex: 1,
          justifyContent: 'space-evenly',
          flexDirection: 'column',
          alignItems: 'stretch',
          padding: 16,
        }}>
        <ListItemMainContent style={{fontSize: 16}}>
          {track.title}
        </ListItemMainContent>
        <ProgressIndicator fullScreen />
        <ControlsContainer style={{width: '100%', justifyContent: 'center'}}>
          <MUIIcon name="skip-previous" size={24} />
          <Pressable
            onPress={() =>
              state === State.Playing ? TrackPlayer.pause() : TrackPlayer.play()
            }>
            <View
              style={{
                backgroundColor: colors.primary,
                padding: 15,
                borderRadius: 10,
              }}>
              <MUIIcon
                name={state === State.Playing ? 'pause' : 'play-arrow'}
                size={30}
                color={colors.background}
              />
            </View>
          </Pressable>
          <IconButton icon="skip-next" size={24} />
        </ControlsContainer>
      </View>
    </View>
  );
}
