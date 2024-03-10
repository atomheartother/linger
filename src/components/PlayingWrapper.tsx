import React, {PropsWithChildren, useEffect, useMemo} from 'react';
import {useTrackPlayer} from '../context/playerContext';
import {Text, View} from 'react-native';
import TrackPlayer, {
  RepeatMode,
  State,
  Track,
  useActiveTrack,
  usePlaybackState,
  useProgress,
} from 'react-native-track-player';
import {useTheme} from '@react-navigation/native';
import IconButton from './IconButton';
import {useStats} from '../context/stats';

const repeatModeIcon: {
  [key in RepeatMode]: string;
} = {
  [RepeatMode.Off]: 'repeat-off',
  [RepeatMode.Queue]: 'repeat',
  [RepeatMode.Track]: 'repeat-once',
};

type PlayingProps = {
  playing: Track;
};

function Playing({playing}: PlayingProps) {
  const {colors} = useTheme();
  const progress = useProgress(1000);
  const {state: playbackState} = usePlaybackState();
  const {repeatMode, changeRepeatMode} = useTrackPlayer();
  const playedPercent = useMemo(() => {
    return Math.round((progress.position * 100) / progress.duration);
  }, [progress]);
  const cycleRepeatMode = () => {
    if (repeatMode === RepeatMode.Off) {
      changeRepeatMode(RepeatMode.Queue);
    } else if (repeatMode === RepeatMode.Queue) {
      changeRepeatMode(RepeatMode.Track);
    } else {
      changeRepeatMode(RepeatMode.Off);
    }
  };
  return (
    <View>
      <View
        style={{
          height: 4,
          backgroundColor: colors.border,
          flexDirection: 'row',
        }}>
        <View
          style={{
            height: '100%',
            width: `${playedPercent}%`,
            backgroundColor: colors.primary,
          }}
        />
        <View style={{height: '100%', width: `${100 - playedPercent}%`}} />
      </View>
      <View
        style={{
          padding: 16,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <View>
          <Text>{playing.title}</Text>
        </View>
        <View style={{flexDirection: 'row', gap: 8}}>
          <IconButton
            icon={playbackState === State.Playing ? 'pause' : 'play'}
            size={24}
            onPress={() =>
              playbackState === State.Playing
                ? TrackPlayer.pause()
                : TrackPlayer.play()
            }
          />
          <IconButton
            icon={repeatModeIcon[repeatMode]}
            size={24}
            onPress={cycleRepeatMode}
          />
        </View>
      </View>
    </View>
  );
}

export default function PlayingWrapper({children}: PropsWithChildren) {
  const track = useActiveTrack();
  return (
    <View style={{flex: 1, display: 'flex'}}>
      {children}
      {track && <Playing playing={track} />}
    </View>
  );
}
