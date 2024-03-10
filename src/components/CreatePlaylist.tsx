import React from 'react';
import {useTheme} from '@react-navigation/native';
import {useState} from 'react';
import {Button, Text, TextInput, View} from 'react-native';
import {usePlaylists} from '../context/playlistsContext';
import {LingerButton, LingerInput, ModalContainer} from '../containers';

type Props = {
  close: () => void;
  uris: string[];
};

export default function CreatePlaylist({close, uris}: Props) {
  const {colors} = useTheme();
  const [name, setName] = useState('');
  const {createPlaylist} = usePlaylists();

  const onButtonPress = () => {
    createPlaylist({name, songs: uris.map(uri => ({uri, weight: 1}))});
    close();
  };

  return (
    <ModalContainer>
      <Text style={{fontWeight: 'bold'}}>Create new playlist</Text>
      <LingerInput onChangeText={setName} value={name} />
      <LingerButton onPress={onButtonPress} title="Create" />
    </ModalContainer>
  );
}
