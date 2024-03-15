import React from 'react';
import {UseSelectData} from '../hooks/useSelect';
import IconButton from './IconButton';
import {ControlsContainer} from '../containers';

type Props = {
  all: UseSelectData['all'];
  invert: UseSelectData['invert'];
  none: UseSelectData['none'];
};
export default function SelectionControls({all, invert, none}: Props) {
  return (
    <ControlsContainer>
      <IconButton onPress={all} icon="select-all" size={24} />
      <IconButton onPress={invert} icon="copy-all" size={24} />
      <IconButton onPress={none} icon="deselect" size={24} />
    </ControlsContainer>
  );
}
