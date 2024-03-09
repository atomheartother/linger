import React from 'react';
import {useTheme} from '@react-navigation/native';
import {useState} from 'react';
import {Button, Text, TextInput, View} from 'react-native';

type Props = {
  close: () => void;
};

export default function CreateModal({close}: Props) {
  const {colors} = useTheme();
  const [name, setName] = useState('');

  return (
    <View
      style={{
        backgroundColor: colors.card,
        padding: 16,
        gap: 16,
        width: '75%',
      }}>
      <Text style={{fontWeight: 'bold'}}>Create new playlist</Text>
      <TextInput
        style={{
          borderWidth: 1,
          borderColor: colors.text,
          borderRadius: 5,
          padding: 2,
          paddingLeft: 8,
        }}
        onChangeText={setName}
        value={name}
      />
      <Button title="Create" />
    </View>
  );
}
