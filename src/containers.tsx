import {Theme, useTheme} from '@react-navigation/native';
import React, {useMemo} from 'react';
import {
  View,
  StyleSheet,
  ViewProps,
  ButtonProps,
  Button,
  TextInputProps,
  TextInput,
} from 'react-native';

const makeStyles = (colors: Theme['colors']) =>
  StyleSheet.create({
    screenHeader: {
      padding: 16,
      backgroundColor: colors.card,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
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
      gap: 5,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    controlsContainer: {
      display: 'flex',
      flexDirection: 'row',
      alignContent: 'center',
      gap: 16,
    },
    textInput: {
      borderWidth: 1,
      borderColor: colors.text,
      borderRadius: 5,
      padding: 2,
      paddingLeft: 8,
    },
    actionBar: {
      borderTopWidth: 1,
      borderColor: colors.border,
      backgroundColor: colors.background,
      padding: 8,
      justifyContent: 'center',
      alignItems: 'center',
    }
  });

export function ScreenHeader({style, ...viewProps}: ViewProps) {
  const {colors} = useTheme();
  const styles = useMemo(() => makeStyles(colors), [colors]);

  return <View style={[styles.screenHeader, style]} {...viewProps} />;
}

export function LingerButton({...buttonProps}: ButtonProps) {
  const {colors} = useTheme();

  return <Button color={colors.primary} {...buttonProps} />;
}

export function ModalContainer({style, ...modalProps}: ViewProps) {
  const {colors} = useTheme();
  const styles = useMemo(() => makeStyles(colors), [colors]);

  return (
    <View
      onStartShouldSetResponder={() => true}
      onTouchEnd={e => e.stopPropagation()}
      style={[styles.modal, style]}
      {...modalProps}
    />
  );
}

export function ListItem({style, ...itemProps}: ViewProps) {
  const {colors} = useTheme();
  const styles = useMemo(() => makeStyles(colors), [colors]);

  return <View style={[styles.listItem, style]} {...itemProps} />;
}

export function LingerInput({style, ...inputProps}: TextInputProps) {
  const {colors} = useTheme();
  const styles = useMemo(() => makeStyles(colors), [colors]);

  return <TextInput style={[styles.textInput, style]} {...inputProps} />;
}

export function ActionBar({style, ...viewProps}: ViewProps) {
  const {colors} = useTheme();
  const styles = useMemo(() => makeStyles(colors), [colors]);

  return <View style={[styles.actionBar, style]} {...viewProps} />;
}

export function ControlsContainer({style, ...viewProps}: ViewProps) {
  const {colors} = useTheme();
  const styles = useMemo(() => makeStyles(colors), [colors]);

  return <View style={[styles.controlsContainer, style]} {...viewProps} />;
}
