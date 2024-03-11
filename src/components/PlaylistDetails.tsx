import React from 'react';
import {Pressable} from 'react-native';
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
        <ListItemMainContent>{playlist.name}</ListItemMainContent>
      </ListItem>
    </Pressable>
  );
};

export default PlaylistDetails;
