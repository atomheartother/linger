import React, {useState} from 'react';
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
import Dialog from '../components/Dialog';
import SleepEdit from '../components/SleepEdit';
import {useTrackPlayer} from '../context/playerContext';

export default function Player({
  navigation,
}: NativeStackScreenProps<RootStackParams>) {
  const {colors} = useTheme();
  const {sleepDate, setSleepDate} = useTrackPlayer();
  const {width} = useWindowDimensions();
  const track = useActiveTrack();
  const {state} = usePlaybackState();
  const [sleepModal, setSleepModal] = useState(false);

  if (!track) {
    return null;
  }
  return (
    <View
      style={{
        flex: 1,
        padding: 15,
        flexDirection: 'column',
        backgroundColor: colors.background,
        alignItems: 'center',
      }}>
      <View
        style={{
          width: '100%',
          height: 50,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <IconButton
          icon="arrow-back"
          size={24}
          onPress={() => navigation.goBack()}
        />
        <IconButton
          icon={sleepDate ? 'timer-off' : 'timer'}
          size={24}
          onPress={() => (sleepDate ? setSleepDate(null) : setSleepModal(true))}
        />
      </View>
      <View
        style={{
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
        }}>
        <ListItemMainContent style={{fontSize: 16}}>
          {track.title}
        </ListItemMainContent>
        <ProgressIndicator fullScreen />
        <ControlsContainer style={{width: '100%', justifyContent: 'center'}}>
          <MUIIcon
            onPress={() => TrackPlayer.skipToPrevious()}
            name="skip-previous"
            size={28}
          />
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
                size={36}
                color={colors.background}
              />
            </View>
          </Pressable>
          <IconButton
            onPress={() => TrackPlayer.skipToNext()}
            icon="skip-next"
            size={28}
          />
        </ControlsContainer>
      </View>
      <Dialog visible={sleepModal} onRequestClose={() => setSleepModal(false)}>
        <SleepEdit close={() => setSleepModal(false)} />
      </Dialog>
    </View>
  );
}
