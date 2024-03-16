import * as React from 'react';
import {DarkTheme, NavigationContainer, Theme} from '@react-navigation/native';
import {SettingsContextProvider} from './context/settingsContext';
import {TrackPlayerContextProvider} from './context/playerContext';
import {SongsContextProvider} from './context/songsContext';
import {PlaylistsContextProvider} from './context/playlistsContext';
import {StatsContextProvider} from './context/stats';
import type {RootStackParams} from './routes/types';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MainNavigation from './routes/MainNavigation';
import Player from './routes/Player';

const Stack = createNativeStackNavigator<RootStackParams>();

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
                <Stack.Navigator
                  initialRouteName="Main"
                  screenOptions={{headerShown: false}}>
                  <Stack.Screen name="Main" component={MainNavigation} />
                  <Stack.Screen name="Player" component={Player} />
                </Stack.Navigator>
              </NavigationContainer>
            </PlaylistsContextProvider>
          </TrackPlayerContextProvider>
        </StatsContextProvider>
      </SongsContextProvider>
    </SettingsContextProvider>
  );
}

export default App;
