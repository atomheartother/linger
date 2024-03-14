import React from 'react';
import {View} from 'react-native';
import IconButton from './IconButton';

type Props = {
  editingFilter: boolean;
  setEditingFilter: (x: boolean) => void;
  clearQueryString: () => void;
};
export default function FilterControls({
  editingFilter,
  setEditingFilter,
  clearQueryString,
}: Props) {
  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignContent: 'center',
        gap: 16,
      }}>
      <IconButton
        onPress={() =>
          editingFilter ? clearQueryString() : setEditingFilter(!editingFilter)
        }
        icon={editingFilter ? 'close' : 'search'}
        library="mui"
        size={24}
      />
    </View>
  );
}
