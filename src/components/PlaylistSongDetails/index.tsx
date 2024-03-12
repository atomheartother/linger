import {useTheme} from '@react-navigation/native';
import React, {useCallback, useState} from 'react';
import {Pressable, Text, View} from 'react-native';
import {PlaylistSong} from '../../context/playlistsContext';
import {MusicInfo} from '../../context/songsContext';
import Dialog from '../Dialog';
import SongDisplay from '../SongDisplay';
import EditWeight from './EditWeight';

type Props = {
  playlistId: number;
  song: PlaylistSong & MusicInfo;
  play: () => void;
};

export default function PlaylistSongDetails({playlistId, song, play}: Props) {
  const {colors} = useTheme();
  const [modalOpen, setModalOpen] = useState(false);

  const closeModal = useCallback(() => {
    setModalOpen(false);
  }, []);
  return (
    <SongDisplay song={song} onPress={play}>
      <Pressable onPress={() => setModalOpen(true)}>
        <View
          style={{
            padding: 4,
            borderRadius: 4,
            borderWidth: 1,
            borderColor: colors.border,
          }}>
          <Text>Weight: {song.weight}</Text>
        </View>
      </Pressable>
      <Dialog visible={modalOpen} onRequestClose={closeModal}>
        <EditWeight song={song} playlistId={playlistId} close={closeModal} />
      </Dialog>
    </SongDisplay>
  );
}
