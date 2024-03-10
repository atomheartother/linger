import React from 'react';
import {TouchableNativeFeedback, View} from 'react-native';
import {TouchableNativeFeedbackProps} from 'react-native';
import MUIIcon from 'react-native-vector-icons/MaterialCommunityIcons';

type Props = TouchableNativeFeedbackProps & {icon: string; size: number};

export default function IconButton({icon, size, ...touchableProps}: Props) {
  return (
    <TouchableNativeFeedback {...touchableProps}>
      <View style={{padding: 2}}>
        <MUIIcon name={icon} size={size} />
      </View>
    </TouchableNativeFeedback>
  );
}
