import React, {PropsWithChildren, useMemo} from 'react';
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
import {ControlsContainer} from '../containers';

const repeatModeIcon: {
  [key in RepeatMode]: string;
} = {
  [RepeatMode.Off]: 'repeat',
  [RepeatMode.Queue]: 'repeat',
  [RepeatMode.Track]: 'repeat-one',
};

type PlayingProps = {
  playing: Track;
};

function Playing({playing}: PlayingProps) {
  const {colors} = useTheme();
  const progress = useProgress(500);
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
        <View style={{flex: 1}}>
          <Text>{playing.title}</Text>
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
          <IconButton
            style={{opacity: repeatMode === RepeatMode.Off ? 0.6 : 1}}
            icon={repeatModeIcon[repeatMode]}
            size={24}
            onPress={cycleRepeatMode}
          />
        </ControlsContainer>
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
