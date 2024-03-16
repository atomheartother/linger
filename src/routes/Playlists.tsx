import * as React from 'react';
import {ScrollView, Text, View} from 'react-native';
import {usePlaylists} from '../context/playlistsContext';
import {useTheme} from '@react-navigation/native';
import {
  NativeStackScreenProps,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import PlaylistDetails from '../components/PlaylistDetails';
import {ScreenHeader} from '../containers';
import PlayingWrapper from '../components/PlayingWrapper';
import PlaylistView from '../components/PlaylistView';
import type {PlaylistRouteParams} from './types';

const Stack = createNativeStackNavigator<PlaylistRouteParams>();

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
