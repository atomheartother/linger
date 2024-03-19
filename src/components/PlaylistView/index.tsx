import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {PlaylistSong, usePlaylists} from '../../context/playlistsContext';
import {useTrackPlayer} from '../../context/playerContext';
import {useTheme} from '@react-navigation/native';
import React, {useEffect, useMemo, useState} from 'react';
import {MusicInfo} from '../../context/songsContext';
import useSelect from '../../hooks/useSelect';
import {PlaylistRouteParams} from '../../routes/types';
import TrackPlayer from 'react-native-track-player';
import {truncateFileName} from '../../utils';
import useFilters from '../../hooks/useFilters';
import {ScrollView, View} from 'react-native';
import {ActionBar, ScreenHeader} from '../../containers';
import IconButton from '../IconButton';
import PlaylistSongDetails from '../PlaylistSongDetails';
import PlaylistViewHeader from './PlaylistViewHeader';
import {FileSystem} from 'react-native-file-access';

const keyFromSongData = (song: MusicInfo & PlaylistSong) => song.uri;

const getQueryFromSong = (x: MusicInfo & PlaylistSong) => x.filename;

export default function PlaylistView({
  route,
}: NativeStackScreenProps<PlaylistRouteParams, 'PlaylistView'>) {
  const {playlists, removeFromPlaylist} = usePlaylists();
  const {addSongs} = useTrackPlayer();
  const {colors} = useTheme();
  const [songData, setSongData] = useState<(MusicInfo & PlaylistSong)[]>([]);
  const {selected, toggleSelected, all, none, invert} = useSelect(
    songData,
    keyFromSongData,
  );
  const playlist = useMemo(() => {
    const res = playlists.find(p => p.id === route.params.id);
    if (!res) {
      throw new Error(
        `Navigated to playlist ${route.params.id} but there is no such playlist`,
      );
    }
    return res;
  }, [route, playlists]);

  const playRandomQueue = async () => {
    const queue: MusicInfo[] = songData.reduce(
      (acc: MusicInfo[], {weight, ...curr}) => [
        ...acc,
        ...Array.from({length: weight}).map<MusicInfo>(() => curr),
      ],
      [],
    );
    TrackPlayer.reset();
    await addSongs(queue.sort(() => Math.random() - 0.5));
    TrackPlayer.play();
  };

  const playFromIndex = async (idx: number) => {
    TrackPlayer.reset();
    await addSongs(songData);
    TrackPlayer.skip(idx);
    TrackPlayer.play();
  };

  useEffect(() => {
    const readFiles = async () => {
      const stats = await Promise.all(
        playlist.songs.map(({uri}) => FileSystem.stat(uri)),
      );
      setSongData(
        stats
          .map(({filename}, i) => ({
            filename: truncateFileName(filename),
            ...playlist.songs[i],
          }))
          .sort((a, b) => a.filename.localeCompare(b.filename)),
      );
    };
    readFiles();
  }, [playlist]);

  const filterData = useFilters(songData, getQueryFromSong);

  return (
    <View style={{flex: 1, backgroundColor: colors.background}}>
      <ScreenHeader>
        <PlaylistViewHeader
          all={all}
          none={none}
          invert={invert}
          selected={selected}
          playlist={playlist}
          playRandomQueue={playRandomQueue}
          {...filterData}
        />
      </ScreenHeader>
      <ScrollView style={{flex: 1}}>
        {filterData.data.map((song, index) => (
          <PlaylistSongDetails
            key={song.uri}
            song={song}
            toggleSelected={toggleSelected}
            playlistId={playlist.id}
            play={() => playFromIndex(index)}
            hasSelected={selected.size > 0}
            isSelected={selected.has(song.uri)}
          />
        ))}
      </ScrollView>
      {selected.size > 0 && (
        <ActionBar>
          <IconButton
            icon="delete"
            size={24}
            onPress={() => removeFromPlaylist(playlist.id, [...selected])}
          />
        </ActionBar>
      )}
    </View>
  );
}
