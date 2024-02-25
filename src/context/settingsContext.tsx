import React, {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { MMKV } from 'react-native-mmkv';
import {openDocumentTree} from 'react-native-scoped-storage';

const storage = new MMKV();

type SettingsData = {
  dirUri: string | null;
  promptForDir: () => void;
};

export const SettingsContext = createContext<SettingsData | undefined>(
  undefined,
);

export const SettingsContextProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const [dirUri, setDirUri] = useState<string | null>(null);

  useEffect(() => {
    if (storage.contains('songsDirUri')) {
      setDirUri(storage.getString('songsDirUri') || 'error');
    }
  }, []);

  useEffect(() => {
    if (dirUri !== null) {
      storage.set('songsDirUri', dirUri);
    }
  }, [dirUri]);

  const promptForDir = useCallback(async () => {
    const pickResult = await openDocumentTree(true);
    if (!pickResult) {
      return;
    }
    setDirUri(pickResult.uri);
  }, []);

  const settings = useMemo<SettingsData>(
    () => ({
      dirUri,
      promptForDir,
    }),
    [dirUri, promptForDir],
  );
  return (
    <SettingsContext.Provider value={settings}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const settings = useContext(SettingsContext);
  if (!settings) {
    throw new Error(
      'useSettings needs to be used inside the Settings Context.',
    );
  }
  return settings;
};
