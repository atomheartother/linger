import React, {useCallback, useState} from 'react';
import {FlatList, Text, View} from 'react-native';
import {useTheme} from '@react-navigation/native';
import FileDetails from './FileDetails';
import {MusicInfo} from '../context/songsContext';
import MUIIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Dialog from './Dialog';
import CreatePlaylist from './CreatePlaylist';

type Props = {
  songs: MusicInfo[];
};

const FilesDisplay: React.FC<Props> = ({songs}) => {
  const [openModal, setOpenModal] = useState(false);
  const {colors} = useTheme();
  // When selectedSongs is empty, select mode is inactive
  const [selectedSongs, setSelectedSongs] = useState<Set<string>>(new Set());
  const setSelected = useCallback(
    (uri: string, selected: boolean) => {
      const newSet = new Set(selectedSongs);
      if (!selected) {
        newSet.delete(uri);
      } else {
        newSet.add(uri);
      }
      setSelectedSongs(newSet);
    },
    [selectedSongs],
  );

  const selectAll = () => {
    setSelectedSongs(new Set(songs.map(({uri}) => uri)));
  };

  const invertSelection = () => {
    setSelectedSongs(
      new Set(
        songs.filter(({uri}) => !selectedSongs.has(uri)).map(({uri}) => uri),
      ),
    );
  };

  return (
    <View
      style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: colors.background,
      }}>
      {selectedSongs.size > 0 && (
        <View
          style={{
            backgroundColor: colors.card,
            padding: 10,
            display: 'flex',
            flexDirection: 'row',
            alignContent: 'center',
          }}>
          <View style={{flex: 1}}>
            <Text style={{fontSize: 18, fontWeight: '600'}}>
              {selectedSongs.size} selected
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignContent: 'center',
            }}>
            <MUIIcon onPress={selectAll} name="select-all" size={24} />
            <MUIIcon
              onPress={invertSelection}
              name="select-inverse"
              size={24}
            />
            <MUIIcon
              onPress={() => setOpenModal(true)}
              name="playlist-plus"
              size={24}
            />
          </View>
        </View>
      )}
      <FlatList<MusicInfo>
        data={songs}
        renderItem={({item: song}) => (
          <FileDetails
            key={song.uri}
            song={song}
            selectedSongs={selectedSongs}
            setSelected={setSelected}
          />
        )}
        style={{flex: 1}}
      />
      <Dialog visible={openModal} onRequestClose={() => setOpenModal(false)}>
        <CreatePlaylist close={() => setOpenModal(false)} />
      </Dialog>
    </View>
  );
};

export default FilesDisplay;
