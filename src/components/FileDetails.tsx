import React, {useMemo} from 'react';
import {useTrackPlayer} from '../context/playerContext';
import {MusicInfo} from '../context/songsContext';
import CheckBox from '@react-native-community/checkbox';
import {useTheme} from '@react-navigation/native';
import SongDisplay from './SongDisplay';

type Props = {
  song: MusicInfo;
  setSelected: (uri: string, selected: boolean) => void;
  // There is a selected song
  hasSelected: boolean;
  // We're selected
  isSelected: boolean;
};

const FileDetails: React.FC<Props> = ({
  song,
  hasSelected,
  isSelected,
  setSelected,
}) => {
  const {playSong} = useTrackPlayer();
  const {colors} = useTheme();
  return (
    <SongDisplay
      song={song}
      onPress={() => {
        if (!hasSelected) {
          playSong(song);
        } else {
          setSelected(song.uri, !isSelected);
        }
      }}
      onLongPress={() => {
        setSelected(song.uri, true);
      }}>
      <CheckBox
        style={{opacity: Number(hasSelected)}}
        disabled={!hasSelected}
        value={isSelected}
        onChange={() => setSelected(song.uri, !isSelected)}
        tintColors={{true: colors.primary, false: colors.border}}
      />
    </SongDisplay>
  );
};

export default FileDetails;
