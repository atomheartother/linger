import {useTheme} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {Text, TouchableNativeFeedback, View} from 'react-native';
import {PlaylistSong, usePlaylists} from '../../context/playlistsContext';
import {MusicInfo} from '../../context/songsContext';
import Dialog from '../Dialog';
import {LingerButton, LingerInput, ModalContainer} from '../../containers';
import SongDisplay from '../SongDisplay';

type Props = {
  playlistId: number;
  song: PlaylistSong & MusicInfo;
};

export default function PlaylistSongDetails({playlistId, song}: Props) {
  const {colors} = useTheme();
  const {editWeight} = usePlaylists();
  const [modalOpen, setModalOpen] = useState(false);
  const [editedWeight, setEditedWeight] = useState(`${song.weight}`);
  useEffect(() => {
    setEditedWeight(`${song.weight}`);
  }, [song]);

  return (
    <SongDisplay song={song}>
      <TouchableNativeFeedback onPress={() => setModalOpen(true)}>
        <View
          style={{
            padding: 4,
            borderRadius: 4,
            borderWidth: 1,
            borderColor: colors.border,
          }}>
          <Text>Weight: {song.weight}</Text>
        </View>
      </TouchableNativeFeedback>
      <Dialog visible={modalOpen} onRequestClose={() => setModalOpen(false)}>
        <ModalContainer>
          <Text>{song.filename} weight:</Text>
          <LingerInput
            value={editedWeight}
            onChangeText={setEditedWeight}
            inputMode="numeric"
          />
          <LingerButton
            title="ok"
            onPress={() => {
              editWeight(playlistId, song.uri, Number(editedWeight));
              setModalOpen(false);
            }}
          />
        </ModalContainer>
      </Dialog>
    </SongDisplay>
  );
}
