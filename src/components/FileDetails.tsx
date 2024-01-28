import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {useTrackPlayer} from '../context/playerContext';
import { AndroidScoped } from 'react-native-file-access';

type Props = {
  dir: string;
  name: string;
};

const FileDetails: React.FC<Props> = ({name, dir}) => {
  const {addSong} = useTrackPlayer();
  return (
    <TouchableOpacity
      style={{padding: 10}}
      onPress={() => {
        addSong(name, AndroidScoped.appendPath(dir, name));
      }}>
      <Text>{name}</Text>
    </TouchableOpacity>
  );
};

export default FileDetails;
