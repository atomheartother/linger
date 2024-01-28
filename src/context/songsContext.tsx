import React, {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {useSettings} from './settingsContext';
import {AndroidScoped, FileSystem} from 'react-native-file-access';

export type MusicInfo = {
  filename: string;
  path: string;
};

type SongsData = {
  allSongs: MusicInfo[];
};

export const SongsContext = createContext<SongsData | undefined>(undefined);

export const SongsContextProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const {dirUri} = useSettings();
  const [allSongs, setAllSongs] = useState<MusicInfo[]>([]);

  useEffect(() => {
    const getAndParseFiles = async () => {
      if (!dirUri) {
        setAllSongs([]);
        return;
      }

      const files = await FileSystem.ls(dirUri);
      const paths = files.map(f => AndroidScoped.appendPath(dirUri, f));
      setAllSongs(
        files.map((f, i) => ({
          filename: f,
          path: paths[i],
        })),
      );
    };

    getAndParseFiles();
  }, [dirUri]);

  const songs = useMemo<SongsData>(
    () => ({
      allSongs,
    }),
    [allSongs],
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
