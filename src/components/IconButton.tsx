import React, {useMemo} from 'react';
import {Pressable, PressableProps, View} from 'react-native';
import MUICommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import MUIIcon from 'react-native-vector-icons/MaterialIcons';

type Props = PressableProps & {icon: string; size: number; library?: string};

export default function IconButton({
  icon,
  size,
  library = 'muicommunity',
  ...touchableProps
}: Props) {
  const IconLibrary = useMemo(() => {
    switch (library) {
      case 'mui':
        return MUIIcon;
      default:
        return MUICommunityIcon;
    }
  }, [library]);

  return (
    <View style={{borderRadius: size, overflow: 'hidden'}}>
      <Pressable android_ripple={{radius: size}} {...touchableProps}>
        <View style={{padding: 2}}>
          <IconLibrary name={icon} size={size} />
        </View>
      </Pressable>
    </View>
  );
}
