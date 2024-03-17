import MUIIcon from 'react-native-vector-icons/MaterialIcons';
import {DimensionValue, View} from 'react-native';
import React, {useMemo} from 'react';
import {useTheme} from '@react-navigation/native';

type Props = {
  iconSize: 'small' | 'medium' | 'large';
  width?: DimensionValue;
  height?: DimensionValue;
};

export default function FakeAlbumArt({iconSize, width, height}: Props) {
  const {colors} = useTheme();
  const size = useMemo(() => {
    if (iconSize === 'small') {
      return 18;
    }
    if (iconSize === 'medium') {
      return 24;
    }
    return 72;
  }, [iconSize]);
  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.border,
        width: width ?? size * 2,
        height: height ?? size * 2,
        borderRadius: 5,
      }}>
      <MUIIcon name="music-note" size={size} color={colors.text} />
    </View>
  );
}
