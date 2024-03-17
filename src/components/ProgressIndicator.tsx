import {useTheme} from '@react-navigation/native';
import React, {useMemo} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useProgress} from 'react-native-track-player';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'column',
    gap: 15,
  },
  loadingBar: {
    width: '100%',
    flexDirection: 'row',
  },
  timesContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

type Props = {
  fullScreen?: boolean;
};

const timeDisplay = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const secondsRemaining = Math.floor(seconds % 60);
  const minutesStr = minutes < 10 ? `0${minutes}` : `${minutes}`;
  const secondsStr =
    secondsRemaining < 10 ? `0${secondsRemaining}` : `${secondsRemaining}`;
  return `${minutesStr}:${secondsStr}`;
};

export default function ProgressIndicator({fullScreen}: Props) {
  const {colors} = useTheme();
  const progress = useProgress(500);
  const [playedPercent, position, duration] = useMemo(
    () => [
      Math.round((progress.position * 100) / progress.duration),
      timeDisplay(progress.position),
      timeDisplay(progress.duration),
    ],
    [progress],
  );

  return (
    <View style={styles.container}>
      <View style={[styles.loadingBar]}>
        <View
          style={{
            height: 4,
            width: `${playedPercent}%`,
            backgroundColor: colors.primary,
          }}
        />
        <View
          style={{
            height: 4,
            width: `${100 - playedPercent}%`,
            backgroundColor: colors.card,
          }}
        />
      </View>
      {fullScreen && (
        <View style={styles.timesContainer}>
          <Text style={{textAlign: 'left'}}>{position}</Text>
          <Text style={{textAlign: 'right'}}>{duration}</Text>
        </View>
      )}
    </View>
  );
}
