import React from 'react';
import {View} from 'react-native';
import {useTheme} from '@react-navigation/native';
import FileDetails from './FileDetails';
import { MusicInfo } from '../context/songsContext';

type Props = {
  songs: MusicInfo[];
};

const FilesDisplay: React.FC<Props> = ({songs}) => {
  const {colors} = useTheme();

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.background,
      }}>
      {songs.map(song => (
        <FileDetails key={song.uri} song={song} />
      ))}
    </View>
  );
};

export default FilesDisplay;
