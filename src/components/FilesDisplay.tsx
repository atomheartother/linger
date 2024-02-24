import React, {useCallback, useState} from 'react';
import {View} from 'react-native';
import {useTheme} from '@react-navigation/native';
import FileDetails from './FileDetails';
import {MusicInfo} from '../context/songsContext';

type Props = {
  songs: MusicInfo[];
};

const FilesDisplay: React.FC<Props> = ({songs}) => {
  const {colors} = useTheme();
  // When selectedSongs is null, select mode is inactive
  const [selectedSongs, setSelectedSongs] = useState<string[] | null>(null);
  const activateSelectMode = useCallback((uri: string) => {
    setSelectedSongs([uri]);
  }, []);
  const setSelected = useCallback((uri: string, selected: boolean) => {
    if (selected) {
      setSelectedSongs(old => old && old.filter(s => s !== uri));
    } else {
      setSelectedSongs(old => old && [...old, uri]);
    }
  }, []);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.background,
      }}>
      {songs.map(song => (
        <FileDetails
          key={song.uri}
          song={song}
          activateSelectMode={activateSelectMode}
          selectedSongs={selectedSongs}
          setSelected={setSelected}
        />
      ))}
    </View>
  );
};

export default FilesDisplay;
