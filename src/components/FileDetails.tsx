import React, {useMemo} from 'react';
import {Text, TouchableNativeFeedback, View} from 'react-native';
import {useTrackPlayer} from '../context/playerContext';
import {useTheme} from '@react-navigation/native';
import {MusicInfo} from '../context/songsContext';
import CheckBox from '@react-native-community/checkbox';

type Props = {
  song: MusicInfo;
  activateSelectMode: (uri: string) => void;
  selectedSongs: string[] | null;
  setSelected: (uri: string, selected: boolean) => void;
};

const FileDetails: React.FC<Props> = ({
  song,
  activateSelectMode,
  selectedSongs,
  setSelected,
}) => {
  const {playSong} = useTrackPlayer();
  const {colors} = useTheme();
  const isSelected = useMemo(() => {
    if (!selectedSongs) {
      return false;
    }
    return selectedSongs.includes(song.uri);
  }, [song, selectedSongs]);
  return (
    <TouchableNativeFeedback
      style={{
        padding: 10,
        backgroundColor: colors.card,
        borderColor: colors.border,
        borderWidth: 1,
        marginTop: 5,
      }}
      onPress={() => {
        if (selectedSongs === null) {
          playSong(song);
        } else {
          setSelected(song.uri, !isSelected);
        }
      }}
      onLongPress={() => {
        activateSelectMode(song.uri);
      }}>
      <View style={{flex: 1}}>
        <Text>{song.filename}</Text>
      </View>
      {selectedSongs !== null && (
        <CheckBox
          value={isSelected}
          onChange={() => setSelected(song.uri, !isSelected)}
        />
      )}
    </TouchableNativeFeedback>
  );
};

export default FileDetails;
