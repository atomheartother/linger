import {useTheme} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  Button,
  Text,
  TextInput,
  TouchableNativeFeedback,
  View,
} from 'react-native';
import {PlaylistSong, usePlaylists} from '../../context/playlistsContext';
import {MusicInfo} from '../../context/songsContext';
import Dialog from '../Dialog';

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
    <View
      key={song.uri}
      style={{
        padding: 5,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        borderBottomColor: colors.border,
        borderBottomWidth: 1,
      }}>
      <Text style={{padding: 10}}>{song.filename}</Text>
      <View>
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
      </View>
      <Dialog visible={modalOpen} onRequestClose={() => setModalOpen(false)}>
        <View style={{backgroundColor: colors.card, padding: 16, gap: 8}}>
          <Text>{song.filename} weight:</Text>
          <TextInput
            value={editedWeight}
            onChangeText={setEditedWeight}
            inputMode="numeric"
          />
          <Button
            title="ok"
            style={{
              borderRadius: 5,
            }}
            onPress={() => {
              editWeight(playlistId, song.uri, Number(editedWeight));
              setModalOpen(false);
            }}
          />
        </View>
      </Dialog>
    </View>
  );
}
