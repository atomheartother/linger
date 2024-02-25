import React, {useMemo} from 'react';
import {Text, TouchableNativeFeedback, View} from 'react-native';
import {useTrackPlayer} from '../context/playerContext';
import {useTheme} from '@react-navigation/native';
import {MusicInfo} from '../context/songsContext';
import CheckBox from '@react-native-community/checkbox';

type Props = {
  song: MusicInfo;
  selectedSongs: string[];
  setSelected: (uri: string, selected: boolean) => void;
};

const FileDetails: React.FC<Props> = ({song, selectedSongs, setSelected}) => {
  const {playSong} = useTrackPlayer();
  const {colors} = useTheme();
  const isSelected = useMemo(() => {
    return selectedSongs.includes(song.uri);
  }, [song, selectedSongs]);
  return (
    <TouchableNativeFeedback
      style={{
        backgroundColor: colors.card,
        borderColor: colors.border,
        borderWidth: 1,
        marginTop: 5,
      }}
      onPress={() => {
        if (selectedSongs.length === 0) {
          playSong(song);
        } else {
          setSelected(song.uri, !isSelected);
        }
      }}
      onLongPress={() => {
        setSelected(song.uri, true);
      }}>
      <View
        style={{
          display: 'flex',
          flex: 1,
          flexDirection: 'row',
          padding: 5,
          justifyContent:
            selectedSongs.length > 0 ? 'space-between' : 'flex-start',
          alignContent: 'center',
        }}>
        <View
          style={{
            flex: 1,
            padding: 10,
            display: 'flex',
            flexDirection: 'row',
            alignContent: 'center',
          }}>
          <Text>{song.filename}</Text>
        </View>
        {selectedSongs.length > 0 && (
          <CheckBox
            value={isSelected}
            onChange={() => setSelected(song.uri, !isSelected)}
          />
        )}
      </View>
    </TouchableNativeFeedback>
  );
};

export default FileDetails;
