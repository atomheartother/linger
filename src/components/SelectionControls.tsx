import React from 'react';
import {View} from 'react-native';
import {UseSelectData} from '../hooks/useSelect';
import IconButton from './IconButton';

type Props = {
  hasSelected: boolean;
  all: UseSelectData['all'];
  invert: UseSelectData['invert'];
  none: UseSelectData['none'];
};
export default function SelectionControls({
  hasSelected,
  all,
  invert,
  none,
}: Props) {
  return (
    <View
      style={{
        display: 'flex',
        opacity: Number(hasSelected),
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignContent: 'center',
        gap: 16,
      }}>
      <IconButton
        disabled={!hasSelected}
        onPress={all}
        icon="select-all"
        size={24}
      />
      <IconButton
        disabled={!hasSelected}
        onPress={invert}
        icon="select-inverse"
        size={24}
      />
      <IconButton
        disabled={!hasSelected}
        onPress={none}
        icon="close"
        size={24}
      />
    </View>
  );
}
