import React from 'react';
import {Pressable, Text, View} from 'react-native';
import {Playlist} from '../context/playlistsContext';
import {ListItem} from '../containers';
import {ListItemMainContent} from '../texts';

type Props = {
  playlist: Playlist;
  onPress: () => void;
  disabled?: boolean;
};

const PlaylistDetails: React.FC<Props> = ({playlist, onPress, disabled}) => {
  return (
    <Pressable
      disabled={disabled}
      android_ripple={{radius: 500}}
      onPress={onPress}>
      <ListItem style={{opacity: disabled ? 0.6 : 1}}>
        <View>
          <ListItemMainContent>{playlist.name}</ListItemMainContent>
          <Text style={{opacity: 0.6}}>{playlist.songs.length} songs</Text>
        </View>
      </ListItem>
    </Pressable>
  );
};

export default PlaylistDetails;
