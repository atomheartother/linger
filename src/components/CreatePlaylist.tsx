import React from 'react';
import {useState} from 'react';
import {Pressable, ScrollView, Text} from 'react-native';
import MUIIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {usePlaylists} from '../context/playlistsContext';
import {
  LingerButton,
  LingerInput,
  ListItem,
  ModalContainer,
} from '../containers';
import PlaylistDetails from './PlaylistDetails';
import {ListItemMainContent} from '../texts';

type Props = {
  close: () => void;
  uris: string[];
};

type Screen = 'select' | 'create';

export default function CreatePlaylist({close, uris}: Props) {
  const [screen, setScreen] = useState<Screen>('select');
  const [name, setName] = useState('');
  const {createPlaylist, playlists, addToPlaylist} = usePlaylists();

  if (screen === 'select') {
    return (
      <ModalContainer>
        <Text style={{fontWeight: 'bold'}}>Add to playlist</Text>
        <ScrollView>
          {playlists.map(playlist => (
            <PlaylistDetails
              key={playlist.id}
              playlist={playlist}
              onPress={() => {
                addToPlaylist(playlist.id, uris);
                close();
              }}
              disabled={uris.every(u => playlist.songs.find(s => s.uri === u))}
            />
          ))}
          <Pressable
            android_ripple={{radius: 500}}
            onPress={() => setScreen('create')}>
            <ListItem style={{justifyContent: 'flex-start', gap: 1}}>
              <MUIIcon name="plus" size={16} />
              <ListItemMainContent>New playlist</ListItemMainContent>
            </ListItem>
          </Pressable>
        </ScrollView>
      </ModalContainer>
    );
  }

  return (
    <ModalContainer>
      <Text style={{fontWeight: 'bold'}}>Create new playlist</Text>
      <LingerInput onChangeText={setName} value={name} />
      <LingerButton
        disabled={name.length < 1}
        onPress={() => {
          createPlaylist({name, songs: uris.map(uri => ({uri, weight: 1}))});
          close();
        }}
        title="Create"
      />
    </ModalContainer>
  );
}
