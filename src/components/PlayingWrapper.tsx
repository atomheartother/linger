import React, {PropsWithChildren, useMemo} from 'react';
import {TrackPlayerData, useTrackPlayer} from '../context/playerContext';
import {Text, View} from 'react-native';
import {useProgress} from 'react-native-track-player';
import {useTheme} from '@react-navigation/native';

type PlayingProps = {
  playing: Exclude<TrackPlayerData['playing'], null>;
};

function Playing({playing}: PlayingProps) {
  const {colors} = useTheme();
  const progress = useProgress(1000);
  const playedPercent = useMemo(() => {
    return Math.round((progress.position * 100) / progress.duration);
  }, [progress]);
  return (
    <View>
      <View
        style={{height: 4, backgroundColor: colors.border, flexDirection: 'row'}}>
        <View
          style={{
            height: '100%',
            width: `${playedPercent}%`,
            backgroundColor: colors.primary,
          }}
        />
        <View style={{height: '100%', width: `${100 - playedPercent}%`}} />
      </View>
      <View style={{ padding: 18, backgroundColor: colors.card, justifyContent: 'space-around'}}>
        <Text>{playing.song.filename}</Text>
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
