import React, {useMemo} from 'react';
import {
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

type Props = TouchableNativeFeedbackProps & {
  song: MusicInfo;
};

export default function SongDisplay({song, children, ...props}: Props) {
  const track = useActiveTrack();
  const {colors} = useTheme();
  const isActiveSong = useMemo(() => song.uri === track?.url, [song, track]);
  return (
    <TouchableNativeFeedback {...props}>
      <ListItem>
        <View style={{flexDirection: 'row', alignItems: 'center', gap: 8}}>
          <MUIIcon
            color={colors.primary}
            name="play"
            style={{opacity: Number(isActiveSong)}}
            size={22}
          />
          <ListItemMainContent
            style={{color: isActiveSong ? colors.primary : colors.text}}>
            {song.filename}
          </ListItemMainContent>
        </View>
        {children}
      </ListItem>
    </TouchableNativeFeedback>
  );
}
