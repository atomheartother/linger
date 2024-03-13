import {useTheme} from '@react-navigation/native';
import React, {useCallback, useState} from 'react';
import {Pressable, Text, View} from 'react-native';
import {PlaylistSong} from '../../context/playlistsContext';
import {MusicInfo} from '../../context/songsContext';
import Dialog from '../Dialog';
import SongDisplay from '../SongDisplay';
import EditWeight from './EditWeight';
import CheckBox from '@react-native-community/checkbox';

type Props = {
  playlistId: number;
  song: PlaylistSong & MusicInfo;
  play: () => void;
  hasSelected: boolean;
  isSelected: boolean;
  toggleSelected: (key: string, value: boolean) => void;
};

export default function PlaylistSongDetails({
  playlistId,
  song,
  play,
  isSelected,
  hasSelected,
  toggleSelected,
}: Props) {
  const {colors} = useTheme();
  const [modalOpen, setModalOpen] = useState(false);

  const closeModal = useCallback(() => {
    setModalOpen(false);
  }, []);

  return (
    <SongDisplay
      song={song}
      onPress={() => {
        hasSelected ? toggleSelected(song.uri, !isSelected) : play();
      }}
      onLongPress={() => toggleSelected(song.uri, true)}>
      {!hasSelected ? (
        <Pressable
          onPress={() => {
            setModalOpen(true);
          }}>
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
      ) : (
        <CheckBox
          value={isSelected}
          onChange={() => toggleSelected(song.uri, !isSelected)}
          tintColors={{true: colors.primary, false: colors.border}}
        />
      )}
      <Dialog visible={modalOpen} onRequestClose={closeModal}>
        <EditWeight song={song} playlistId={playlistId} close={closeModal} />
      </Dialog>
    </SongDisplay>
  );
}
