import React from 'react';
import {Text, View} from 'react-native';
import {Playlist} from '../../context/playlistsContext';
import IconButton from '../IconButton';
import SelectionControls from '../SelectionControls';
import {UseSelectData} from '../../hooks/useSelect';
import type useFilters from '../../hooks/useFilters';
import SearchBar from '../SearchBar';
import {ControlsContainer} from '../../containers';

type Props = ReturnType<typeof useFilters> &
  Pick<UseSelectData, 'all' | 'none' | 'invert'> & {
    selected: Set<string>;
    playlist: Playlist;
    playRandomQueue: () => void;
  };

function HeaderLeft({
  selected,
  playlist,
  editingFilter,
  query,
  setQuery,
  setEditingFilter,
}: Props) {
  if (selected.size > 0) {
    return (
      <View>
        <Text style={{fontWeight: 'bold'}}>{selected.size} selected</Text>
        <Text style={{opacity: 0.6}}>Out of {playlist.songs.length}</Text>
      </View>
    );
  }
  if (editingFilter) {
    return (
      <SearchBar
        query={query}
        setQuery={setQuery}
        setEditingFilter={setEditingFilter}
      />
    );
  }
  return (
    <View>
      <Text style={{fontWeight: 'bold'}}>{playlist.name}</Text>
      <Text style={{opacity: 0.6}}>{playlist.songs.length} songs</Text>
    </View>
  );
}

function HeaderRight({
  editingFilter,
  setEditingFilter,
  setQuery,
  selected,
  all,
  none,
  invert,
  playRandomQueue,
}: Props) {
  if (selected.size > 0) {
    return <SelectionControls all={all} none={none} invert={invert} />;
  }
  if (editingFilter) {
    return <IconButton onPress={() => setQuery('')} icon="close" size={24} />;
  }
  return (
    <ControlsContainer>
      <IconButton
        onPress={() => setEditingFilter(true)}
        icon="search"
        size={24}
      />
      <IconButton icon="shuffle" size={24} onPress={playRandomQueue} />
    </ControlsContainer>
  );
}

export default function PlaylistViewHeader(props: Props) {
  return (
    <>
      <HeaderLeft {...props} />
      <HeaderRight {...props} />
    </>
  );
}
