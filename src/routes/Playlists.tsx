import * as React from 'react';
import {ScrollView, Text, View} from 'react-native';
import {PlaylistSong, usePlaylists} from '../context/playlistsContext';
import {useTheme} from '@react-navigation/native';
import {
  NativeStackScreenProps,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import MUIIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import PlaylistDetails from '../components/PlaylistDetails';
import {FileSystem} from 'react-native-file-access';
import {MusicInfo} from '../context/songsContext';
import PlaylistSongDetails from '../components/PlaylistSongDetails';
import {useTrackPlayer} from '../context/playerContext';

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
      <View
        style={{
          padding: 16,
          borderBottomWidth: 1,
          borderBottomColor: colors.border,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <Text style={{fontWeight: 'bold'}}>{playlist.name}</Text>
        <View style={{flexDirection: 'row', gap: 2}}>
          <MUIIcon name="shuffle-variant" size={16} onPress={playRandomQueue} />
        </View>
      </View>
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
  );
};

const Playlists: React.FC = () => {
  return (
    <Stack.Navigator initialRouteName="AllPlaylists">
      <Stack.Screen name="AllPlaylists" component={AllPlaylists} />
      <Stack.Screen name="PlaylistView" component={PlaylistView} />
    </Stack.Navigator>
  );
};

export default Playlists;
