import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {Playlist} from '../context/playlistsContext';

type Props = {
  playlist: Playlist;
  navigate: (id: number) => void;
};

const PlaylistDetails: React.FC<Props> = ({playlist, navigate}) => {
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
        navigate(playlist.id);
      }}>
      <Text>{playlist.name}</Text>
    </TouchableOpacity>
  );
};

export default PlaylistDetails;
