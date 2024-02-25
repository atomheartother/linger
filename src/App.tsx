import * as React from 'react';
import {View, Text} from 'react-native';
import {DarkTheme, NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {SettingsContextProvider} from './context/settingsContext';
import Home from './routes/Home';
import {TrackPlayerContextProvider} from './context/playerContext';
import {SongsContextProvider} from './context/songsContext';
import Playlists from './routes/Playlists';
import {PlaylistsContextProvider} from './context/playlistsContext';
import MUIIcon from 'react-native-vector-icons/MaterialCommunityIcons';

function SettingsScreen() {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Settings Screen</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();

function App() {
  return (
    <SettingsContextProvider>
      <SongsContextProvider>
        <TrackPlayerContextProvider>
          <PlaylistsContextProvider>
            <NavigationContainer theme={DarkTheme}>
              <Tab.Navigator
                initialRouteName="Home"
                screenOptions={{
                  headerShown: false,
                }}>
                <Tab.Screen
                  name="Home"
                  component={Home}
                  options={{
                    tabBarLabel: 'Songs',
                    tabBarIcon: ({color, size}) => (
                      <MUIIcon
                        name="music-box-outline"
                        size={size}
                        color={color}
                      />
                    ),
                  }}
                />
                <Tab.Screen
                  name="Playlists"
                  component={Playlists}
                  options={{
                    tabBarIcon: ({color, size}) => (
                      <MUIIcon
                        name="playlist-music"
                        size={size}
                        color={color}
                      />
                    ),
                  }}
                />
                <Tab.Screen
                  name="Settings"
                  component={SettingsScreen}
                  options={{
                    tabBarIcon: ({color, size}) => (
                      <MUIIcon name="cog" size={size} color={color} />
                    ),
                  }}
                />
              </Tab.Navigator>
            </NavigationContainer>
          </PlaylistsContextProvider>
        </TrackPlayerContextProvider>
      </SongsContextProvider>
    </SettingsContextProvider>
  );
}

export default App;