import React, {useMemo} from 'react';
import {useTrackPlayer} from '../context/playerContext';
import {MusicInfo} from '../context/songsContext';
import CheckBox from '@react-native-community/checkbox';
import {useTheme} from '@react-navigation/native';
import SongDisplay from './SongDisplay';

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
    <SongDisplay
      song={song}
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
      {selectedSongs.size > 0 && (
        <CheckBox
          value={isSelected}
          onChange={() => setSelected(song.uri, !isSelected)}
          tintColors={{true: colors.primary, false: colors.border}}
        />
      )}
    </SongDisplay>
  );
};

export default FileDetails;
