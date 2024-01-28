import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {useTrackPlayer} from '../context/playerContext';
import {AndroidScoped} from 'react-native-file-access';
import {useTheme} from '@react-navigation/native';
import { MusicInfo } from '../context/songsContext';

type Props = {
  song: MusicInfo;
};

const FileDetails: React.FC<Props> = ({ song }) => {
  const {playSong} = useTrackPlayer();
  const {colors} = useTheme();
  return (
    <TouchableOpacity
      style={{
        padding: 10,
        backgroundColor: colors.card,
        borderColor: colors.border,
        borderWidth: 1,
        marginTop: 5,
      }}
      onPress={() => {
        playSong(song);
      }}>
      <Text>{song.filename}</Text>
    </TouchableOpacity>
  );
};

export default FileDetails;
