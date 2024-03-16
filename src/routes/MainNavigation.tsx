import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Text, View} from 'react-native';
import {LingerButton, ScreenHeader} from '../containers';
import {BottomTabsParams} from './types';
import MUIIcon from 'react-native-vector-icons/MaterialIcons';
import {useSettings} from '../context/settingsContext';
import Home from './Home';
import Playlists from './Playlists';

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
const Tab = createBottomTabNavigator<BottomTabsParams>();
export default function MainNavigation() {
  return (
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
            <MUIIcon name="library-music" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Playlists"
        component={Playlists}
        options={{
          tabBarIcon: ({color, size}) => (
            <MUIIcon name="menu" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarIcon: ({color, size}) => (
            <MUIIcon name="settings" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
