import React, {useCallback, useState} from 'react';
import {FlatList, Text, View} from 'react-native';
import {useTheme} from '@react-navigation/native';
import FileDetails from './FileDetails';
import {MusicInfo} from '../context/songsContext';

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
      {selectedSongs.length > 0 && (
        <View style={{backgroundColor: colors.card, padding: 10}}>
          <Text>Testaaaaa</Text>
        </View>
      )}
    </View>
  );
};

export default FilesDisplay;
