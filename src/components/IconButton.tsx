import {Theme, useTheme} from '@react-navigation/native';
import React from 'react';
import {Pressable, PressableProps, View} from 'react-native';
import MUIIcon from 'react-native-vector-icons/MaterialIcons';

type Props = PressableProps & {
  icon: string;
  size: number;
  library?: string;
  color?: keyof Theme['colors'];
};

const ICON_PADDING = 5;

export default function IconButton({
  icon,
  size,
  color,
  ...touchableProps
}: Props) {
  const {colors} = useTheme();
  return (
    <View style={{borderRadius: size, overflow: 'hidden'}}>
      <Pressable
        android_ripple={{radius: size + ICON_PADDING}}
        {...touchableProps}>
        <View style={{padding: ICON_PADDING}}>
          <MUIIcon name={icon} size={size} color={color && colors[color]} />
        </View>
      </Pressable>
    </View>
  );
}
