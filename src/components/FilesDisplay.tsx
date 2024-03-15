import React, {useState} from 'react';
import {FlatList, Text, View} from 'react-native';
import {useTheme} from '@react-navigation/native';
import FileDetails from './FileDetails';
import {MusicInfo, useSongs} from '../context/songsContext';
import Dialog from './Dialog';
import CreatePlaylist from './CreatePlaylist';
import {ActionBar, ScreenHeader} from '../containers';
import IconButton from './IconButton';
import useSelect from '../hooks/useSelect';
import SelectionControls from './SelectionControls';
import useFilters from '../hooks/useFilters';
import FilterControls from './FilterControls';
import SearchBar from './SearchBar';

type Props = {
  songs: MusicInfo[];
};

const getKeyFromSong = (song: MusicInfo) => song.uri;
const getQueryFromSong = (song: MusicInfo) => song.filename;

const FilesDisplay: React.FC<Props> = ({songs}) => {
  const [openModal, setOpenModal] = useState(false);
  const {colors} = useTheme();
  const {refresh, refreshing} = useSongs();
  // When selectedSongs is empty, select mode is inactive
  const {selected, toggleSelected, all, invert, none} = useSelect(
    songs,
    getKeyFromSong,
  );

  const {data, query, setQuery, editingFilter, setEditingFilter} = useFilters(
    songs,
    getQueryFromSong,
  );

  const hasSelected = selected.size > 0;

  return (
    <View
      style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: colors.background,
      }}>
      <ScreenHeader>
        {!editingFilter || selected.size !== 0 ? (
          <View style={{flex: 1}}>
            <Text style={{fontSize: 18, fontWeight: '600'}}>
              {selected.size > 0
                ? `${selected.size} selected`
                : `${songs.length} files`}
            </Text>
          </View>
        ) : (
          <SearchBar
            query={query}
            setQuery={setQuery}
            setEditingFilter={setEditingFilter}
          />
        )}
        {hasSelected ? (
          <SelectionControls all={all} invert={invert} none={none} />
        ) : (
          <FilterControls
            editingFilter={editingFilter}
            setEditingFilter={setEditingFilter}
            clearQueryString={() => setQuery('')}
          />
        )}
      </ScreenHeader>
      <FlatList<MusicInfo>
        data={data}
        refreshing={refreshing}
        onRefresh={refresh}
        removeClippedSubviews
        initialNumToRender={15}
        windowSize={11}
        renderItem={({item: song}) => (
          <FileDetails
            key={song.uri}
            song={song}
            setSelected={toggleSelected}
            isSelected={selected.has(song.uri)}
            hasSelected={hasSelected}
          />
        )}
        style={{flex: 1}}
      />
      {selected.size > 0 && (
        <ActionBar>
          <IconButton
            icon="playlist-plus"
            size={24}
            onPress={() => setOpenModal(true)}
          />
        </ActionBar>
      )}
      <Dialog visible={openModal} onRequestClose={() => setOpenModal(false)}>
        <CreatePlaylist
          close={() => {
            setOpenModal(false);
            none();
          }}
          uris={[...selected]}
        />
      </Dialog>
    </View>
  );
};

export default FilesDisplay;
