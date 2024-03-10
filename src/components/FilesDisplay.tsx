import React, {useCallback, useState} from 'react';
import {FlatList, Text, View} from 'react-native';
import {useTheme} from '@react-navigation/native';
import FileDetails from './FileDetails';
import {MusicInfo} from '../context/songsContext';
import Dialog from './Dialog';
import CreatePlaylist from './CreatePlaylist';
import {ScreenHeader} from '../containers';
import IconButton from './IconButton';

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
      <ScreenHeader>
        <View style={{flex: 1}}>
          <Text style={{fontSize: 18, fontWeight: '600'}}>
            {selectedSongs.size > 0
              ? `${selectedSongs.size} selected`
              : `${songs.length} files`}
          </Text>
        </View>
        {selectedSongs.size > 0 && (
          <View
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'flex-end',
              alignContent: 'center',
              gap: 16
            }}>
            <IconButton onPress={selectAll} icon="select-all" size={22} />
            <IconButton
              onPress={invertSelection}
              icon="select-inverse"
              size={22}
            />
            <IconButton
              onPress={() => setOpenModal(true)}
              icon="playlist-plus"
              size={22}
            />
          </View>
        )}
      </ScreenHeader>
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
        <CreatePlaylist
          close={() => {
            setOpenModal(false);
            setSelectedSongs(new Set());
          }}
          uris={[...selectedSongs]}
        />
      </Dialog>
    </View>
  );
};

export default FilesDisplay;
