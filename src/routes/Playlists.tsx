import * as React from 'react';
import {ScrollView, Text, View} from 'react-native';
import {PlaylistSong, usePlaylists} from '../context/playlistsContext';
import {useTheme} from '@react-navigation/native';
import {
  NativeStackScreenProps,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import PlaylistDetails from '../components/PlaylistDetails';
import {FileSystem} from 'react-native-file-access';
import {MusicInfo} from '../context/songsContext';
import PlaylistSongDetails from '../components/PlaylistSongDetails';
import {useTrackPlayer} from '../context/playerContext';
import {ActionBar, ScreenHeader} from '../containers';
import PlayingWrapper from '../components/PlayingWrapper';
import IconButton from '../components/IconButton';
import TrackPlayer from 'react-native-track-player';
import {truncateFileName} from '../utils';
import type {PlaylistRouteParams} from './types';
import useSelect from '../hooks/useSelect';
import SelectionControls from '../components/SelectionControls';

const Stack = createNativeStackNavigator<PlaylistRouteParams>();

const keyFromSongData = (song: MusicInfo & PlaylistSong) => song.uri;

const PlaylistView: React.FC<
  NativeStackScreenProps<PlaylistRouteParams, 'PlaylistView'>
> = ({route}) => {
  const {playlists, removeFromPlaylist} = usePlaylists();
  const {addSongs} = useTrackPlayer();
  const {colors} = useTheme();
  const [songData, setSongData] = React.useState<(MusicInfo & PlaylistSong)[]>(
    [],
  );
  const {selected, toggleSelected, all, none, invert} = useSelect(
    songData,
    keyFromSongData,
  );
  const playlist = React.useMemo(() => {
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

  React.useEffect(() => {
    const readFiles = async () => {
      const stats = await Promise.all(
        playlist.songs.map(({uri}) => FileSystem.stat(uri)),
      );
      setSongData(
        stats.map(({filename}, i) => ({
          filename: truncateFileName(filename),
          ...playlist.songs[i],
        })),
      );
    };
    readFiles();
  }, [playlist]);

  const hasSelected = selected.size > 0;

  return (
    <View style={{flex: 1, backgroundColor: colors.background}}>
      <ScreenHeader>
        {!hasSelected ? (
          <>
            <View>
              <Text style={{fontWeight: 'bold'}}>{playlist.name}</Text>
              <Text style={{opacity: 0.6}}>{playlist.songs.length} songs</Text>
            </View>
            <View style={{flexDirection: 'row', gap: 2}}>
              <IconButton
                icon="shuffle-variant"
                size={20}
                onPress={playRandomQueue}
              />
            </View>
          </>
        ) : (
          <>
            <Text style={{fontSize: 18, fontWeight: '600'}}>
              {selected.size} selected
            </Text>
            <SelectionControls
              hasSelected={hasSelected}
              all={all}
              none={none}
              invert={invert}
            />
          </>
        )}
      </ScreenHeader>
      <ScrollView style={{flex: 1}}>
        {songData.map((song, index) => (
          <PlaylistSongDetails
            key={song.uri}
            song={song}
            toggleSelected={toggleSelected}
            playlistId={playlist.id}
            play={() => playFromIndex(index)}
            hasSelected={hasSelected}
            isSelected={selected.has(song.uri)}
          />
        ))}
      </ScrollView>
      {selected.size > 0 && (
        <ActionBar>
          <IconButton
            icon="trash-can-outline"
            size={24}
            onPress={() => removeFromPlaylist(playlist.id, [...selected])}
          />
        </ActionBar>
      )}
    </View>
  );
};

const AllPlaylists: React.FC<
  NativeStackScreenProps<PlaylistRouteParams, 'AllPlaylists'>
> = ({navigation}) => {
  const {playlists} = usePlaylists();
  const {colors} = useTheme();
  const navigate = React.useCallback(
    (id: number) => {
      navigation.push('PlaylistView', {id});
    },
    [navigation],
  );
  return (
    <View>
      <ScreenHeader>
        <Text style={{fontWeight: 'bold'}}>{playlists.length} playlists</Text>
      </ScreenHeader>
      <ScrollView>
        <View style={{flex: 1, backgroundColor: colors.background}}>
          {playlists.map(playlist => (
            <PlaylistDetails
              key={playlist.id}
              playlist={playlist}
              onPress={() => navigate(playlist.id)}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const Playlists: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName="AllPlaylists"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="AllPlaylists" component={AllPlaylists} />
      <Stack.Screen name="PlaylistView" component={PlaylistView} />
    </Stack.Navigator>
  );
};

function PlaylistsRoute() {
  return (
    <PlayingWrapper>
      <Playlists />
    </PlayingWrapper>
  );
}

export default PlaylistsRoute;
