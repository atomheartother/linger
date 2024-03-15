import React from 'react';
import IconButton from './IconButton';
import {ControlsContainer} from '../containers';

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
    <ControlsContainer>
      <IconButton
        onPress={() =>
          editingFilter ? clearQueryString() : setEditingFilter(true)
        }
        icon={editingFilter ? 'close' : 'search'}
        size={24}
      />
    </ControlsContainer>
  );
}
