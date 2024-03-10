import React, {useMemo} from 'react';
import {Text, TouchableNativeFeedback, View} from 'react-native';
import {useTrackPlayer} from '../context/playerContext';
import {MusicInfo} from '../context/songsContext';
import CheckBox from '@react-native-community/checkbox';
import {ListItem} from '../containers';
import {ListItemMainContent} from '../texts';
import { useTheme } from '@react-navigation/native';

type Props = {
  song: MusicInfo;
  selectedSongs: Set<string>;
  setSelected: (uri: string, selected: boolean) => void;
};

const FileDetails: React.FC<Props> = ({song, selectedSongs, setSelected}) => {
  const {playSong} = useTrackPlayer();
  const {colors} = useTheme();
  const isSelected = useMemo(() => {
    return selectedSongs.has(song.uri);
  }, [song, selectedSongs]);
  return (
    <TouchableNativeFeedback
      onPress={() => {
        if (selectedSongs.size === 0) {
          playSong(song);
        } else {
          setSelected(song.uri, !isSelected);
        }
      }}
      onLongPress={() => {
        setSelected(song.uri, true);
      }}>
      <ListItem>
        <ListItemMainContent>
          <Text>{song.filename}</Text>
        </ListItemMainContent>
        {selectedSongs.size > 0 && (
          <CheckBox
            value={isSelected}
            onChange={() => setSelected(song.uri, !isSelected)}
            tintColors={{true: colors.primary, false: colors.border}}
          />
        )}
      </ListItem>
    </TouchableNativeFeedback>
  );
};

export default FileDetails;
