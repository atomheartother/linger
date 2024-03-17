import React from 'react';
import {TrackPlayerData} from '../context/playerContext';
import {RepeatMode} from 'react-native-track-player';
import IconButton from './IconButton';

const repeatModeIcon: {
  [key in RepeatMode]: string;
} = {
  [RepeatMode.Off]: 'repeat',
  [RepeatMode.Queue]: 'repeat',
  [RepeatMode.Track]: 'repeat-one',
};

type Props = {
  trackPlayer: TrackPlayerData;
};

export default function RepeatIcon({
  trackPlayer: {repeatMode, changeRepeatMode},
}: Props) {
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
    <IconButton
      style={{opacity: repeatMode === RepeatMode.Off ? 0.3 : 1}}
      icon={repeatModeIcon[repeatMode]}
      size={24}
      onPress={cycleRepeatMode}
    />
  );
}
