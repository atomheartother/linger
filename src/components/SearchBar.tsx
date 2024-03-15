import React from 'react';
import {TextInput, View} from 'react-native';
import IconButton from './IconButton';

type Props = {
  query: string;
  setQuery: (x: string) => void;
  setEditingFilter: (x: boolean) => void;
};

export default function SearchBar({query, setQuery, setEditingFilter}: Props) {
  return (
    <View style={{flex: 1, flexDirection: 'row', gap: 16}}>
      <IconButton
        icon="arrow-back"
        size={24}
        onPress={() => setEditingFilter(false)}
      />
      <TextInput
        value={query}
        placeholder="Search..."
        inputMode="search"
        onChangeText={setQuery}
        onSubmitEditing={() => setEditingFilter(false)}
        autoFocus
        blurOnSubmit
        onBlur={() => setEditingFilter(false)}
        style={{
          padding: 3,
          flex: 1,
        }}
      />
    </View>
  );
}
