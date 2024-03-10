import React, {PropsWithChildren, useMemo} from 'react';
import {TrackPlayerData, useTrackPlayer} from '../context/playerContext';
import {Text, View} from 'react-native';
import TrackPlayer, {
  RepeatMode,
  State,
  usePlaybackState,
  useProgress,
} from 'react-native-track-player';
import {useTheme} from '@react-navigation/native';
import IconButton from './IconButton';

type PlayingProps = {
  playing: Exclude<TrackPlayerData['playing'], null>;
};

const repeatModeIcon : {
  [key in RepeatMode]: string
} = {
  [RepeatMode.Off]: 'repeat-off',
  [RepeatMode.Queue]: 'repeat',
  [RepeatMode.Track]: 'repeat-once',
}

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
  }
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
          backgroundColor: colors.card,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <Text>{playing.song.filename}</Text>
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
  const {playing} = useTrackPlayer();
  return (
    <View style={{flex: 1, display: 'flex'}}>
      {children}
      {playing && <Playing playing={playing} />}
    </View>
  );
}
