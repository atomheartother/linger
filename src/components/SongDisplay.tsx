import React, {useMemo} from 'react';
import {
  Text,
  TouchableNativeFeedback,
  TouchableNativeFeedbackProps,
  View,
} from 'react-native';
import MUIIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {MusicInfo} from '../context/songsContext';
import {ListItem} from '../containers';
import {ListItemMainContent} from '../texts';
import {useActiveTrack} from 'react-native-track-player';
import {useTheme} from '@react-navigation/native';
import {useStats} from '../context/stats';

type Props = TouchableNativeFeedbackProps & {
  song: MusicInfo;
};

export default function SongDisplay({song, children, ...props}: Props) {
  const track = useActiveTrack();
  const {colors} = useTheme();
  const isActiveSong = useMemo(() => song.uri === track?.url, [song, track]);
  const {playStats} = useStats();
  return (
    <TouchableNativeFeedback {...props}>
      <ListItem>
        <MUIIcon
          color={colors.primary}
          name="play"
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
    </TouchableNativeFeedback>
  );
}
