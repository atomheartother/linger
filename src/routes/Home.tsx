import React from 'react';
import {useTheme} from '@react-navigation/native';
import {useSettings} from '../context/settingsContext';
import {View, Text, Button} from 'react-native';
import FilesDisplay from '../components/FilesDisplay';
import {useSongs} from '../context/songsContext';

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
          padding: 40,
        }}>
        <Text style={{marginBottom: 20, textAlign: 'center'}}>
          It looks like you haven't set a directory yet and I can't see any
          music :(
        </Text>
        <Button onPress={promptForDir} title="Select music directory" />
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
          padding: 40,
        }}>
        <Text style={{marginBottom: 20, textAlign: 'center'}}>
          You haven't added any files to {dirUri} :(
        </Text>
      </View>
    );
  }
  return <FilesDisplay songs={allSongs} />;
};

export default Home;
