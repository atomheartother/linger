import React from 'react';
import {useTheme} from '@react-navigation/native';
import {useSettings} from '../context/settingsContext';
import {View, Text} from 'react-native';
import FilesDisplay from '../components/FilesDisplay';
import {useSongs} from '../context/songsContext';
import {LingerButton} from '../containers';
import PlayingWrapper from '../components/PlayingWrapper';

const Home: React.FC = () => {
  const {colors} = useTheme();
  const {dirUri, promptForDir} = useSettings();
  const {allSongs} = useSongs();

  if (!dirUri) {
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: colors.background,
        }}>
        <Text style={{marginBottom: 20, textAlign: 'center'}}>
          It looks like you haven't set a directory yet and I can't see any
          music :(
        </Text>
        <LingerButton onPress={promptForDir} title="Select music directory" />
      </View>
    );
  }
  if (!allSongs) {
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: colors.background,
        }}>
        <Text style={{marginBottom: 20, textAlign: 'center'}}>
          Loading your files...
        </Text>
      </View>
    );
  }
  if (allSongs.length === 0) {
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: colors.background,
        }}>
        <Text style={{marginBottom: 20, textAlign: 'center'}}>
          You haven't added any files to the directory you pointed me to :(
          {'\n'}
          Set a different directory in Settings, or put music there!
        </Text>
      </View>
    );
  }
  return <FilesDisplay songs={allSongs} />;
};

function HomeRoute() {
  return (
    <PlayingWrapper>
      <Home />
    </PlayingWrapper>
  );
}

export default HomeRoute;
