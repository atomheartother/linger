import React from 'react';
import {Pressable, PressableProps, View} from 'react-native';
import MUIIcon from 'react-native-vector-icons/MaterialIcons';

type Props = PressableProps & {icon: string; size: number; library?: string};

export default function IconButton({icon, size, ...touchableProps}: Props) {
  return (
    <View style={{borderRadius: size, overflow: 'hidden'}}>
      <Pressable android_ripple={{radius: size}} {...touchableProps}>
        <View style={{padding: 2}}>
          <MUIIcon name={icon} size={size} />
        </View>
      </Pressable>
    </View>
  );
}
