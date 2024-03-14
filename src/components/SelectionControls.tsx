import React from 'react';
import {View} from 'react-native';
import {UseSelectData} from '../hooks/useSelect';
import IconButton from './IconButton';

type Props = {
  all: UseSelectData['all'];
  invert: UseSelectData['invert'];
  none: UseSelectData['none'];
};
export default function SelectionControls({all, invert, none}: Props) {
  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignContent: 'center',
        gap: 16,
      }}>
      <IconButton onPress={all} icon="select-all" size={24} />
      <IconButton onPress={invert} icon="select-inverse" size={24} />
      <IconButton onPress={none} icon="close" size={24} />
    </View>
  );
}
