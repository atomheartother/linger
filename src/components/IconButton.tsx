import {useTheme} from '@react-navigation/native';
import React from 'react';
import {Pressable, PressableProps, View} from 'react-native';
import MUIIcon from 'react-native-vector-icons/MaterialCommunityIcons';

type Props = PressableProps & {icon: string; size: number};

export default function IconButton({icon, size, ...touchableProps}: Props) {
  const {colors} = useTheme();
  return (
    <View style={{borderRadius: size, overflow: 'hidden'}}>
      <Pressable
        style={{borderRadius: 20}}
        android_ripple={{radius: size}}
        {...touchableProps}>
        <View style={{padding: 2}}>
          <MUIIcon name={icon} size={size} />
        </View>
      </Pressable>
    </View>
  );
}
