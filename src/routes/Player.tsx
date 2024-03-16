import React from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParams} from './types';
import {Text, View} from 'react-native';
import {useTheme} from '@react-navigation/native';

export default function Player({}: NativeStackScreenProps<RootStackParams>) {
  const {colors} = useTheme();
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.background,
      }}>
      <Text>Boop</Text>
    </View>
  );
}
