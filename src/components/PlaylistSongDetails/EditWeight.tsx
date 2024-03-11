import React, {useEffect, useState} from 'react';
import {Text} from 'react-native';
import {LingerButton, LingerInput, ModalContainer} from '../../containers';
import {usePlaylists} from '../../context/playlistsContext';
import {PlaylistSong} from '../../context/stats';
import {MusicInfo} from '../../context/songsContext';

type Props = {
  playlistId: number;
  song: PlaylistSong & MusicInfo;
  close: () => void;
};

export default function EditWeight({playlistId, song}: Props) {
  const {editWeight} = usePlaylists();
  const [editedWeight, setEditedWeight] = useState(`${song.weight}`);
  useEffect(() => {
    setEditedWeight(`${song.weight}`);
  }, [song]);
  return (
    <ModalContainer>
      <Text>{song.filename} weight:</Text>
      <LingerInput
        value={editedWeight}
        onChangeText={setEditedWeight}
        inputMode="numeric"
      />
      <LingerButton
        title="ok"
        disabled={Number(editedWeight) < 1}
        onPress={() => {
          editWeight(playlistId, song.uri, Number(editedWeight));
        }}
      />
    </ModalContainer>
  );
}
