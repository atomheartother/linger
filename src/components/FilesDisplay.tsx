import React, {useCallback, useState} from 'react';
import {FlatList, Text, View} from 'react-native';
import {useTheme} from '@react-navigation/native';
import FileDetails from './FileDetails';
import {MusicInfo} from '../context/songsContext';
import MUIIcon from 'react-native-vector-icons/MaterialCommunityIcons';

type Props = {
  songs: MusicInfo[];
};

const FilesDisplay: React.FC<Props> = ({songs}) => {
  const {colors} = useTheme();
  // When selectedSongs is empty, select mode is inactive
  const [selectedSongs, setSelectedSongs] = useState<string[]>([]);
  const setSelected = useCallback((uri: string, selected: boolean) => {
    if (!selected) {
      setSelectedSongs(old => old && old.filter(s => s !== uri));
    } else {
      setSelectedSongs(old => old && [...old, uri]);
    }
  }, []);

  return (
    <View
      style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: colors.background,
      }}>
      {selectedSongs.length > 0 && (
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
              {selectedSongs.length} selected
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignContent: 'center'
            }}>
            <MUIIcon name="select-all" size={24} />
            <MUIIcon name="select-inverse" size={24} />
            <MUIIcon name="playlist-plus" size={24} />
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
    </View>
  );
};

export default FilesDisplay;
