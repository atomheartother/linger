import {Theme, useTheme} from '@react-navigation/native';
import React from 'react';
import {useMemo} from 'react';
import {StyleSheet, Text, TextProps} from 'react-native';

const makeStyles = (_colors: Theme['colors']) =>
  StyleSheet.create({
    listItemMainContent: {
      padding: 10,
      fontWeight: '500',
    },
  });

export function ListItemMainContent({style, ...textProps}: TextProps) {
  const {colors} = useTheme();
  const styles = useMemo(() => makeStyles(colors), [colors]);

  return <Text style={[styles.listItemMainContent, style]} {...textProps} />;
}
