import React, {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {useSettings} from './settingsContext';
import {AndroidScoped, FileSystem} from 'react-native-file-access';
import {truncateFileName} from '../utils';

export type MusicInfo = {
  filename: string;
  uri: string;
};

type SongsData = {
  allSongs: MusicInfo[] | null;
  refreshing: boolean;
  refresh: () => void;
};

export const SongsContext = createContext<SongsData | undefined>(undefined);

export const SongsContextProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const {dirUri} = useSettings();
  const [allSongs, setAllSongs] = useState<MusicInfo[] | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const refreshSongs = useCallback(async () => {
    if (!dirUri) {
      setAllSongs([]);
      return;
    }

    setRefreshing(true);

    const files = await FileSystem.ls(dirUri);
    const uris = files.map(f => AndroidScoped.appendPath(dirUri, f));

    setAllSongs(
      files.map((f, i) => ({
        filename: truncateFileName(f),
        uri: uris[i],
      })),
    );
    setRefreshing(false);
  }, [dirUri]);

  useEffect(() => {
    setAllSongs(null);
    refreshSongs();
  }, [dirUri, refreshSongs]);

  const songs = useMemo<SongsData>(
    () => ({
      allSongs,
      refresh: refreshSongs,
      refreshing,
    }),
    [allSongs, refreshSongs, refreshing],
  );
  return (
    <SongsContext.Provider value={songs}>{children}</SongsContext.Provider>
  );
};

export const useSongs = () => {
  const songs = useContext(SongsContext);
  if (!songs) {
    throw new Error('useSongs needs to be used inside the Songs Context.');
  }
  return songs;
};
