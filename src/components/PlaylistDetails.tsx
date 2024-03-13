import React from 'react';
import {Pressable, Text, View} from 'react-native';
import {Playlist} from '../context/playlistsContext';
import {ListItem} from '../containers';
import {ListItemMainContent} from '../texts';

type Props = {
  playlist: Playlist;
  navigate: (id: number) => void;
};

const PlaylistDetails: React.FC<Props> = ({playlist, navigate}) => {
  return (
    <Pressable
      android_ripple={{radius: 500}}
      onPress={() => {
        navigate(playlist.id);
      }}>
      <ListItem>
        <View>
          <ListItemMainContent>{playlist.name}</ListItemMainContent>
          <Text style={{opacity: 0.6}}>{playlist.songs.length} songs</Text>
        </View>
      </ListItem>
    </Pressable>
  );
};

export default PlaylistDetails;
