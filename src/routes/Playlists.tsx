import * as React from 'react';
import {ScrollView, Text, View} from 'react-native';
import {usePlaylists} from '../context/playlistsContext';
import {useTheme} from '@react-navigation/native';
import {
  NativeStackScreenProps,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import PlaylistDetails from '../components/PlaylistDetails';

type PlaylistRouteParams = {
  AllPlaylists: undefined;
  PlaylistView: {id: number};
};

const Stack = createNativeStackNavigator<PlaylistRouteParams>();

const PlaylistView: React.FC<
  NativeStackScreenProps<PlaylistRouteParams, 'PlaylistView'>
> = ({route}) => {
  const {playlists} = usePlaylists();
  const {colors} = useTheme();
  const playlist = React.useMemo(() => {
    const res = playlists.find(p => p.id === route.params.id);
    if (!res) {
      throw new Error(
        `Navigated to playlist ${route.params.id} but there is no such playlist`,
      );
    }
    return res;
  }, [route, playlists]);
  return (
    <View style={{flex: 1, backgroundColor: colors.background}}>
      <View
        style={{
          padding: 1,
          borderBottomWidth: 1,
          borderBottomColor: colors.border,
        }}>
        <Text>{playlist.name}</Text>
      </View>
      <ScrollView>
        <View style={{flex: 1}}>
          {playlist.songs.map(song => (
            <Text>
              {song.url}: {song.weight}
            </Text>
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
