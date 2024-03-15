import React, {useMemo} from 'react';
import {Pressable, PressableProps, Text, View} from 'react-native';
import MUIIcon from 'react-native-vector-icons/MaterialIcons';
import {MusicInfo} from '../context/songsContext';
import {ListItem} from '../containers';
import {ListItemMainContent} from '../texts';
import {useActiveTrack} from 'react-native-track-player';
import {useTheme} from '@react-navigation/native';
import {useStats} from '../context/stats';

type Props = PressableProps & {
  song: MusicInfo;
};

export default function SongDisplay({song, children, ...props}: Props) {
  const track = useActiveTrack();
  const {colors} = useTheme();
  const isActiveSong = useMemo(() => song.uri === track?.url, [song, track]);
  const {playStats} = useStats();
  if (typeof children === 'function') {
    throw new Error("SongDisplay can't take a function as a child.");
  }
  return (
    <Pressable android_ripple={{radius: 500}} {...props}>
      <ListItem>
        <MUIIcon
          color={colors.primary}
          name="play-arrow"
          style={{opacity: Number(isActiveSong)}}
          size={22}
        />
        <View style={{flex: 1}}>
          <ListItemMainContent
            style={{color: isActiveSong ? colors.primary : colors.text}}>
            {song.filename}
          </ListItemMainContent>
          <Text style={{opacity: 0.6}}>
            {playStats[song.uri]?.playCount || 0} plays
          </Text>
        </View>
        {children}
      </ListItem>
    </Pressable>
  );
}
