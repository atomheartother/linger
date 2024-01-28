import React, {useEffect, useState} from 'react';
import {useTheme} from '@react-navigation/native';
import {useSettings} from '../context/settingsContext';
import {View, Text, Button, ScrollView} from 'react-native';
import FilesDisplay from '../components/FilesDisplay';
import {FileSystem} from 'react-native-file-access';

const Home: React.FC = () => {
  const {colors} = useTheme();
  const {dirUri, promptForDir} = useSettings();
  const [files, setFiles] = useState<string[]>([]);

  useEffect(() => {
    const listFiles = async () => {
      if (!dirUri) {
        return;
      }
      const lsRes = await FileSystem.ls(dirUri);
      setFiles(lsRes);
    };
    listFiles();
  }, [dirUri]);
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
  if (files.length === 0) {
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
  return (
    <ScrollView>
      <FilesDisplay files={files} dirUri={dirUri} />
    </ScrollView>
  );
};

export default Home;
