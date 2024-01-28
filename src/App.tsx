import * as React from 'react';
import {View, Text} from 'react-native';
import {DarkTheme, NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {SettingsContextProvider} from './context/settingsContext';
import Home from './routes/Home';
import {TrackPlayerContextProvider} from './context/playerContext';
import {SongsContextProvider} from './context/songsContext';

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
          <NavigationContainer theme={DarkTheme}>
            <Tab.Navigator initialRouteName="Home">
              <Tab.Screen name="Home" component={Home} />
              <Tab.Screen name="Settings" component={SettingsScreen} />
            </Tab.Navigator>
          </NavigationContainer>
        </TrackPlayerContextProvider>
      </SongsContextProvider>
    </SettingsContextProvider>
  );
}

export default App;
