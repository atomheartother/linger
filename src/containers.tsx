import {Theme, useTheme} from '@react-navigation/native';
import React, {useMemo} from 'react';
import {View, StyleSheet, ViewProps, ButtonProps, Button} from 'react-native';

const makeStyles = (colors: Theme['colors']) =>
  StyleSheet.create({
    screenHeader: {
      padding: 16,
      backgroundColor: colors.card,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    button: {
      borderRadius: 5,
    },
    modal: {
      backgroundColor: colors.card,
      padding: 16,
      gap: 8,
      borderRadius: 5,
      width: '75%',
    },
    listItem: {
      padding: 5,
      justifyContent: 'space-between',
      alignItems: 'center',
      flexDirection: 'row',
      borderBottomColor: colors.border,
      borderBottomWidth: 1,
    },
  });

export function ScreenHeader({style, ...viewProps}: ViewProps) {
  const {colors} = useTheme();
  const styles = useMemo(() => makeStyles(colors), [colors]);

  return <View style={[styles.screenHeader, style]} {...viewProps} />;
}

export function LingerButton({style, ...buttonProps}: ButtonProps) {
  const {colors} = useTheme();
  const styles = useMemo(() => makeStyles(colors), [colors]);

  return <Button style={[styles.button, style]} {...buttonProps} />;
}

export function ModalContainer({style, ...modalProps}: ViewProps) {
  const {colors} = useTheme();
  const styles = useMemo(() => makeStyles(colors), [colors]);

  return <View style={[styles.modal, style]} {...modalProps} />;
}

export function ListItem({style, ...itemProps}: ViewProps) {
  const {colors} = useTheme();
  const styles = useMemo(() => makeStyles(colors), [colors]);

  return <View style={[styles.listItem, style]} {...itemProps} />;
}
