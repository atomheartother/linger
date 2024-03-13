import * as React from 'react';
import {View, Text} from 'react-native';
import {DarkTheme, NavigationContainer, Theme} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {SettingsContextProvider, useSettings} from './context/settingsContext';
import Home from './routes/Home';
import {TrackPlayerContextProvider} from './context/playerContext';
import {SongsContextProvider} from './context/songsContext';
import Playlists from './routes/Playlists';
import {PlaylistsContextProvider} from './context/playlistsContext';
import MUIIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {LingerButton, ScreenHeader} from './containers';
import {StatsContextProvider} from './context/stats';
import type {RootTabsParams} from './routes/types';

function SettingsScreen() {
  const {promptForDir} = useSettings();
  return (
    <View style={{flex: 1, display: 'flex', flexDirection: 'column'}}>
      <ScreenHeader>
        <Text>Settings</Text>
      </ScreenHeader>
      <LingerButton onPress={promptForDir} title="Change music directory" />
    </View>
  );
}

const Tab = createBottomTabNavigator<RootTabsParams>();

const MyTheme: Theme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: '#f44336',
  },
};

function App() {
  return (
    <SettingsContextProvider>
      <SongsContextProvider>
        <StatsContextProvider>
          <TrackPlayerContextProvider>
            <PlaylistsContextProvider>
              <NavigationContainer theme={MyTheme}>
                <Tab.Navigator
                  initialRouteName="Home"
                  screenOptions={{
                    headerShown: false,
                    tabBarStyle: {paddingBottom: 2},
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
        </StatsContextProvider>
      </SongsContextProvider>
    </SettingsContextProvider>
  );
}

export default App;
