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
import {ScreenHeader} from '../containers';
import PlayingWrapper from '../components/PlayingWrapper';
import IconButton from '../components/IconButton';

type PlaylistRouteParams = {
  AllPlaylists: undefined;
  PlaylistView: {id: number};
};

const Stack = createNativeStackNavigator<PlaylistRouteParams>();

const PlaylistView: React.FC<
  NativeStackScreenProps<PlaylistRouteParams, 'PlaylistView'>
> = ({route}) => {
  const {playlists} = usePlaylists();
  const {addSongs, play} = useTrackPlayer();
  const {colors} = useTheme();
  const [songData, setSongData] = React.useState<(MusicInfo & PlaylistSong)[]>(
    [],
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
    await addSongs(queue.sort(() => Math.random() - 0.5));
    play();
  };

  React.useEffect(() => {
    const readFiles = async () => {
      const stats = await Promise.all(
        playlist.songs.map(({uri}) => FileSystem.stat(uri)),
      );
      setSongData(
        stats.map(({filename}, i) => ({filename, ...playlist.songs[i]})),
      );
    };
    readFiles();
  }, [playlist]);

  return (
    <View style={{flex: 1, backgroundColor: colors.background}}>
      <ScreenHeader>
        <View>
          <Text style={{fontWeight: 'bold'}}>{playlist.name}</Text>
          <Text style={{ opacity: 0.6 }}>{playlist.songs.length} songs</Text>
        </View>
        <View style={{flexDirection: 'row', gap: 2}}>
          <IconButton
            icon="shuffle-variant"
            size={20}
            onPress={playRandomQueue}
          />
        </View>
      </ScreenHeader>
      <ScrollView>
        <View style={{flex: 1}}>
          {songData.map(song => (
            <PlaylistSongDetails
              key={song.uri}
              song={song}
              playlistId={playlist.id}
            />
          ))}
        </View>
      </ScrollView>
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
              navigate={navigate}
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
