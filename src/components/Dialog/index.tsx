import React from 'react';
import {Modal, ModalProps, Pressable} from 'react-native';

export default function Dialog({children, ...modalProps}: ModalProps) {
  const {onRequestClose} = modalProps;
  return (
    <Modal transparent {...modalProps}>
      <Pressable
        style={{
          backgroundColor: '#000000a0',
          height: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onPress={onRequestClose}>
        {children}
      </Pressable>
    </Modal>
  );
}
