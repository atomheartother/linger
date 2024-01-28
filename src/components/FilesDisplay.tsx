import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {useTheme} from '@react-navigation/native';
import FileDetails from './FileDetails';

type Props = {
  dirUri: string;
  files: string[];
};

const FilesDisplay: React.FC<Props> = ({dirUri, files}) => {
  const {colors} = useTheme();

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.background,
      }}>
      {files.map(file => (
        <FileDetails key={file} dir={dirUri} name={file} />
      ))}
    </View>
  );
};

export default FilesDisplay;
