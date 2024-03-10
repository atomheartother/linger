import React from 'react';
import {TouchableNativeFeedback} from 'react-native';
import {Playlist} from '../context/playlistsContext';
import {ListItem} from '../containers';
import {ListItemMainContent} from '../texts';

type Props = {
  playlist: Playlist;
  navigate: (id: number) => void;
};

const PlaylistDetails: React.FC<Props> = ({playlist, navigate}) => {
  return (
    <TouchableNativeFeedback
      onPress={() => {
        navigate(playlist.id);
      }}>
      <ListItem>
        <ListItemMainContent>{playlist.name}</ListItemMainContent>
      </ListItem>
    </TouchableNativeFeedback>
  );
};

export default PlaylistDetails;
